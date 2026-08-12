const generateResume = async () => {
  if (!file) {
    showNotification(
      "Please upload a resume before generating.",
      "warning"
    );

    return;
  }

  if (!jobDescription.trim()) {
    showNotification(
      "Please enter the Job Description.",
      "warning"
    );

    return;
  }

  setLoading(true);
  setResult(null);
  setErrorMessage("");
  setTimeline([]);

  setWorkflowSteps(
    initialWorkflowSteps.map(
      (step, index) => ({
        ...step,
        status:
          index === 0
            ? "active"
            : "pending"
      })
    )
  );

  addTimelineEvent(
    `Resume selected: ${file.name}`
  );

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  formData.append(
    "job_description",
    jobDescription.trim()
  );

  try {
    /*
     * Detect a mobile/tablet browser.
     *
     * Mobile uses the normal API because
     * streaming fetch can behave differently
     * on some mobile browsers.
     */
    const isMobile =
      window.matchMedia(
        "(max-width: 768px)"
      ).matches;

    /*
     * ========================================
     * MOBILE
     * ========================================
     */

    if (isMobile) {
      addTimelineEvent(
        "Mobile AI workflow started"
      );

      /*
       * api is your existing Axios instance.
       * It already contains:
       *
       * VITE_API_URL
       * X-API-Key
       */

      const response = await api.post(
        "/generate-ai-resume",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      /*
       * Normal API returns the complete
       * generated resume result.
       */

      const result = response.data;

      /*
       * Mark every workflow step completed.
       */

      setWorkflowSteps(
        initialWorkflowSteps.map(
          (step) => ({
            ...step,
            status: "completed"
          })
        )
      );

      /*
       * Send result back to Home/App.
       */

      setResult(result);

      addTimelineEvent(
        "AI resume generation completed",
        "completed"
      );

      showNotification(
        "Resume generated successfully!",
        "success"
      );

      return;
    }

    /*
     * ========================================
     * DESKTOP
     * ========================================
     *
     * Keep the existing streaming workflow.
     */

    const baseUrl =
      api.defaults.baseURL ||
      "http://127.0.0.1:8000";

    const response = await fetch(
      `${baseUrl}/generate-ai-resume-stream`,
      {
        method: "POST",

        headers: {
          Accept:
            "text/event-stream",

          "X-API-Key":
            import.meta.env
              .VITE_API_KEY ||
            "resume_app_local_2026_secure"
        },

        body: formData
      }
    );

    /*
     * Check API response.
     */

    if (!response.ok) {
      let message =
        "Unable to start the AI workflow.";

      try {
        const responseData =
          await response.json();

        message =
          responseData.detail ||
          message;
      } catch {
        const responseText =
          await response.text();

        if (responseText) {
          message =
            responseText;
        }
      }

      throw new Error(
        message
      );
    }

    /*
     * Streaming response required
     * for desktop workflow.
     */

    if (!response.body) {
      throw new Error(
        "The browser did not provide a streaming response."
      );
    }

    const reader =
      response.body.getReader();

    const decoder =
      new TextDecoder(
        "utf-8"
      );

    let buffer = "";

    const completionState = {
      completed: false,
      error: ""
    };

    /*
     * ========================================
     * READ STREAM
     * ========================================
     */

    while (true) {
      const {
        value,
        done
      } = await reader.read();

      if (done) {
        break;
      }

      buffer +=
        decoder.decode(
          value,
          {
            stream: true
          }
        );

      const eventBlocks =
        buffer.split(
          /\r?\n\r?\n/
        );

      buffer =
        eventBlocks.pop() ||
        "";

      for (
        const eventBlock
        of eventBlocks
      ) {
        const dataLines =
          eventBlock
            .split(
              /\r?\n/
            )
            .filter(
              (line) =>
                line.startsWith(
                  "data:"
                )
            )
            .map(
              (line) =>
                line.replace(
                  /^data:\s?/,
                  ""
                )
            );

        if (
          dataLines.length ===
          0
        ) {
          continue;
        }

        const rawData =
          dataLines.join(
            "\n"
          );

        try {
          const payload =
            JSON.parse(
              rawData
            );

          processStreamingEvent(
            payload,
            completionState
          );

          if (
            completionState.error
          ) {
            throw new Error(
              completionState.error
            );
          }
        } catch (error) {
          if (
            error instanceof
            SyntaxError
          ) {
            console.error(
              "Unable to parse streaming event:",
              rawData
            );

            continue;
          }

          throw error;
        }
      }
    }

    /*
     * Stream closed before receiving
     * completed event.
     */

    if (
      !completionState.completed
    ) {
      throw new Error(
        "The streaming connection closed before the workflow completed."
      );
    }
  } catch (error) {
    console.error(
      "Resume generation error:",
      error
    );

    /*
     * Axios errors can contain useful
     * backend messages in response.data.
     */

    const message =
      error.response?.data?.detail ||
      error.message ||
      "Something went wrong.";

    setErrorMessage(
      message
    );

    setWorkflowSteps(
      (currentSteps) =>
        currentSteps.map(
          (step) =>
            step.status ===
            "active"
              ? {
                  ...step,
                  status:
                    "failed"
                }
              : step
        )
    );

    addTimelineEvent(
      message,
      "error"
    );

    showNotification(
      message,
      "error"
    );
  } finally {
    setLoading(false);
  }
};
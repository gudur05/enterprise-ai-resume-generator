import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000",

  headers: {
    "X-API-Key":
      import.meta.env.VITE_API_KEY ||
      "resume_app_local_2026_secure"
  },

  timeout: 120000
});

export default api;
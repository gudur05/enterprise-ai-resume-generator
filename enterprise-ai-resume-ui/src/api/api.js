import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "X-API-Key": "resume-secret-key"
    }
});

export default api;
import axios from "axios";

// Tạo instance axios với cấu hình cơ bản
const API = axios.create({
  baseURL: "http://localhost:5000/api", // URL backend của bạn
  timeout: 10000, // Thời gian timeout (ms)
});

export default API;

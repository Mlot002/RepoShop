import axios from "axios";

const BASE_URL = "https://localhost:7080/";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});


import a from "axios";

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

const axios = a.create({
  baseURL,
});

export default axios;

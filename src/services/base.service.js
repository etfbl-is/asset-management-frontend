import axios from "axios";
import environment from "../environments";
const baseConfig = {
  baseURL: environment().baseServiceUrl,
};

export default {
  service: () => {
    const instance = axios.create(baseConfig);
    instance.defaults.headers.common["Content-Type"] = "application/json";
    return instance;
  },
};

import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});
function getJwtDataFromLocalStorage() {
  const token = localStorage.getItem("crmSuiteToken") || null;
  return token;
}
axiosInstance.interceptors.request.use(
  function (config) {
    const token = getJwtDataFromLocalStorage();
    if (!token) {
      return;
    }
    config.headers.Authorization = token;
  },
  function (err) {
    return Promise.reject(err);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("crmSuiteRefreshToken");
        const response = await axiosInstance.post("/update-access-token", {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem("crmSuiteToken", access);
        axiosInstance.defaults.headers.Authorization = access;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("crmSuiteToken");
        localStorage.removeItem("crmSuiteRefreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
const Axios = async ({ requestType, url, header, params, query, data }) => {
  try {
    const options = {
      params: query,
      headers:header,
      ...params,
    };
    let response;
    const trimmedUrl = url.trim();
    switch (requestType.toLowerCase().trim()) {
      case "get":
        response = await axios.get(trimmedUrl, options);
        break;
      case "post":
        response = await axios.post(trimmedUrl, data, options);
        break;
      case "delete":
        response = await axios.delete(trimmedUrl, options);
        break;
      case "put":
        response = await axios.delete(trimmedUrl, data, options);
        break;
      default:
        throw new Error(`Unsupported request type: ${requestType}`);
    }
    return response;
  } catch (error) {
    console.error("Axios error:", error);
    console.log(error.message)
    throw error;
  }
};

export default Axios;

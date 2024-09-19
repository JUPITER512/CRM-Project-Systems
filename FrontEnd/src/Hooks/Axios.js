import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "/api", 
  timeout: 10000,
});
function getJwtDataFromLocalStorage() {
  const token = localStorage.getItem("accessToken") || null;
  return token;
}
axiosInstance.interceptors.request.use(
  function (request) {
    const token = getJwtDataFromLocalStorage();
    if (!token) {
      return request;
    }
    request.headers.Authorization = token;
    return request
  },
  function (err) {
    return Promise.reject(err); 
  }
);
let isRefreshing = false; // Flag to indicate if a token refresh is in progress
let queuedRequests = [];
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && error?.response?.data?.message=='Invalid or expired token' && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post("/update-access-token");
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        axiosInstance.defaults.headers.Authorization = `${accessToken}`;;
        return axiosInstance(originalRequest);
      } catch (error) {
        window.location.href = "/Sign-in";
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
        response = await axiosInstance.get(trimmedUrl, options);
        break;
      case "post":
        response = await axiosInstance.post(trimmedUrl, data, options);
        break;
      case "delete":
        response = await axiosInstance.delete(trimmedUrl, options);
        break;
      case "put":
        response = await axiosInstance.put(trimmedUrl, data, options);
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

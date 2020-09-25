import axios from "axios";
export const API_BASE_URL = process.env.REACT_APP_APIEndpoint;

const getHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
};

export const getRequest = (path, getData) => {
  const url = urlBuilder(path);
  return request("GET", url, null, { params: getData });
};

export const postRequest = (path, postData) => {
  const url = urlBuilder(path);
  return request("POST", url, postData);
};

export const putRequest = (path, postData) => {
  const url = urlBuilder(path);
  return request("PUT", url, postData);
};

export const deleteRequest = (path, deleteData) => {
  const url = urlBuilder(path);
  return request("DELETE", url, deleteData);
};

const urlBuilder = (path) => {
  return `${API_BASE_URL}/${path}`;
};

const request = async (method, url, data = null, options = {}) => {
  // set axios defaults after getting the update values
  axios.defaults.headers = getHeaders();

  try {
    const apiResponse = await axios({
      method,
      url,
      data,
      ...options,
    });

    return {
      error: null,
      res: apiResponse.data,
    };
  } catch (error) {
    /**
     * If error code is 401, clear the local storage (if any) and redirect to the login page
     * to get the updated token
     */
    const statusCode = (error.response && error.response.status) || null;
    if (statusCode && statusCode === 401) {
      localStorage.clear();
      window.location.href = process.env.PUBLIC_URL;
    }

    return {
      res: null,
      error,
    };
  }
};

export function getErrorMsg(errorObj, defaultMsg) {
  const message = errorObj?.response?.data?.message;
  if (!message) return defaultMsg;
  if (Array.isArray(message)) return message[0];
  return message;
}

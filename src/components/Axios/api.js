import API from "./axios";
import CryptoJS from "crypto-js";

export default class HTTP {
  static #constructSignature = (path, method) => {
    const timestamp = Date.now().toString();
    const secret = import.meta.env.VITE_APP_SERVICE_KEY;
    let dataToSign = `${method}api/${path}${timestamp}`;
    const hash = CryptoJS.HmacSHA256(dataToSign, secret);
    const signature = hash.toString(CryptoJS.enc.Hex);
    return { signature, timestamp };
}
  static request = async (method, url, data = null, options = {}) => {
    try {
      const config = {
        method,
        url,
        headers: { ...options.headers },
      };
      if (options.setLoading) options.setLoading(true);
      if (data) config.data = data;
  
      if (options.isAuthenticated) {
        const token = localStorage.getItem("ax_7689832T");
        config.headers["Authorization"] = `Bearer ${token}`;
      } 
      if(!options?.isAuthenticated){
        const { signature, timestamp } = this.#constructSignature(url, method.toUpperCase());
        config.headers["X-Signature"] = signature;
        config.headers["X-Timestamp"] = timestamp;
      }
  
      const response = await API(config);
      
      return {error: false, result:response.data}; 
  
    } catch (error) {
      const errors = this.handleError(error);
      
      return {error: true, errors}; 
    }finally{
      if (options.setLoading) options.setLoading(false);
    }
  };

  static handleError = (error) => {
    console.log(error.response);
    let errors = [];
    const message = error.response?.data?.message || "An unexpected error occurred";
    console.error(`[API Error]: ${message}`, error.response?.status);
    
    if (error.response?.status === 401) {
      // Handle logout or redirect logic here
    }else{
      errors.push(message);
    }
    return errors;
  };


}

export const constructSignature = (path, method) => {
    const timestamp = Date.now().toString();
    const secret = import.meta.env.VITE_APP_SERVICE_KEY;
    let dataToSign = `${method}${path}${timestamp}`;
    const hash = CryptoJS.HmacSHA256(dataToSign, secret);
    const signature = hash.toString(CryptoJS.enc.Hex);
    return { signature, timestamp };
}

export const getProductApi = (param, row) => {
  let url = `get-all-chairs/${row}`;
  if (param) {
    const page = param.split("?")[1];
    url = `get-all-chairs?${page}`;
  }
  return API.get(url);
};

const request = async (method, url, data = null, options = {}) => {
  try {
    const config = {
      method,
      url,
      headers: { ...options.headers },
    };

    if (data) config.data = data;

    if (options.isAdmin) {
      const token = localStorage.getItem("token");
      config.headers["Authorization"] = `Bearer ${token}`;
    } 
    
    const { signature, timestamp } = constructSignature(url, method.toUpperCase());
    config.headers["X-Signature"] = signature;
    config.headers["X-Timestamp"] = timestamp;

    console.log(config);
    return;
    const response = await API(config);
    return response.data; 

  } catch (error) {
    console.error(`API Error [${method} ${url}]:`, error.response?.data || error.message);
    
    throw error; 
  }
};

export const sendGetAdminApi = (url) => {
  const token = localStorage.getItem("token");
  return API.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const sendPostAdminApi = (url, data) => {
  const token = localStorage.getItem("token");
  return API.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendPostApi = (url, data) => {
    const { signature, timestamp } = constructSignature(url, "POST");
    console.log("Signature:", signature);
    console.log("Timestamp:", timestamp);
    console.log("Data:", data);
  return API.post(url, data , {
    headers: {
      "X-Signature": signature,
      "X-Timestamp": timestamp,
    },
  });
};
export const sendGetApi = (url, queryString) => {
  const getUrl = `${url}/${queryString}`;
  console.log(getUrl);
  return API.get(getUrl);
};

export const getApi = (url) => {
  return API.get(url);
};
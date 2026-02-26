import HTTP from "../../components/Axios/api";
import { homeStoreActions } from "../store";

export const getContent = (setLoading) => {
  return async (dispatch) => {
    const response = await HTTP.request("GET", `user/main-page`, null, {
      isAuthenticated: true,
      setLoading,
    });
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        dispatch(homeStoreActions.setContent(result.data));
      } else {
      }
    } else {
    }
  };
};

export const updateContent = (data, setLoading) => {
  return async (dispatch) => {
    const response = await HTTP.request('POST', 'user/main-page', data, {
      isAuthenticated: true,
      setLoading,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    if (!response.error) {
      const { result } = response;
      if (result.success) {
       } else {
        console.log(result.data.message);
      }
    } else {
    }
  };
};
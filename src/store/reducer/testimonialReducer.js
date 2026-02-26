import HTTP from "../../components/Axios/api";
import { testimonialStoreActions } from "../store";

export const getList = (isLoading, page = 1) => {
  return async (dispatch) => {
    const response = await HTTP.request(
      "GET",
      `user/testimonial?page=${page}`,
      null,
      {
        isAuthenticated: true,
        setLoading: isLoading,
      }
    );
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        dispatch(testimonialStoreActions.setTestimonials(result.data));
      } else {
      }
    } else {
    }
  };
};

export const getTestimonial = (uuid, setLoading) => {
  return async (dispatch) => {
    const response = await HTTP.request("GET", `user/testimonial/${uuid}`, null, {
      isAuthenticated: true,
      setLoading,
    });
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        dispatch(testimonialStoreActions.setSelectedTestimonial(result.data));
      } else {
      }
    } else {
    }
  };
};

export const updateTestimonial = (data, navigate, uuid = null, setLoading) => {
  return async (dispatch) => {
    const method = uuid ? "PATCH" : "POST";
    let url = uuid ? `user/testimonial/${uuid}` : "user/testimonial";
    const response = await HTTP.request(method, url, data, {
      isAuthenticated: true,
      setLoading
    });
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        navigate("/my-testimonials");
      } else {
      }
    } else {
    }
  };
};

export const deleteTestimonial = (uuid) => {
  return async (dispatch) => {
    const response = await HTTP.request(
      "DELETE",
      `user/testimonial/${uuid}`,
      null,
      {
        isAuthenticated: true,
      }
    );
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        dispatch(testimonialStoreActions.updateRefresh());

      } else {
      }
    } else {
    }
  };
};

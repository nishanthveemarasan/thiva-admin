import HTTP from "../../components/Axios/api";
import { projectStoreActions } from "../store";

export const getList = (isLoading, page = 1) => {
  return async (dispatch) => {
    const response = await HTTP.request(
      "GET",
      `user/project?page=${page}`,
      null,
      {
        isAuthenticated: true,
        setLoading: isLoading,
      }
    );
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        dispatch(projectStoreActions.setSProjects(result.data));
      } else {
      }
    } else {
    }
  };
};

export const getProject = (uuid, setLoading) => {
  return async (dispatch) => {
    const response = await HTTP.request("GET", `user/project/${uuid}`, null, {
      isAuthenticated: true,
      setLoading,
    });
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        dispatch(projectStoreActions.setSelectedProject(result.data));
      } else {
      }
    } else {
    }
  };
};

export const updateProject = (data, navigate, uuid = null, setLoading) => {
  return async (dispatch) => {
    let url = uuid ? `user/project/${uuid}` : "user/project";
    const response = await HTTP.request("POST", url, data, {
      isAuthenticated: true,
      setLoading,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        navigate("/my-projects");
      } else {
      }
    } else {
    }
  };
};

export const deleteProject = (uuid, navigate) => {
  return async (dispatch) => {
    const response = await HTTP.request(
      "DELETE",
      `user/project/${uuid}`,
      null,
      {
        isAuthenticated: true,
      }
    );
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        dispatch(projectStoreActions.updateRefresh());

      } else {
      }
    } else {
    }
  };
};

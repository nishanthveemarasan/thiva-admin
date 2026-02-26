import HTTP from "../../components/Axios/api";
import { serviceStoreActions } from "../store";

export const getList = (isLoading, page=1) => {
    return async (dispatch) => {
        const response = await HTTP.request("GET", `user/service?page=${page}`, null, {
            isAuthenticated: true,
            setLoading: isLoading,

        });
        if(!response.error ){
            const {result} = response;
            if(result.success){
                dispatch(serviceStoreActions.setServices(result.data));
            }else{
                
            }
        }else{
            
        }

    }
}

export const getService = (uuid, setLoading) => {
  return async (dispatch) => {
    const response = await HTTP.request("GET", `user/service/${uuid}`, null, {
      isAuthenticated: true,
      setLoading,
    });
    if (!response.error) {
      const { result } = response;
      console.log(result);
      if (result.success) {
        dispatch(serviceStoreActions.setSelectedService(result.data));
      } else {
      }
    } else {
    }
  };
};

export const updateService = (data, navigate, uuid = null) => {
  return async (dispatch) => {
    let method = uuid ? "PATCH" : "POST";
    let url = uuid ? `user/service/${uuid}` : "user/service";
    const response = await HTTP.request(method, url, data, {
      isAuthenticated: true,
    });
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        navigate("/my/services");
      } else {
      }
    } else {
    }
  };
};

export const deleteService = (uuid, navigate) => {
  return async (dispatch) => {
    const response = await HTTP.request(
      "DELETE",
      `user/service/${uuid}`,
      null,
      {
        isAuthenticated: true,
      }
    );
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        dispatch(serviceStoreActions.updateRefresh());
      } else {
      }
    } else {
    }
  };
};

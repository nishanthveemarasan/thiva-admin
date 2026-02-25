import HTTP from "../../components/Axios/api";
import { experienceStoreActions } from "../store";


export const updateEducation = (data, uuid = null) => {
  return async (dispatch) => {
    let method = uuid? "PATCH":"POST";
    let url = uuid? `user/education/${uuid}`:"user/education";
    const response = await HTTP.request(method, url, data, {
      isAuthenticated: true,
    });
    if (!response.error) {
      const { result } = response;
      if (result.success) {
        if (uuid) {
            data.uuid = uuid;
            dispatch(experienceStoreActions.updateEducation(data));
        } else {
          data.uuid = result.data.uuid;
          dispatch(experienceStoreActions.addEducation(data));
        }
      } else {
      }
    } else {
      // dispatch(authStoreActions.loginResponse({name: "", content: "Something went wrong! Please try again later!", success: false}));
    }
  };
};

export const deleteEducation = (uuid) => {
    return async (dispatch) => {
        const response = await HTTP.request("DELETE", `user/education/${uuid}`, null, {
            isAuthenticated: true
        });
        if(!response.error ){
            const {result} = response;
            if(result.success){
                dispatch(experienceStoreActions.removeEducation(uuid));
            }else{
                
            }
        }else{
            // dispatch(authStoreActions.loginResponse({name: "", content: "Something went wrong! Please try again later!", success: false}));
        }

    }
}

import HTTP from "../../components/Axios/api";
import { experienceStoreActions } from "../store";


export const addExperience = (data) => {
    return async (dispatch) => {
        const response = await HTTP.request("POST", "user/experience", data, {
            isAuthenticated: true
        });
        if(!response.error ){
            const {result} = response;
            if(result.success){
                data.uuid = result.data.uuid;
                dispatch(experienceStoreActions.addExperience(data));
            }else{
                
            }
        }else{
            // dispatch(authStoreActions.loginResponse({name: "", content: "Something went wrong! Please try again later!", success: false}));
        }

    }
}

export const updateExperience = (data, uuid) => {
    return async (dispatch) => {
        const response = await HTTP.request("PATCH", `user/experience/${uuid}`, data, {
            isAuthenticated: true
        });
        if(!response.error ){
            const {result} = response;
            if(result.success){
                data.uuid = uuid;
                dispatch(experienceStoreActions.updateExperience(data));
            }else{
                
            }
        }else{
            // dispatch(authStoreActions.loginResponse({name: "", content: "Something went wrong! Please try again later!", success: false}));
        }

    }
}

export const deleteExperience = (uuid) => {
    return async (dispatch) => {
        const response = await HTTP.request("DELETE", `user/experience/${uuid}`, null, {
            isAuthenticated: true
        });
        if(!response.error ){
            const {result} = response;
            if(result.success){
                dispatch(experienceStoreActions.removeExperience(uuid));
            }else{
                
            }
        }else{
            // dispatch(authStoreActions.loginResponse({name: "", content: "Something went wrong! Please try again later!", success: false}));
        }

    }
}
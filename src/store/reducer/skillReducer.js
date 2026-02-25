import HTTP from "../../components/Axios/api";
import { experienceStoreActions } from "../store";

export const updateSkill = (data) => {
    return async (dispatch) => {
        const response = await HTTP.request("POST", `user/skill`, data, {
            isAuthenticated: true
        });
        if(!response.error ){
            const {result} = response;
            if(result.success){
                dispatch(experienceStoreActions.updateSkill());
            }else{
                
            }
        }else{
        }

    }
}

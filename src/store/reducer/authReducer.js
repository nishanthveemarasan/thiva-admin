import HTTP from "../../components/Axios/api"
import { authStoreActions } from "../store";

export const login = (data, navigation) => {
    return async (dispatch) => {
        const response = await HTTP.request("POST", "auth/login", data, {
            isAuthenticated: false,
        });
 
        if(!response.error ){
            const {result} = response;
            if(result.success){
                localStorage.setItem("ax_7689832T", result.data.token);
                dispatch(authStoreActions.loginResponse({name: result.data.name, content:"Authentication Successfull:Rediracting to Admin Panel!!", success: true}));
                navigation('/home-page');
            }else{
                dispatch(authStoreActions.loginResponse({name: "", content: result.message || "Invalid Credentials", success: false}));
            }
        }else{
            dispatch(authStoreActions.loginResponse({name: "", content: "Something went wrong! Please try again later!", success: false}));
        }

    }
}

export const logout = (navigate) => {
    return (dispatch) => {
      localStorage.removeItem('ax_7689832T')
      dispatch(authStoreActions.logout())
      navigate('/login')
    }
  }
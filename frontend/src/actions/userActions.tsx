import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constant/userConstant"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = (email: string, password: string) => async (dispatch: (arg0: { type: string; payload?: any }) => void) =>{
     try {
        dispatch({type : USER_LOGIN_REQUEST})
        const config ={
            headers:{
            "Content-type":"application/json"
            }
        }
        const { data } = await axios.post("/api/users/login",{email,password},config)
        dispatch({type : USER_LOGIN_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
        dispatch({type: USER_LOGIN_FAIL, payload: 
            error.response && error.response.data.message
            ?error.response.data.message
            :error.message
            })
        }
    
}

export const  logout = () => async (dispatch: (arg0: { type: string; }) => void) =>{
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const register = (name: string, email: string, password: string, pic: string) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) =>{
     try {
        dispatch({type : USER_REGISTER_REQUEST})
        const config ={
            headers:{
            "Content-type":"application/json"
            }
        }
        const { data } = await axios.post(
            "/api/users",
            {name, email,password, pic}
            ,config)
        dispatch({type : USER_REGISTER_SUCCESS, payload: data})
        dispatch({type : USER_LOGIN_SUCCESS, payload: data})

        localStorage.setItem('userInfo', JSON.stringify(data));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
        dispatch({type: USER_REGISTER_FAIL, payload: 
            error.response && error.response.data.message
            ?error.response.data.message
            :error.message
            })
        }
    
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfile = (user: { name: string; email: string; password: string; pic?: string; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void, getState: () => { userLogin: { userInfo: any; }; }) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/users/profile", user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


/* eslint-disable @typescript-eslint/no-explicit-any */
// import Loading from "../component/Loading";
import type { AnyAction } from "redux";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constant/userConstant";
// import type { SetStateAction } from "react";
// import type { SetStateAction } from "react";

interface UserLoginState {
  loading?: boolean;
  error?: string;
  userInfo: UserInfo | null;
}

const initialLoginState: UserLoginState = {
  loading: false,
  error: undefined,
  userInfo: null,
};

export const userLoginReducers = (
  state: UserLoginState = initialLoginState,
  action: { type: string; payload?: any }
): UserLoginState => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, userInfo: null };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload, userInfo: null };
    case USER_LOGOUT:
      return { loading: false, userInfo: null };
    default:
      return state;
  }
};


interface UserRegisterState {
  loading?: boolean;
  error?: string;
  userInfo?: any;
}

export const userRegisterReducers = (
  state: UserRegisterState = {},
  action: AnyAction
): UserRegisterState => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export  interface UserInfo {
  pic: string;
  id: string;
  name: string;
  email: string;
  token: string;
  isAdmin?: boolean;
}
interface UserUpdateState {
  loading?: boolean;
  error?: string | null;
  userInfo?: UserInfo | null;
  success?: boolean;
}

const initialUpdateState: UserUpdateState = {
  loading: false,
  error: null,
  userInfo: null,
  success: false,
};

export const userUpdateReducer = (
  state = initialUpdateState,
  action: { type: string; payload?: any }
): UserUpdateState => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true, error: null };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
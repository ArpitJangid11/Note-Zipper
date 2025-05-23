import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { userLoginReducers, userRegisterReducers, userUpdateReducer } from "./reducers/userReducers";
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from "./reducers/notesReducers";

const reducer = combineReducers({
  noteList: noteListReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
  userUpdate: userUpdateReducer,
});

const userInfoString = localStorage.getItem("userInfo") as string;
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(userInfoString)
  : null;

const initialState = {
  userLogin: {userInfo: userInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  
  composeWithDevTools(applyMiddleware(...middleware))
);
export type RootState = ReturnType<typeof store.getState>;
export default store;

import { useReducer } from "react";
import AuthContext from "./AuthContext"
import AuthReducer from "./AuthReducer";
import axios from "axios"
import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,CLEAR_ERRORS} from "../types"
import setAuthToken from "../../utils/setAuthToken";
const AuthState=props=>{
    const initialState={
    token:localStorage.getItem("token"),
    user:null,
    isAuthenticated:null,
    loading:true,
    error:null

    }
    const[state,dispatch]=useReducer(AuthReducer,initialState)
    const loadUser=async()=>{
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const res=await axios.get("/api/auth")
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:AUTH_ERROR
            })
        }
    }
    const register =async formData=>{
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        try {
            const res=await axios.post("/api/users",formData,config)
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
            loadUser()
        } catch (error) {
            dispatch({
                type:REGISTER_FAIL,
                payload:error.response.data.msg
            })
        }
    }
  
    const login=async formData=>{
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        try {
            const res=await axios.post("/api/auth",formData,config)
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            loadUser()
        } catch (error) {
            dispatch({
                type:LOGIN_FAIL,
                payload:error.response.data.msg
            })
        }
    }
  
    const logOut=()=>{
        dispatch({
            type:LOGOUT
        })
    }
    const clearErrors=()=>{
        dispatch({
            type:CLEAR_ERRORS
        })
    }
return (
<AuthContext.Provider value={{
 token:state.token,
 isAuthenticated:state.isAuthenticated,
 loading:state.loading,
 error:state.error,
 user:state.user,
 register,
 clearErrors,
 loadUser,
 login,
 logOut
}}>
    {props.children}
</AuthContext.Provider>
    )
}
export default AuthState
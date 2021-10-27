import React,{useState,useEffect,useContext} from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'
import AlertContext from '../../context/alert/AlertContext'
export const Login = () => {
    const alertContext=useContext(AlertContext)
    const authContext=useContext(AuthContext)
    const {login,error,clearErrors,isAuthenticated,loading}=authContext
    const history=useHistory()
    useEffect(() => {
        if(isAuthenticated){
            history.push("/")
        }
    if(error==="invalid credentials"){
        setAlert(error,"danger")
        clearErrors()
    }//eslint-disable-next-line
    }, [error,isAuthenticated,history])
const {setAlert}=alertContext
    const [user,setUser]=useState({
        email:"",
        password:""
    })
    const{email,password}=user
    const onChange=e=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const submitHandler=e=>{
        e.preventDefault()
        if(email===""|| password===""){
            setAlert("please fill all fields","danger")
        } else{
            login({
                email,
                password
            })
        }
    }
    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span></h1>
        <form onSubmit={submitHandler}>
        
            <div className="form-group">
<label htmlFor="email">Email address</label>
<input type="text" name="email" value={email} onChange={onChange}/>
            </div>
            <div className="form-group">
<label htmlFor="password">Password</label>
<input type="password" name="password" value={password} onChange={onChange}/>
            </div>
       
            <input type="submit" value="Login" className="btn btn-block btn-primary"/>
        </form>
        </div>
    )
}

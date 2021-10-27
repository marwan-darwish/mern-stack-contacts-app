import React,{useContext, useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'
export const Register = (props) => {
    const alertContext=useContext(AlertContext)
    const authContext=useContext(AuthContext)
    const {register,error,clearErrors,isAuthenticated}=authContext
    const history=useHistory()
    useEffect(() => {
        if(isAuthenticated){
            history.push("/")
        }
    if(error==="email already registred"){
        setAlert(error,"danger")
        clearErrors()
    }//eslint-disable-next-line
    }, [error,isAuthenticated,history])
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        passwordConfirmation:""
    })
    const{setAlert}=alertContext
    const{name,email,password,passwordConfirmation}=user
    const onChange=e=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const submitHandler=e=>{
        e.preventDefault()
        if(name===""||email===""||password===""){
            setAlert("plz enter all fields","danger")
            console.log("fields empty")
        } else if(password!==passwordConfirmation){
            setAlert("passwords dont match","danger")

        }else{
        register({
            name,
            email,
            password
        })}
    }
    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span></h1>
        <form onSubmit={submitHandler}>
            <div className="form-group">
<label htmlFor="name">Name</label>
<input type="text" name="name" required value={name} onChange={onChange}/>
            </div>
            <div className="form-group">
<label htmlFor="email">Email address</label>
<input type="text" required name="email" value={email} onChange={onChange}/>
            </div>
            <div className="form-group">
<label htmlFor="password">Password</label>
<input type="password" required minLength="6" name="password" value={password} onChange={onChange}/>
            </div>
            <div className="form-group">
<label htmlFor="passwordConfirmation">Password confirmation</label>
<input type="password" required minLength="6" name="passwordConfirmation" value={passwordConfirmation} onChange={onChange}/>
            </div>
            <input type="submit" value="Register" className="btn btn-block btn-primary"/>
        </form>
        </div>
    )
}

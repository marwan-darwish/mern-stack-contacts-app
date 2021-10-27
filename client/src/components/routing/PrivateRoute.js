import React,{useContext} from 'react'
import AuthContext from '../../context/auth/AuthContext'
import {Route,Redirect} from "react-router-dom"
 const PrivateRoute = ({component:Component,...rest}) => {
     const authContext=useContext(AuthContext)
  

     const {isAuthenticated,loading}=authContext
    //  useEffect(() => {
      
    //     if(!isAuthenticated){
    //         setAlert("private route","danger")
    //         clearErrors()
    //     }
    //     //eslint-disable-next-line
    //     }, [])
    return (
      
      <Route {...rest}  render={props=>!isAuthenticated&&!loading?
        (
          <Redirect to="/login"/>
      ):(
          <Component {...props}/>
      )}/>
    )
}
export default PrivateRoute
import React,{useContext} from 'react'
 import PropTypes from 'prop-types'
 import { Link } from 'react-router-dom'
 import AuthContext from '../../context/auth/AuthContext'
 import ContactContext from '../../context/contact/ContactContext'
export const Navbar = ({title,icon}) => {
    const authContext=useContext(AuthContext)
    const contactContext=useContext(ContactContext)
    const {logOut,user}=authContext
    const{clearContacts}=contactContext
    const onLogout=()=>{
        logOut()
        clearContacts()
    }
    const authLinks=(
        <>
        <li>Hello {user?user.name:"..."}</li>
        <li>
            <a onClick={onLogout} href="#!">
            <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
            </a>
        </li>
        </>
    )
    const guestLinks=(
        <>
        <li>
                    <Link to="/register"> Register</Link>
                </li> <li>
                    <Link to="/login">Login</Link>
                </li>
        </>
    )
    const navItems=localStorage.token?authLinks:guestLinks
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}/> {title}
            </h1>
            <ul>
{navItems}             
            </ul>
        </div>
    )
}
 Navbar.propTypes={
     title:PropTypes.string.isRequired,
     icon:PropTypes.string,
 }
 Navbar.defaultProps={
     title:"Your contacts",
icon:"fas fa-id-card-alt "
}

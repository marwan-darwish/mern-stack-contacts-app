import React,{useState,useContext,useEffect} from 'react'
import ContactContext from '../../context/contact/ContactContext'
import AlertContext from '../../context/alert/AlertContext'
export const ContactForm = () => {
    const contactContext=useContext(ContactContext)
    const alertContext=useContext(AlertContext)
    const{addContact,current,clearCurrentContact,updateContact,error}=contactContext
    const {setAlert}=alertContext
    useEffect(() => {
     if(current!==null){
         setContact(current)
     }else{
        setContact({name:"",
        phone:"",
        email:"",
        type:"personal"})
     }
    }, [contactContext,current])
    const[contact,setContact]=useState({
        name:"",
        phone:"",
        email:"",
        type:"personal"
    })
    const{name,phone,email,type}=contact
    const onChange=e=>setContact({
        ...contact,[e.target.name]:e.target.value
    })
    const onSubmitHandler=e=>{
        e.preventDefault()
        if(name===""||email===""||phone===""){setAlert("please fill all fields","danger")} else{
        if(current===null){
            addContact(contact)
            clearAll()

  }
        else{
updateContact(contact)
clearAll()

        }
        }
    }
    const clearAll=()=>{
clearCurrentContact()
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <h2 className="text-primary">{current?"Edit contact":"Add contact"}</h2>
            <input type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={onChange}
            />
                <input type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            
            />
                <input type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={onChange}
            
            />
            <h5>Contact Type</h5>
            <input
            type="radio"
            name="type"
            value="personal"
            checked={type==="personal"}
            onChange={onChange}

            /> Personal
                <input
            type="radio"
            name="type"
            value="professional"
            checked={type==="professional"}
            onChange={onChange}

            /> Professional
            <div>
                <input type="submit" value={current?"Edit contact":"Add contact"} className="btn btn-primary btn-block"/>
            </div>
            {current&& <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>clear</button>
                </div>}

        </form>
    )
}

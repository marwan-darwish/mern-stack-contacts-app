import { useReducer } from "react";
import axios from "axios"
import ContactContext from "./ContactContext"
import ContactReducer from "./ContactReducer";
import {
    ADD_CONTACT,GET_CONTACTS,CLEAR_CONTACTS,DELETE_CONTACT,SET_CURRENT,CLEAR_CURRENT,UPDATE_CONTACT,FILTER_CONTACTS,CLEAR_FILTER, CONTACT_ERROR
} from "../types"
const ContactState=props=>{
    const initialState={
        contacts:null,
        current:null,
        filtered:null,
        error:null
    }
    const[state,dispatch]=useReducer(ContactReducer,initialState)
    const getContacts=async ()=>{
        try {
            const res=await axios.get("/api/contacts")
            dispatch({
                type:GET_CONTACTS,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:CONTACT_ERROR,
                payload:error.response.msg
            })
        }
    }
    const addContact=async contact=>{
        const config={headers:{
            "Content-Type":"application/json"
        }}
        try {
            const res=await axios.post("/api/contacts",contact,config)
            dispatch({type:ADD_CONTACT,payload:res.data})

        } catch (error) {
            console.log(error);

            dispatch({
                type:CONTACT_ERROR,
                payload:error.response.data
            })
        }
        
    }
    const deleteContact= async id=>{
        try {
            await axios.delete(`/api/contacts/${id}`)
            dispatch({type:DELETE_CONTACT,payload:id})

        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.msg})
        }
    }
    const clearContacts=()=>{
        dispatch({type:CLEAR_CONTACTS})
    }
    const setCurrentContact=contact=>{
        dispatch({type:SET_CURRENT,payload:contact})
    }
    const clearCurrentContact=()=>{
        dispatch({type:CLEAR_CURRENT})
    }
    const updateContact=async contact=>{
        const config={headers:{
            "Content-Type":"application/json"
        }}
        try {
            const res=await axios.put(`/api/contacts/${contact._id}`,contact,config)
            dispatch({type:UPDATE_CONTACT,payload:res.data})

        } catch (error) {
            dispatch({
                type:CONTACT_ERROR,
                payload:error.response.msg
            })
        }
    }
    const filterContacts=text=>{
        dispatch({type:FILTER_CONTACTS,payload:text})
    }
    const clearFilter=()=>{
        dispatch({type:CLEAR_FILTER})
    }
return (
<ContactContext.Provider value={{
    contacts:state.contacts,
    current:state.current,
    error:state.error,
    addContact,
    deleteContact,
    setCurrentContact,
    clearCurrentContact,
    updateContact,
    filtered:state.filtered,
    filterContacts,
    clearFilter,
    getContacts,
    clearContacts
}}>
    {props.children}
</ContactContext.Provider>
    )
}
export default ContactState
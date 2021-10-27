import React,{useContext,useEffect} from 'react'
import {CSSTransition,TransitionGroup} from "react-transition-group"
import { ContactItem } from './ContactItem'
import ContactContext from "../../context/contact/ContactContext"
import Spinner from '../layout/Spinner'
export const Contacts = () => {
    const contactContext=useContext(ContactContext)
    const {contacts,filtered,getContacts,loading}=contactContext
    useEffect(() => {
     getContacts()
     //eslint-disable-next-line
    }, [])
    if(contacts!==null&& contacts.length===0 && !loading){
        return <h3>No contacts...</h3>
    }
    return (
        <>
        {contacts!==null&&!loading?(  <TransitionGroup>
        {/* {filtered!==null?filtered.map(contact=>
            <ContactItem contact={contact} key={contact.id}/>
        ):contacts.map(contact=><ContactItem contact={contact} key={contact.id}/>)} */}
        {filtered!==null?filtered.map(contact=>
   <CSSTransition key={contact._id} timeout={500} classNames="item">
   <ContactItem contact={contact}/>
   </CSSTransition>
):contacts.map(contact=>
    <CSSTransition key={contact._id} timeout={500} classNames="item">
<ContactItem contact={contact}/>

</CSSTransition>)}
       </TransitionGroup>):<Spinner/>}
      
       {filtered!==null&&filtered.length===0?<h3>no items found...</h3>:""}
        </>
    )
}

import React, { useContext,useRef,useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext'

export const ContactFilter = () => {
    const contactContext=useContext(ContactContext)
    const text=useRef("")
    useEffect(() => {
  if(contactContext.filtered===null){
      text.current.value=""
  }
    })
    const onChange=e=>{
        if(text.current.value!==""){
            contactContext.filterContacts(e.target.value)
        } else{
            contactContext.clearFilter()
        }
    }
    return (
        <form>
            <input ref={text} placeholder="enter a name or email" type="text" onChange={onChange}/>
        </form>
    )
}

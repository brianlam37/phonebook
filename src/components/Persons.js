import React from 'react';
import personService from '../services/persons'
const Number = ({person,handleDeleteUpdate, setMessage, setMessageType}) =>{
    const handleClick = ()=>{
        if(window.confirm(`Delete ${person.name}?`)){
            personService.remove(person.id).then(personResponse=>{
                handleDeleteUpdate(person);
                setMessage(`Deleted ${person.name}`);
                setMessageType('success');
                setTimeout(() => {
                    setMessage(null)
                    setMessageType(null);
                }, 5000)
            }).catch(error =>{
                handleDeleteUpdate(person);
                setMessage(`Information of ${person.name} has already been removed from server`);
                setMessageType('error');
                setTimeout(() => {
                    setMessage(null)
                    setMessageType(null);
                }, 5000)
            });
        }
    }
    return(
        <p>{person.name} {person.number} <button onClick={handleClick}>delete</button></p>
    )
}
const Persons = ({persons, handleDeleteUpdate, setMessage, setMessageType}) =>{
    return(
        <>
            {persons.map(p => (<Number key={p.name} handleDeleteUpdate = {handleDeleteUpdate} person = {p} setMessage = {setMessage} setMessageType = {setMessageType}/>))}
        </>
    )
}

export default Persons;
import React from 'react';

const Number = ({person,handleClick}) =>{
    return(
        <p>{person.name} {person.number} <button onClick={() => handleClick(person)}>delete</button></p>
    )
}
const Persons = ({persons, handleClick}) =>{
    return(
        <>
            {persons.map(p => (<Number key={p.id} handleClick = {handleClick} person = {p}/>))}
        </>
    )
}

export default Persons;
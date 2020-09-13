import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import './index.css'
const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const handleNameChange = (event) =>{
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
    }

    const handleClick = (e) =>{
        e.preventDefault();
        const newPerson = {
            name: newName, 
            number: newNumber
        }
        personService
        .create(newPerson)
        .then(personResponse =>{
            setMessage(
                `Added ${newName}`
            )
            setMessageType('success');
            setTimeout(() => {
                setMessage(null)
                setMessageType(null);
            }, 5000)
            setPersons(persons.concat(personResponse));
            setNewName('');
            setNewNumber('');
        }).catch(error => {
            setMessage(
                `There was an error adding ${newName}`
            )
            setMessageType('error');
            setTimeout(() => {
                setMessage(null)
                setMessageType(null);
            }, 5000)
        });
    }

    const handleDeleteUpdate = (person) =>{
        let copy = persons.filter(p => p.id !== person.id);
        if(window.confirm(`Delete ${person.name}?`)){
            personService.remove(person.id).then(personResponse=>{
                setPersons(copy);
                setMessage(`Deleted ${person.name}`);
                setMessageType('success');
                setTimeout(() => {
                    setMessage(null)
                    setMessageType(null);
                }, 5000)
            }).catch(error =>{
                setPersons(copy);
                setMessage(`Information of ${person.name} has already been removed from server`);
                setMessageType('error');
                setTimeout(() => {
                    setMessage(null)
                    setMessageType(null);
                }, 5000)
            });
        }

    }
    const handleFilterChange = (event) =>{
        setFilter(event.target.value)
    }

    useEffect(() => {
        personService
        .getAll()
          .then(persons => {
            setPersons(persons)
          })
      }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} type = {messageType}/>
            <Filter handleFilterChange = {handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm 
                newName = {newName} 
                newNumber = {newNumber}
                handleNameChange = {handleNameChange} 
                handleClick = {handleClick} 
                handleNumberChange = {handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons handleClick = {handleDeleteUpdate} persons = {persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))}/>

        </div>
    )
}

const Notification = ({ message,type}) => {
    if (message === null) {
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
}

export default App

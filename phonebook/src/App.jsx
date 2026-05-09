import {useState, useEffect} from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import phoneService from './phoneService';

const App = () => {
  const [phonebook, setPhonebook] = useState([])
  const [newPhonebook, setnewPhonebook] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    phoneService
      .getAll()
      .then(initialPhone=>
        setPhonebook(initialPhone)
      )
  },[])
  
  const filteredPhoneBook = searchTerm === '' 
    ? phonebook 
    : phonebook.filter(person => 
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

 return (
  <div>
    <h1>Phonebook</h1>

    <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

    <PersonForm 
        phonebook={phonebook} 
        setPhonebook={setPhonebook} 
        newPhonebook={newPhonebook} 
        setnewPhonebook={setnewPhonebook}
    />  

    <Persons 
      phonebook={phonebook}
      setPhonebook={setPhonebook}
      filteredPhonebook={filteredPhoneBook}
    />

  </div>
 )
}

export default App;
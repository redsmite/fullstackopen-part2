import {useState, useEffect} from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import axios from 'axios'

const App = () => {
  const [phonebook, setPhonebook] = useState([])
  const [newPhonebook, setnewPhonebook] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const hook = () =>{
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
          setPhonebook(response.data)
        }
      )
  }

  useEffect(hook,[])
  
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

    <Persons phonebook={filteredPhoneBook}/>

  </div>
 )
}

export default App;
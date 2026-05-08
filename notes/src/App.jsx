import Note from './component/Notes'
import { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNotes, setNewNotes] = useState('')

  const hook = () => {
    axios
      .get('http://127.0.0.1:3001/notes')
      .then(response=>{
          setNotes(response.data)
        }
      )
  }
  
  useEffect(hook,[])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newObject = {
      content: newNotes,
      important: Math.random() > 0.5,
      id: notes.length+1,
    }
    setNotes(notes.concat(newObject))
    setNewNotes('')
  }

  const handleChangeInput = (event) => {
    const inputValue = event.target.value
    setNewNotes(inputValue)
  }

  return(
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note=>
          <Note key={note.id} note={note}/>
        )}
      </ul>
      <div>
        <form onSubmit={handleSubmit}>
          <input value={newNotes} onChange={handleChangeInput}/>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )

}

export default App;
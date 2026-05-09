import Note from './component/Notes'
import { useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNotes, setNewNotes] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios
      .get('http://localhost:3001/notes')
      .then(response=>
        setNotes(response.data)
      )
  }

  useEffect(hook,[])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newObject = {
      content: newNotes,
      important: Math.random() > 0.5,
    }
    axios
      .post('http://localhost:3001/notes', newObject)
      .then(response=>{
          setNotes(notes.concat(response.data))
          setNewNotes('')
        }
      )
  }

  const handleInputChange = (event) => {
    const inputVal = event.target.value
    setNewNotes(inputVal)
  }

  const filteredNotes = showAll ? 
    notes 
      : 
    notes.filter(note=>note.important)

    const toggleImportant = id => {
      const url = `http://localhost:3001/notes/${id}`
      const note = notes.find(n=>n.id===id)
      const changedNote = {...note, important: !note.important}

      axios
        .put(url,changedNote)
        .then(response=>
          setNotes(notes.map(note=>note.id===id ? response.data : note))
        )
    }

  return(
    <div>
      <h1>Notes</h1>
      <button onClick={()=>setShowAll(!showAll)}> 
        show {showAll ? 'important': 'all'}
      </button>
      <ul>
        {filteredNotes.map(note=>
          <Note key={note.id} 
          toggleImportance={()=>toggleImportant(note.id)} 
          note={note}/>
        )}
      </ul>
      <div>
        <form onSubmit={handleSubmit}>
          <input value={newNotes} onChange={handleInputChange} />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}

export default App;
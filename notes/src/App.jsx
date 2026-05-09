import noteService from './noteService.js'
import Note from './component/Notes.jsx'
import {useState, useEffect} from 'react'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNotes, setNewNotes] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(()=>{
    noteService
      .getAll()
      .then(initialNotes=>
        setNotes(initialNotes)
    )
  },[])

  const handleSubmit = e => {
    e.preventDefault()
    const newObject = {
      content: newNotes,
      important: Math.random() > 0.5,
    }
    noteService
      .create(newObject)
      .then(returnedObject=>
        setNotes(notes.concat(returnedObject))
      )
    setNewNotes('')
  }

  const handleNoteChange = e =>{
    const input = e.target.value
    setNewNotes(input)
  }

  const filteredNotes = showAll ?
    notes :
    notes.filter(filter=>filter.important)

  const toggleImportant = id => {
    const note = notes.find(n=>n.id===id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id,changedNote)
      .then(returnedObject=>
        setNotes(notes.map(n=>n.id===id?returnedObject:n))
      )
  }

  return(
    <div>
      <h1>Notes</h1>
      <button onClick={()=>setShowAll(!showAll)}>show {showAll? 'important' : 'all'}</button>
      <ul>
        {filteredNotes.map(note=>
          <Note 
            key={note.id} 
            note={note}
            toggleImportant={()=>toggleImportant(note.id)}/> 
        )}
      </ul>
      <div>
        <form onSubmit={handleSubmit}>
          <input value={newNotes} onChange={handleNoteChange} />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}

export default App;
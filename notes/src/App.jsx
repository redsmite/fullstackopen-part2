import Note from './component/Notes'
import {useState, useEffect} from 'react'
import axios from 'axios'
import noteService from './noteService'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNotes, setNewNotes] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(()=>{
    noteService
      .getAll()
      .then(initialNotes=>
        setNotes(initialNotes)
      )}, []
  )

  const handleSubmit = event => {
    event.preventDefault()
    const newObject = {
      content : newNotes,
      important : Math.random() > 0.5,
    }
    noteService
      .create(newObject)
      .then(returnedNote=>
        setNotes(notes.concat(returnedNote))
      )
    setNewNotes('')
  }

  const handleNoteChange = event => {
    const inputVal = event.target.value
    setNewNotes(inputVal)
  }

  const filterNotes = showAll ?
    notes :
    notes.filter(n=>n.important)

  const toggleImportant = id => {
    const note = notes.find(n=>n.id===id)
    const changedNote = {...note, important : !note.important}
    noteService
      .update(id, changedNote)
      .then(returnedNote=>
        setNotes(notes.map(n=>n.id===id?returnedNote:n))
      )
  }

  return(
    <div>
      <h1>Notes</h1>
      <button onClick={()=>setShowAll(!showAll)}>show {showAll ? 'important': 'all'}</button>
      <ul>
        {
        filterNotes.map(note=>
        <Note 
          key={note.id} 
          toggleImportant={()=>toggleImportant(note.id)}
          note={note}
        />)
        }
      </ul>

      <div>
        <form onSubmit={handleSubmit}>
          <input value={newNotes} onChange={handleNoteChange}/>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}

export default App;
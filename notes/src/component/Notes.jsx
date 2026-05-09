const Note = ({note, toggleImportant}) => {
    const label = note.important ? 'not important': 'important'
    return(
        <li>
            {note.content}
            <button onClick={toggleImportant}>make {label}</button>    
        </li>
    )
}

export default Note
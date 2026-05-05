const PersonForm = ({ phonebook, newPhonebook, setnewPhonebook, setPhonebook }) => {
    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(newPhonebook)
        const personExists = phonebook.some(person => person.name === newPhonebook.name)

        if (personExists){
        alert(`${newPhonebook.name} is already added to phonebook`)
        return
        }
        const newObject = {
        name: newPhonebook.name,
        number: newPhonebook.number,
        id: phonebook.length+1,
        }
        setPhonebook(phonebook.concat(newObject))
        setnewPhonebook({name:'',number:''})
    }

    const handleNameInputChange = (event) => {
        setnewPhonebook({
        ...newPhonebook,
        name: event.target.value,
        })
    }

    const handleNumberInputChange = (event) => {
        setnewPhonebook({
        ...newPhonebook,
        number: event.target.value,
        })
    }
    return (
        <>
            <h1>add a new</h1>
            <form onSubmit={handleSubmit}>
            <div>name <input value={newPhonebook.name} onChange={handleNameInputChange}/></div>
            <div>number <input value={newPhonebook.number} onChange={handleNumberInputChange}/></div>
            <button type="submit">add</button>
            </form>
        </>
    )
}

export default PersonForm;
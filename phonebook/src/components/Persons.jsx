const Persons = (props) => {
    return (
        <>
            <h1>Numbers</h1>
            {props.phonebook.map(phone => <p key={phone.id}>{phone.name} {phone.number}</p>)}
        </>
    )
}

export default Persons;
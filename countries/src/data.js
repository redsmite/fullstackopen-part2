import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
    const url = `${baseUrl}/all`
    const result = axios.get(url)
    return result.then(response=>
        response.data
    )
}

const getName = (search) => {
    const path = `${baseUrl}/name/${search}`
    const result = axios.get(path)
    return result.then(response=>
        response.data
    )
}

export default { getAll, getName }
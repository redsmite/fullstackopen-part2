import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
    const result = axios.get(`${baseUrl}/all`)
    return result.then(response=>
        response.data
    )
}

const get = filter => {
    const result = axios.get(`${baseUrl}/name/${filter}`)
    return result.then(response=>
        response.data
    )
}

export default {getAll,get}
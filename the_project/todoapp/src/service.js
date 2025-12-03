import axios from 'axios'

const baseurl = 'http://localhost:3010'


const getFile = async () => {
    console.log("get url")
    return axios.get(`${baseurl}/imageurl`)
    
}

export default getFile
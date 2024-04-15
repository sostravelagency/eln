import axios from "axios"
import { API_URL } from "../../config"

const get_me= async (accessToken)=> {
    const res= await axios({
        url: API_URL + "/me",
        method: 'get',
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    })
    const result= await res.data
    return result
}

export default get_me
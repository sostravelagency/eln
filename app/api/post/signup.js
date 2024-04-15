import axios from "axios"
import { API_URL } from "../../config"

const signup= async (data)=> {
    const res= await axios({
        url: API_URL + "/register",
        method: 'post',
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default signup
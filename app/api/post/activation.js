import axios from "axios"
import { API_URL } from "../../config"

const activation= async (data)=> {
    const res= await axios({
        url: API_URL + "/activate-user",
        method: 'post',
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default activation
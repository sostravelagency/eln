import axios from "axios"
import { API_URL } from "../../config"

const login_social= async (data)=> {
    const res= await axios({
        url: API_URL + "/social-auth",
        method: 'post',
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default login_social
import axios from "axios"
import { API_URL } from "../../config"

const get_detail_course= async (id)=> {
    const res= await axios({
        url: API_URL + "/get-course/"+ id,
        method: 'get'
    })
    const result= await res.data
    return result
}

export default get_detail_course
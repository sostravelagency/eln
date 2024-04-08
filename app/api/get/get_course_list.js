import axios from "axios"
import { API_URL } from "../../config"

const get_course_list= async ()=> {
    const res= await axios({
        url: API_URL + "/get-courses",
        method: 'get'
    })
    const result= await res.data
    return result
}

export default get_course_list
import axios from "axios"
import { API_URL } from "../../config"

const get_categories_list= async ()=> {
    const res= await axios({
        url: API_URL + "/get-layout/Categories",
        method: 'get'
    })
    const result= await res.data
    return result
}

export default get_categories_list
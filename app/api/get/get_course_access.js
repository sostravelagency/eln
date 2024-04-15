import axios from "axios"
import { API_URL } from "../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"

const get_course_content= async (id)=> {
    const accessToken= await AsyncStorage.getItem("accessToken")
    const res= await axios({
        url: API_URL + "/get-course-content/"+ id,
        method: 'get',
        headers: {
            "Authorization": "Bearer "+ accessToken
        }
    })
    const result= await res.data
    return result
}

export default get_course_content
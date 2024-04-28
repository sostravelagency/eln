import axios from "axios"
import { API_URL } from "../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"

const add_review= async (data, courseId)=> {
    const accessToken= await AsyncStorage.getItem("accessToken")

    const res= await axios({
        url: API_URL + "/add-review/"+ courseId,
        method: 'put',
        headers: {
            "Authorization": "Bearer "+ accessToken
        },
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default add_review
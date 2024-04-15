import axios from "axios"
import { API_URL } from "../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"

const update_avatar= async (data)=> {
    const accessToken= await AsyncStorage.getItem("accessToken")

    const res= await axios({
        url: API_URL + "/update-user-avatar",
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

export default update_avatar
import axios from "axios"
import { API_URL } from "../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"

const create_order= async (data)=> {
    const accessToken= await AsyncStorage.getItem("accessToken")

    const res= await axios({
        url: API_URL + "/create-order-app",
        method: 'post',
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

export default create_order
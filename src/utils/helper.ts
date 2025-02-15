
import axios from "axios"
import { BASE_URL } from "./config"
export const makePostApiCall = async (url:string,data:any) =>{
    let result;
    try {
        await axios.post(`${BASE_URL+url}`,data).then(response=>{
            console.log(`
                URL: ${url} \n
                Response: ${JSON.stringify(response.data)}
            `)
            result = {
                isLoading:false,
                data : JSON.stringify(response.data),
                success:true
            }
        })
    } catch (error) {
        console.log(`
            URL: ${url} \n
            Error: ${error}
        `)
        result = {
            isLoading:false,
            data:error,
            success:false
        }
    }

    return result
}
import axios from "axios"
let base = "";
if (process.env.NODE_ENV === 'production') {
    base= "https://insta-clone-910.herokuapp.com/"
}
export const axiosInstance = axios.create({
    basseURL :base
}) 


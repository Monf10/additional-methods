import axios from "axios";

export default function apiRequests(method,endpoint, data,headers ={}){ 
    const defaultHEader = {
        Verified : "uniqueVerif" 
    }
    return axios({
        url:"https://reqres.in/api"+ endpoint,
        method,
        data,
        headers : {... defaultHEader,...headers}

})
.then(response => response.data.data)
}
import axios from "axios";

export const commonrequest = async(methods,url,body,header, queryParams={})=>{
    let config = {
        method:methods,
        url,
        headers:header ? header 
        :{
            "Content-Type":"application/json"
        },
        data:body,
        params: queryParams
    }

    // axios call and handling response
    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        return error
    })
}
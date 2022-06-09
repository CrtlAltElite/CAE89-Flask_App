import apiClientNoAuth from "./clientNoAuth";
import apiClientTokenAuth from "./clientTokenAuth";

const endpoint = '/api/item'

const get = async(cancelToken)=>{
    let error;
    let items;
    const response = await apiClientNoAuth(cancelToken).get(endpoint);
    if(response.ok){
        items=response.data.items
    }else{
        error = "An Unexpected Error has Occured. Please Try again Later."
    }
    return {
        error,
        items
    }
}

const getItem = async(id, cancelToken)=>{
    let error;
    let item;
    const response = await apiClientNoAuth(cancelToken).get(endpoint+'/'+id);
    if (response.ok){
        item=response.data
    }else if(response.status === 404){
        error= 'Your Item was Not Found'
    }else{
        error = "An Unexpected Error has Occured. Please Try again Later."
    }
    return{
        error,
        item
    }
}


const getByCat = async(id, cancelToken)=>{
    let error;
    let items;
    const response = await apiClientNoAuth(cancelToken).get(endpoint+'/category/'+id);
    if(response.ok){
        items=response.data.items
    }else{
        error = "An Unexpected Error has Occured. Please Try again Later."
    }
    return {
        error,
        items
    }
}



const post = async(token, data, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint, data)
    return response.ok
}


const put = async(token, id, data, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+'/'+id, data)
    return response.ok
}

const del = async(token, id, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+'/'+id)
    return response.ok
}

const apiClient={
    get,
    getItem,
    getByCat,
    post,
    put,
    del
}

export default apiClient
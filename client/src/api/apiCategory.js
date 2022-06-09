import apiClientNoAuth from './clientNoAuth'
import apiClientTokenAuth from './clientTokenAuth'

const endpoint= '/api/category'

const get = async (cancelToken) =>{
    let error;
    let categories;

    const response = await apiClientNoAuth(cancelToken).get(endpoint)
    if (response.ok){
        categories=response.data.categories
    }else{
        error = "An Unexpected Error has Occured. Please Try again Later."
    }
    return{
        error,
        categories
    }
}

const post = async (token, catName, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint,{name:catName})
    return response.ok
}

const put = async (token, id, catName, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+'/'+id,{name:catName})
    return response.ok
}

const del = async(token, id, cancelToken)=>{
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+'/'+id)
    return response.ok
}

const apiClient = {
    get,
    post,
    put,
    del
}
export default apiClient
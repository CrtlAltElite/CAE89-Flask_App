import apiClient from './clientTokenAuth'
 
const endpoint='/api/create-checkout-session'

export const postTransaction=async(token, data, cancelToken)=>{
    const response = await apiClient(token,cancelToken).post(endpoint, data);
    return window.location.href = response.data.url
}

const stripeClient={
    postTransaction
}
export default stripeClient
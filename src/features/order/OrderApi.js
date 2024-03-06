import axios from "axios";

const baseUrl="https://store-kg53.onrender.com";

export const getAllOrdersFromServer=()=>{
    return axios.get(`${baseUrl}/api/orders`);
}
export const getUserOrdersByTokenIdFromServer=(token)=>{
    return axios.get(`${baseUrl}/api/orders/token`,{
        headers:{"x-access-token":token},
    });
}
export const deleteOrderFromServer=(id,token)=>{
    return axios.delete(`${baseUrl}/api/orders/${id}`,{
    headers:{"x-access-token":token},
});
}
export const addOrderToServer=(order,token)=>{
    return axios.post(`${baseUrl}/api/orders`,order,{
    headers:{"x-access-token":token}
});
}
export const updateOrderToServer=(id,updateOrder,token)=>{
    return axios.put(`${baseUrl}/api/orders/${id}`,updateOrder,{
       headers:{"x-access-token":token} 
    });
}









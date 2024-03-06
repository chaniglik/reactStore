import axios from "axios";

const baseUrl="https://store-kg53.onrender.com";

export const getAllProductsFromServer=(page,perPage,search)=>{
    return axios.get(`${baseUrl}/api/products/?page=${page}&perPage=${perPage}&search=${search}`);
}
export const getAllProductsFromServer1=()=>{
    return axios.get(`${baseUrl}/api/products`);
}
export const getProductByIdFromServer=(id)=>{
    return axios.get(`${baseUrl}/api/products/${id}`)
}
export const deleteProductFromServer=(id,token)=>{
    return axios.delete(`${baseUrl}/api/products/${id}`,{
    headers:{"x-access-token":token},
});
}
export const addProductToServer=(product,token)=>{
    return axios.post(`${baseUrl}/api/products`,product,{
    headers:{"x-access-token":token}
});
}
export const updateProductToServer=(id,updateProduct,token)=>{
    return axios.put(`${baseUrl}/api/products/${id}`,updateProduct,{
       headers:{"x-access-token":token} 
    });
}









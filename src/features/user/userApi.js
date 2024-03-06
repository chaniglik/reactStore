import axios from "axios";

const baseUrl ="https://store-kg53.onrender.com";

export const login = (email, password) => {
  return axios.post(`${baseUrl}/api/users/login`, { email, password });
};
export const addUserToServer=(email,password,nameUser)=>{
  return axios.post(`${baseUrl}/api/users`,{email,password,nameUser}
);
}

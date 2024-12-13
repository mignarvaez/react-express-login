import axios from "axios";
const SERVER = "http://localhost:3000/auth/";

export const validateToken = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(SERVER + "home",
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    )
    return response
}

export const login = async (values) => {
    return await axios.post(SERVER + "/login", values);
}

export const register = async (values) => {
    return await axios.post(SERVER + "/register", values);
}
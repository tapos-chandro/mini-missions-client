import axios from "axios";
import useAuth from "./useAuth";


const useAxiosSecure = () => {

    const {logOutUser,} = useAuth();
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000/api/v1',
        withCredentials: true
    })

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    } , (error) => {
        console.log(error)
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use((response) => {
        return response
    }, (error) => {
        const status = error.response?.status;
        console.log(status)
        if (status === 401 || status === 403) {
          logOutUser().catch(err => console.error('Logout failed:', err));
        }
        return Promise.reject(error);
    })
    return axiosSecure
};

export default useAxiosSecure;
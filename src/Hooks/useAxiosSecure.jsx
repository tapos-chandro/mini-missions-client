import axios from 'axios';

const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000/app/v1' 
    })
    return axiosSecure
};

export default useAxiosSecure;
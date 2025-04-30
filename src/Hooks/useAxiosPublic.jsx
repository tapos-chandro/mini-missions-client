import axios from "axios";


const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'http://localhost:5000/app/v1'
    })

    return axiosPublic
};

export default useAxiosPublic;
import axios from "axios";


const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'https://mini-mission-server.vercel.app/api/v1'
    })

    return axiosPublic
};

export default useAxiosPublic;
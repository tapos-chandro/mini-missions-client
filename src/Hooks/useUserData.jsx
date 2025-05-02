import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";



const useUserData = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem('access-token')

    console.log(authLoading, 'auth loading running')


    const { data: userData, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            if (token && user?.email) {
                const res = await axiosSecure.get(`/users?email=${user?.email}`);
                console.log(res.data)
               return res.data
            }
          
        }

    })
    return [userData, isLoading, refetch]


};

export default useUserData;
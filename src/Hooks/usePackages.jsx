
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const usePackages = () => {
    const axiosSecure = useAxiosSecure();

    const { data: coinPackages, isLoading } = useQuery({
        queryKey: ['coinPackages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/package')
            return res.data
        }
    })

    return {coinPackages, isLoading}
};

export default usePackages;
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';

const useTasks = () => {
    const axiosPublic = useAxiosPublic();
    
    const {data:tasks, isLoading, refetch} = useQuery({
        queryKey:['tasksData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tasks')
            return res.data;
        }
    })

    return { tasks , isLoading, refetch}

};

export default useTasks;
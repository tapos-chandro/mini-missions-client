import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Statistics = () => {
    const axiosPublic = useAxiosPublic();


    const {data} = useQuery({
        queryKey: ['platformStates'],
        queryFn: async () => {
            const res = await axiosPublic.get('/platform-states')
            return res.data
        }
    })


    const stats = {
        totalTasks: 10000,
        totalWorkers: 5000,
        coinsDistributed: 2000000,
        activeTasksToday: 150
      };

    return (
        <section className="py-16 text-center">
            <SectionTitle title="Platform Statistics"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 gap-10 justify-center space-x-8 ">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <h3 className="text-xl font-semibold">Total Tasks Completed</h3>
                    <p className="text-4xl font-bold text-primary-color">{data?.totalCompletedTask}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <h3 className="text-xl font-semibold">Total Workers Registered</h3>
                    <p className="text-4xl font-bold text-primary-color">{data?.totalWorkers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <h3 className="text-xl font-semibold">Active Tasks</h3>
                    <p className="text-4xl font-bold text-primary-color">{data?.totalTasks}</p>
                </div>
            </div>
        </section>
    );
};

export default Statistics;
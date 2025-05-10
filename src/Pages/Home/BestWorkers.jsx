
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../components/SectionTitle';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import Loading from './../../components/Loading';


const BestWorkers = () => {

    const axiosSecure = useAxiosSecure();


    const {data:topWorkers, isLoading, refetch} = useQuery({
        queryKey: ['topWorkers'],
        queryFn: async () => {
            const res = await axiosSecure('/top-workers')
            return res.data
        }
    })


    if(isLoading){
        return <Loading></Loading>
    }
    console.log(topWorkers,'top Workers');


    return (
        <div>
            <SectionTitle title="Top Workers 🏆" />
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-10 ">
                    {topWorkers.map((worker) => (
                        <div
                            key={worker.id}
                            className="bg-white shadow-md rounded-lg  border border-primary-color p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300"
                        >
                            <img
                                src={worker.image}
                                alt={worker.name}
                                className="w-24 h-24 rounded-full object-cover mb-4"
                            />
                            <h3 className="text-xl font-semibold text-secondary-color ">{worker.name}</h3>
                            <p className="text-primary-color font-bold text-lg mt-2">
                                {worker.coins} Coins
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BestWorkers;
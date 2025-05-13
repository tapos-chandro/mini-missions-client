import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../components/SectionTitle';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import Loading from './../../components/Loading';

const BestWorkers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: topWorkers, isLoading } = useQuery({
    queryKey: ['topWorkers'],
    queryFn: async () => {
      const res = await axiosSecure('/top-workers');
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <SectionTitle title="Top Workers 🏆" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-10">
        {topWorkers.map((worker, index) => (
          <div
            key={worker.id}
            className="bg-white/60 backdrop-blur-md border border-gray-200 shadow-lg rounded-3xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            {/* Avatar */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-full h-full object-cover"
              />
              {/* Rank Medal */}
              {index < 3 && (
                <div className="absolute -top-2 -right-2 text-lg">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                </div>
              )}
            </div>

            {/* Name & Coins */}
            <h3 className="text-xl font-bold text-gray-800">{worker.name}</h3>
            <p className="text-sm text-gray-600 mt-1">Top Performer</p>
            <p className="mt-3 text-primary-color font-semibold text-lg">
              {worker.coins} Coins
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;

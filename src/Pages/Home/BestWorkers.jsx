import React from 'react';
import SectionTitle from '../../components/SectionTitle';

const BestWorkers = () => {


    const topWorkers = [
        {
            id: 1,
            name: "Alice Johnson",
            coins: 1200,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s",
        },
        {
            id: 2,
            name: "Brian Smith",
            coins: 1150,
            image: "/workers/worker2.jpg",
        },
        {
            id: 3,
            name: "Carla Gomez",
            coins: 1100,
            image: "/workers/worker3.jpg",
        },
        {
            id: 4,
            name: "Daniel Lee",
            coins: 1050,
            image: "/workers/worker4.jpg",
        },
        {
            id: 5,
            name: "Ella Brown",
            coins: 1000,
            image: "/workers/worker5.jpg",
        },
        {
            id: 6,
            name: "Frank Wilson",
            coins: 950,
            image: "/workers/worker6.jpg",
        },
    ];


    return (
        <div>
            <SectionTitle title="Top Workers 🏆" />
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-10">
                    {topWorkers.map((worker) => (
                        <div
                            key={worker.id}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300"
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
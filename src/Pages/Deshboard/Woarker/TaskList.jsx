import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import ReactHelmet from '../../../components/ReactHelmet';

const TaskList = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    const {data: tasks , isLoading} = useQuery({
        queryKey: ['taskData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/available-task')
            return res.data
        }
    })

    return (
        <div className="py-10 px-4 max-w-7xl mx-auto">
            <ReactHelmet helmetText={"Worker || Task List"}/>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Available Tasks
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks?.map(task => (
                    <div
                        key={task?._id}
                        className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between border border-primary-color hover:shadow-lg transition"
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {task.task_title}
                            </h3>
                            <p className="text-gray-600">
                                <span className="font-medium">Buyer:</span> {task.buyer_name}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Deadline:</span> {task.completion_date}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Payable:</span> {task.payable_amount} Coins
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Required Workers:</span> {task.required_workers}
                            </p>
                        </div>

                        <button
                            onClick={() => navigate(`/dashboard/detail/${task._id}`)}
                            className="mt-6 btn bg-primary-color text-white hover:bg-opacity-90 w-full rounded-full"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;

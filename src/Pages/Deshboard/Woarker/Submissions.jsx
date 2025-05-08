import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Loading from './../../../components/Loading';

const Submissions = () => {
    // Static data for submissions
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [pageNumber, setPageNumber] = useState(1)




    const { data, isLoading } = useQuery({
        queryKey: ['submissionData', pageNumber],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions?email=${user?.email}&page=${pageNumber}&limit=${2}`);
            return res.data
        }
    })

    // if (isLoading) {
    //     return <Loading></Loading>
    // }

    const parPage = Math.ceil(data?.submissionsCount / 2) || []
    const totalPages = Object.keys([...Array(parPage)]) || []



    // Function to get status colors
    const getStatusClass = (status) => {
        switch (status) {
            case 'approved':
                return 'text-green-600 bg-green-100';
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'rejected':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">My Submissions</h2>

            {
                !isLoading ? <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                            <tr>
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Task Title</th>
                                <th className="px-6 py-3">Buyer</th>
                                <th className="px-6 py-3">Submitted On</th>
                                <th className="px-6 py-3">Payable</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.submissions?.map((sub, idx) => (
                                <tr key={idx} className=" hover:bg-gray-50 border-b border-gray-200">
                                    <td className="px-6 py-4">{idx + 1}</td>
                                    <td className="px-6 py-4">{sub.task_title}</td>
                                    <td className="px-6 py-4">{sub.Buyer_name}</td>
                                    <td className="px-6 py-4">{sub.current_date}</td>
                                    <td className="px-6 py-4">${sub.payable_amount}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                                                sub.status
                                            )}`}
                                        >
                                            {sub.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>:
                <div className='flex justify-center items-center min-h-[400px]'>
                    <span className="loading loading-spinner loading-xl text-primary-color text-center"></span>
                </div>
            }
            <div className="join flex justify-center pt-10 gap-x-2">
                <button className='join-item btn'>Prev</button>
                {
                    totalPages?.map(page => <button onClick={() => setPageNumber(Number(page) + 1)} className={`join-item btn  text-light rounded-md ${pageNumber === Number(page) + 1 ? 'bg-red-400' : 'text-secondary-color'}`}>{Number(page) + 1}</button>)
                }
                <button className='join-item btn'>Next</button>
            </div>
        </div>
    );
};

export default Submissions;

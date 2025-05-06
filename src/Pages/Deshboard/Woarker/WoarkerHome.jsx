import { useQueries } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const WorkerHome = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();



    const [approvedSubmissions, states, isLoading] = useQueries(
        {
            queries:
                [
                    {
                        queryKey: ['withdrawals'],
                        queryFn: async () => {
                            const res = await axiosSecure.get(`/approve-submissions?email=${user?.email}`)
                            return res.data
                        }
                    },
                    {
                        queryKey: ['states'],
                        queryFn: async () => {
                            const res = await axiosSecure.get(`/states?email=${user?.email}`)
                            return res.data
                        }
                    }
                ]
        }
    )

    console.log(states.data,'sklfslkfj')


    // console.log(states.data,'slfjslkfjslk')

    // Fake submission data
    // const submissions = [
    //     {
    //         task_title: 'Design Logo',
    //         payable_amount: 5,
    //         Buyer_name: 'Alice',
    //         status: 'approved',
    //     },
    //     {
    //         task_title: 'Write Blog Post',
    //         payable_amount: 3,
    //         Buyer_name: 'Bob',
    //         status: 'pending',
    //     },
    //     {
    //         task_title: 'Create Landing Page',
    //         payable_amount: 7,
    //         Buyer_name: 'Charlie',
    //         status: 'approved',
    //     },
    //     {
    //         task_title: 'Data Entry',
    //         payable_amount: 2,
    //         Buyer_name: 'Dave',
    //         status: 'rejected',
    //     },
    //     {
    //         task_title: 'Social Media Management',
    //         payable_amount: 4,
    //         Buyer_name: 'Alice',
    //         status: 'pending',
    //     },
    // ];

    const [stats, setStats] = useState({
        totalSubmissions: 0,
        pendingSubmissions: 0,
        totalEarnings: 0,
    });

    // const [approvedSubmissions, setApprovedSubmissions] = useState([]);

    // useEffect(() => {
    //     const total = submissions?.length;
    //     const pending = submissions?.filter(s => s.status === 'pending')?.length;
    //     const approved = submissions?.filter(s => s.status === 'approved');
    //     const earnings = approved?.reduce((sum, s) => sum + s.payable_amount, 0);

    //     setStats({
    //         totalSubmissions: total,
    //         pendingSubmissions: pending,
    //         totalEarnings: earnings,
    //     });

    //     setApprovedSubmissions(approved);
    // }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <h3 className="text-lg font-semibold text-shadow-secondary-color">Total Submissions</h3>
                    <p className="text-3xl font-bold text-blue-600">{states?.data?.totalSubmissions}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <h3 className="text-lg font-semibold text-secondary-color">Pending Submissions</h3>
                    <p className="text-3xl font-bold text-yellow-500">{states?.data?.pendingSubmissions}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <h3 className="text-lg font-semibold text-secondary-color">Total Earnings</h3>
                    <p className="text-3xl font-bold text-green-600">${states?.data?.totalEarning?.toFixed(2)}</p>
                </div>
            </div>

            {/* Approved Submissions Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
                <h2 className="text-2xl font-semibold text-secondary-color mb-4">Approved Submissions</h2>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className=" text-left text-sm font-semibold text-secondary-color">
                            <th className="p-3">Task Title</th>
                            <th className="p-3">Payable Amount</th>
                            <th className="p-3">Buyer Name</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedSubmissions?.data?.map((submission, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-3">{submission.task_title}</td>
                                <td className="p-3">{submission.payable_amount} coins</td>
                                <td className="p-3">{submission.Buyer_name}</td>
                                <td className="p-3 capitalize text-primary-color font-semibold">
                                    {submission.status}
                                </td>
                            </tr>
                        ))}
                        {approvedSubmissions?.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-secondary-color">No approved submissions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkerHome;

import { useQueries } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../components/Loading';



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


    if(isLoading){
        return <Loading></Loading>
    }


    // console.log(approvedSubmissions.data)
    const approvedSortData = approvedSubmissions?.data?.sort((a, b) =>new Date(b.current_date)  - new Date(a.current_date))
    // console.log(approvedSortData, 'slflssssssssssssssssssssssssssssssssssssssssssss')


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
                        {approvedSortData?.map((submission, index) => (
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

import { useQueries } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from './../../../components/Loading';

const AdminHome = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();




    const [adminStates, withdrawals, refetch, isLoading] = useQueries({
        queries: [
            {
                queryKey: ['adminStates'],
                queryFn: async () => {
                    const res = await axiosSecure.get(`/admin-states?email=${user?.email}`)
                    return res.data
                }
            },
            {
                queryKey: ['adminWithdrawal'],
                queryFn: async () => {
                    const res = await axiosSecure.get(`/withdrawals?email=${user?.email}`)
                    return res.data
                }
            }
        ]
    })



    if (isLoading) {
        return <Loading></Loading>
    }


    const handleApprove = async (id) => {
        const res = await axiosSecure.patch(`/withdrawal-approve?id=${id}`)
        if (res.data.modifiedCount > 0) {
            withdrawals.refetch()
        }

    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <p className="text-lg font-semibold">Total Workers</p>
                    <p>{adminStates?.data?.totalWorkers}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow">
                    <p className="text-lg font-semibold">Total Buyers</p>
                    <p>{adminStates?.data?.totalBuyers}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg shadow">
                    <p className="text-lg font-semibold">Total Coins</p>
                    <p>{adminStates?.data?.totalCoins}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg shadow">
                    <p className="text-lg font-semibold">Total Payments</p>
                    <p>${adminStates?.data?.totalPayments}</p>
                </div>
            </div>

            {/* Withdrawal Requests Table */}
            <h2 className="text-xl font-semibold mb-3">Pending Withdrawal Requests</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border">User ID</th>
                            <th className="px-4 py-2 border">Amount</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawals?.data?.map(withdrawal => (
                            <tr key={withdrawal?._id} className="text-center">
                                <td className="px-4 py-2 border">{withdrawal._id}</td>
                                <td className="px-4 py-2 border">{withdrawal.withdrawal_amount}</td>
                                <td className={`px-4 py-2 border ${withdrawal?.status === "approved" ? 'text-primary-color capitalize' : 'text-orange-400'}`}>{withdrawal.status}</td>
                                <td className="px-4 py-2 border">
                                    {
                                        withdrawal?.status === "approved" ? <p className="text-primary-color"> Payment Success</p> :
                                            <button
                                                onClick={() => handleApprove(withdrawal._id)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                            >
                                                Payment Success
                                            </button>
                                    }
                                </td>
                            </tr>
                        ))}
                        {withdrawals.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                                    No pending withdrawals.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHome;

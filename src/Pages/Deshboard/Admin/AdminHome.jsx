import { useQueries } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from './../../../components/Loading';
import ReactHelmet from "../../../components/ReactHelmet";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [adminStates, withdrawals] = useQueries({
    queries: [
      {
        queryKey: ['adminStates'],
        queryFn: async () => {
          const res = await axiosSecure.get(`/admin-states?email=${user?.email}`);
          return res.data;
        }
      },
      {
        queryKey: ['adminWithdrawal'],
        queryFn: async () => {
          const res = await axiosSecure.get(`/withdrawals?email=${user?.email}`);
          return res.data;
        }
      }
    ]
  });

  const isLoading = adminStates.isLoading || withdrawals.isLoading;

  if (isLoading) {
    return <Loading />;
  }

  const handleApprove = async (id) => {
    const res = await axiosSecure.patch(`/withdrawal-approve?id=${id}`);
    if (res.data.modifiedCount > 0) {
      withdrawals.refetch();
    }
  };

  return (
    <div className="p-6 min-h-screen text-primary-text">
      <ReactHelmet helmetText={'Admin || Home'}/>
      <h1 className="text-3xl font-bold mb-6 text-secondary-color">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-primary-color text-primary-text rounded-2xl p-4  shadow">
          <p className="text-lg font-semibold ">Total Workers</p>
          <p className="text-xl">{adminStates?.data?.totalWorkers}</p>
        </div>
        <div className="bg-primary-color text-light p-4 rounded-2xl shadow">
          <p className="text-lg font-semibold">Total Buyers</p>
          <p className="text-xl">{adminStates?.data?.totalBuyers}</p>
        </div>
        <div className="bg-primary-color text-white p-4 rounded-2xl shadow">
          <p className="text-lg font-semibold">Total Coins</p>
          <p className="text-xl">{adminStates?.data?.totalCoins}</p>
        </div>
        <div className="bg-primary-color text-white p-4 rounded-2xl shadow">
          <p className="text-lg font-semibold">Total Payments</p>
          <p className="text-xl">${adminStates?.data?.totalPayments}</p>
        </div>
      </div>

      {/* Withdrawal Requests Table */}
      <h2 className="text-2xl font-semibold mb-4 text-secondary-color">Pending Withdrawal Requests</h2>
      <div className="overflow-x-auto rounded-xl border border-primary-color">
        <table className="table-auto w-full text-sm">
          <thead className="bg-primary-color text-primary-text">
            <tr>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-light text-secondary-text">
            {withdrawals?.data?.length > 0 ? (
              withdrawals.data.map(withdrawal => (
                <tr key={withdrawal._id} className="border-t border-secondary-text">
                  <td className="px-4 py-2">{withdrawal._id}</td>
                  <td className="px-4 py-2">{withdrawal.withdrawal_amount}</td>
                  <td className={`px-4 py-2 ${withdrawal.status === 'approved' ? 'text-primary-color' : 'text-yellow-500'}`}>
                    {withdrawal.status}
                  </td>
                  <td className="px-4 py-2">
                    {withdrawal.status === 'approved' ? (
                      <span className="text-primary-color font-medium">Payment Success</span>
                    ) : (
                      <button
                        onClick={() => handleApprove(withdrawal._id)}
                        className="bg-primary-color text-primary-text px-3 py-1.5 rounded-full hover:brightness-110 text-sm transition"
                      >
                        Payment Success
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-secondary-text">
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

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../components/Loading';

const PaymentHistory = () => {

    const {user} = useAuth();

    const axiosSecure = useAxiosSecure();

    const {data:paymentData  , isLoading} = useQuery({
        queryKey: ["paymentData"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?email=${user?.email}`)
            return res.data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra min-w-full">
                {/* head */}
                <thead>
                    <tr className='rounded-t-xl bg-primary-color text-light'>
                        <th className='rounded-tl-xl'>No</th>
                        <th>Transitions ID</th>
                        <th>Email</th>
                        <th className='rounded-tr-xl'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                   {
                    paymentData?.map(({_id, id, email, amount}, index )=>  
                    <tr key={_id} className='border-b border-gray-200'>
                        <th>{index + 1}</th>
                        <td>{id}</td>
                        <td>{email}</td>
                        <td>${amount / 100}</td>
                    </tr>)
                   }
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;

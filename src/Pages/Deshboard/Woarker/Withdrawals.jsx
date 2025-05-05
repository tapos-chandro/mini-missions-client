import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useUserData from "../../../Hooks/useUserData";
import Loading from "../../../components/Loading";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
// import PhoneInput from 'react-phone-number-input/react-hook-form-input';


const Withdrawals = () => {


    const [coinToWithdraw, setCoinToWithdraw] = useState('');
    const [paymentSystem, setPaymentSystem] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const axiosSecure = useAxiosSecure();
    // const [value, setValue] = useState();

    const { user } = useAuth();


    const { userData, isLoading, refetch } = useUserData();

    if (isLoading) {
        return <Loading></Loading>
    }



    const totalCoin = userData?.coins; // Static example
    const withdrawalAmount = (coinToWithdraw / 20).toFixed(2);
    const hasEnoughCoin = coinToWithdraw <= totalCoin && coinToWithdraw >= 200;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const withdrawalData = {
            worker_email: user?.email,
            worker_name: user?.displayName,
            withdrawal_coin: coinToWithdraw,
            withdrawal_amount: parseFloat(withdrawalAmount),
            payment_system: paymentSystem,
            account_number: accountNumber,
            withdraw_date: new Date().toISOString(),
            status: "pending",
        };

        const res = await axiosSecure.post('/withdrawals', withdrawalData)
        // console.log(res)
        const amount = { amount: coinToWithdraw }
        if (res.data.insertedId) {
            const updateAmount = await axiosSecure.patch(`/users?email=${user?.email}`, amount)
            if (updateAmount?.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your withdrawal successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch()
            }
        }


    };

    return (
        <div className="py-10">
            <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-primary-color ">
                <h2 className="text-2xl font-bold mb-4 text-primary-color py-2">Withdrawal Form</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="text-secondary-text font-medium ">Coin To Withdraw</label>
                        <input
                            type="number"
                            min={0}
                            value={coinToWithdraw}
                            onChange={(e) => setCoinToWithdraw(Number(e.target.value))}
                            className="w-full p-2 border focus:outline-none  border-primary-color rounded mt-1"
                            placeholder="Enter your withdraw coins"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-secondary-text font-medium ">Withdraw Amount ($)</label>
                        <input
                            type="number"
                            value={withdrawalAmount}
                            readOnly
                            className="w-full p-2 border border-primary-color focus:outline-none rounded bg-gray-100 mt-1"
                            placeholder="Enter your withdraw amount"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-secondary-text font-medium">Select Payment System</label>
                        <select
                            value={paymentSystem}
                            onChange={(e) => setPaymentSystem(e.target.value)}
                            className="w-full p-2  border focus:outline-none border-primary-color rounded mt-1"
                            required
                        >
                            <option className="text-secondary-text" value="">-- Select your payment method --</option>
                            <option value="Bkash">Bkash</option>
                            <option value="Rocket">Rocket</option>
                            <option value="Nagad">Nagad</option>
                            <option value="Upay">Upay</option>
                            <option value="Bank">Bank Transfer</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="text-secondary-text font-medium">Account Number</label>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={accountNumber}
                            onChange={setAccountNumber}
                            defaultCountry="BD"
                            className="w-full p-2  focus:outline-none   border border-primary-color rounded mt-1"
                            required
                        />
                    </div>

                    {hasEnoughCoin ? (
                        <button
                            type="submit"
                            className="w-full bg-primary-color text-white py-2 rounded hover:cursor-pointer"
                        >
                            Withdraw
                        </button>
                    ) : (
                        <p className="text-red-600 text-center font-semibold">
                            Insufficient coin
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Withdrawals;

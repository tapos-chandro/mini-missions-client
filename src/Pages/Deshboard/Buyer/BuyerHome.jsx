import React from 'react';
import { FaMoneyBillWave, FaTasks, FaUsers } from 'react-icons/fa';

const BuyerHome = () => {

    const stats = {
        totalTasks: 24,
        pendingWorkers: 10,
        totalPaid: 2000
    }

    return (
        <div className="lg:min-h-screen rounded-2xl p-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                {/* Total Tasks */}
                <div className="bg-[var(--color-light)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-[var(--color-primary-color)]">
                    <FaTasks className="text-4xl text-[var(--color-primary-color)] mb-2 mx-auto" />
                    <h2 className="text-lg font-semibold text-[var(--color-secondary-text)]">Total Tasks</h2>
                    <p className="text-3xl font-bold text-[var(--color-primary-color)] mt-1">42</p>
                </div>

                {/* Pending Workers */}
                <div className="bg-[var(--color-light)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-[var(--color-primary-color)]">
                    <FaUsers className="text-4xl text-[var(--color-primary-color)] mb-2 mx-auto" />
                    <h2 className="text-lg font-semibold text-[var(--color-secondary-text)]">Pending Workers</h2>
                    <p className="text-3xl font-bold text-[var(--color-primary-color)] mt-1">7</p>
                </div>

                {/* Total Paid */}
                <div className="bg-[var(--color-light)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-[var(--color-primary-color)]">
                    <FaMoneyBillWave className="text-4xl text-[var(--color-primary-color)] mb-2 mx-auto" />
                    <h2 className="text-lg font-semibold text-[var(--color-secondary-text)]">Total Paid</h2>
                    <p className="text-3xl font-bold text-[var(--color-primary-color)] mt-1">$1230</p>
                </div>
            </div>
        </div>
    );
};

export default BuyerHome;
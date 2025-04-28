import SectionTitle from "../../components/SectionTitle";


const Statistics = () => {

    const stats = {
        totalTasks: 10000,
        totalWorkers: 5000,
        coinsDistributed: 2000000,
        activeTasksToday: 150
      };

    return (
        <section className="py-16 text-center">
            <SectionTitle title="Platform Statistics"/>
            <div className="flex justify-center space-x-8">
                <div className="bg-white p-6 rounded-lg shadow-lg w-48">
                    <h3 className="text-xl font-semibold">Total Tasks Completed</h3>
                    <p className="text-4xl font-bold text-primary-color">{stats.totalTasks}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-48">
                    <h3 className="text-xl font-semibold">Total Workers Registered</h3>
                    <p className="text-4xl font-bold text-primary-color">{stats.totalWorkers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-48">
                    <h3 className="text-xl font-semibold">Coins Distributed</h3>
                    <p className="text-4xl font-bold text-primary-color">{stats.coinsDistributed.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-48">
                    <h3 className="text-xl font-semibold">Active Tasks Today</h3>
                    <p className="text-4xl font-bold text-primary-color">{stats.activeTasksToday}</p>
                </div>
            </div>
        </section>
    );
};

export default Statistics;
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useTasks from "../../../Hooks/useTasks";

const ManageTask = () => {

    const { tasks, isLoading, refetch } = useTasks();
    const axiosSecure = useAxiosSecure();


    if (isLoading) {
        return <Loading></Loading>
    }

    const handleDeleteTask = async (id) => {


        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#05a117",
            cancelButtonColor: "red",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/delete-task?id=${id}`)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                        confirmButtonColor: '#05a117'
                    });
                    refetch();
                }
            }
        });
    }

    return (
        <div className="p-6 min-h-screen bg-light text-secondary-text">
            <h2 className="text-3xl font-bold mb-6 text-primary-color">Admin Task List</h2>

            <div className="overflow-x-auto rounded-xl border border-primary-color shadow">
                <table className="table-auto w-full text-sm">
                    <thead className="bg-primary-color text-primary-text">
                        <tr>
                            <th className="px-4 py-3 text-left">Title</th>
                            <th className="px-4 py-3 text-left">Payable Amount</th>
                            <th className="px-4 py-3 text-left">Workers</th>
                            <th className="px-4 py-3 text-left">Buyer</th>
                            <th className="px-4 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-light text-secondary-text">
                        {tasks?.map(task => (
                            <tr key={task._id} className="border-t border-secondary-text">
                                <td className="px-4 py-3">{task.task_title}</td>
                                <td className="px-4 py-3">${task.payable_amount}</td>
                                <td className="px-4 py-3">{task.required_workers}</td>
                                <td className="px-4 py-3">{task.buyer_name}</td>
                                <td className="px-4 py-3">
                                    <button onClick={() => handleDeleteTask(task?._id)} className="bg-red-500 hover:cursor-pointer text-primary-text px-4 py-2 rounded-full hover:brightness-110 transition-all">
                                        Delete Task
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTask;

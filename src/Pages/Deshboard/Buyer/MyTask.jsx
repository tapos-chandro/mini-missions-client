import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import ReactHelmet from "../../../components/ReactHelmet";


const MyTask = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const [taskData, setTaskData] = useState({})
    const { register, handleSubmit, setValue } = useForm()


    const { data: tasksData, refetch, isLoading } = useQuery({
        queryKey: ['tasksData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks?email=${user?.email}`)
            return res.data;
        }
    })


    if (isLoading) {
        return <Loading></Loading>
    }


    const onSubmit = async (data) => {
        if (!data) {

            return
        }
        const updateMyTaskData = { ...data }
        const res = await axiosSecure.patch(`/update-task?id=${taskData?._id}`, updateMyTaskData)
        if (res?.data?.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
            document.getElementById('my_modal_3').close()
        }

    }


    const handleUpdate = (id) => {
        const findTask = tasksData.find(task => task._id === id)
        setTaskData(findTask)
        setValue('task_title', findTask?.task_title)
        setValue('task_detail', findTask?.task_detail)
        setValue('submission_info', findTask?.submission_info)
        document.getElementById('my_modal_3').showModal()
    }

    const handleDelate = async (id) => {
        const res = await axiosSecure.delete(`/task-delete?id=${id}`)
        if (res?.data?.deletedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your task deleted successfully",
                showConfirmButton: false,
                timer: 1500
            });

         await   refetch();
        }

    }

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">

            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-secondary-color">Your Tasks</h2>
            <ReactHelmet helmetText={"Buyer || My Task"}></ReactHelmet>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
                    <thead className="bg-primary-color">
                        <tr className="text-left text-sm font-semibold text-secondary-color ">
                            <th className="px-4 py-3 text-light text-center">Title</th>
                            <th className="px-4 py-3 text-light text-center">Details</th>
                            <th className="px-4 py-3 text-light text-center">Submission Details</th>
                            <th className="px-4 py-3 text-light text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 ">
                        {tasksData?.map((task) => (
                            <tr key={task._id} className="text-sm text-secondary-text">
                                <td className="px-4 py-3 text-center whitespace-nowrap">{task?.task_title}</td>
                                <td className="px-4 py-3 text-center whitespace-normal">{task?.task_detail}</td>
                                <td className="px-4 py-3 text-center">{task?.submission_info}</td>
                                <td className="px-4 py-3 flex justify-center text-center space-x-2 ">
                                    <button className="px-3 py-1 hover:cursor-pointer bg-primary-color text-white rounded text-sm" onClick={() => { handleUpdate(task?._id) }}>
                                        Update
                                    </button>
                                    <button onClick={() => handleDelate(task?._id)} className="px-3 py-1 hover:cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {tasksData?.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-500">
                                    No tasks found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Responsive Modal Preview (as a section here) */}

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-600 ring-1 rounded-full">✕</button>
                    </form>

                    <div className="mt-10  w-full max-w-md mx-auto">
                        <h3 className="text-lg font-bold mb-4 text-center">Update Task</h3>
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    {...register('task_title', { required: true })}
                                    className="w-full border border-gray-300 focus:border-1 outline-none focus:border-primary-color rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Task Detail</label>
                                <textarea
                                    {...register('task_detail', { required: true })}
                                    className="w-full border border-gray-300 focus:border-1 outline-none focus:border-primary-color rounded p-2"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Submission Details</label>
                                <input
                                    {...register('submission_info', { required: true })}
                                    type="text"
                                    className="w-full border border-gray-300 focus:border-1 outline-none focus:border-primary-color rounded p-2"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button type="submit" className="px-4 hover:cursor-pointer py-2 bg-primary-color text-white rounded text-sm">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>





        </div>
    );
};

export default MyTask;
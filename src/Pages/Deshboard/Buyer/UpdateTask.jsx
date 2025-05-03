import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const UpdateTask = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
    const [taskData, setTaskData]  = useState({})
    const { register, handleSubmit, reset, setValue, control } = useForm()
    const onSubmit = async (data) =>{



        if(!data){
            
            return 
        }
        const updateMyTaskData = {...data}
        console.log(updateMyTaskData,'update my Task Data')

        const res = await axiosSecure.patch(`/update-task?id=${taskData?._id}`, updateMyTaskData)
        console.log(res)

        if(res?.data?.modifiedCount> 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              document.getElementById('my_modal_3').close()
        }

    }



    const {data:tasksData, refetch} = useQuery({
        queryKey: ['tasksData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks?email=${user.email}`)
            console.log(res)
            return res.data;
        }
    }) 




    // const handleUpdate = (id) => {
    //     console.log(id)
    //     const findTask = tasksData.find(task => task._id === id)
    //     setTaskData(findTask)

    //     setValue('task_title', findTask?.task_title )
    //     setValue('task_detail', findTask?.task_detail )
    //     setValue('submission_info', findTask?.submission_info )
    // }



    return (
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
    );
};

export default UpdateTask;
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../api/utils";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserData from "../../../Hooks/useUserData";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import ReactHelmet from "../../../components/ReactHelmet";


const AddTask = () => {

    const [localImage, setLocalImage] = useState('');
    const [uploadImageUrl, setUploadImageUrl] = useState('');
    const axiosSecure = useAxiosSecure();
    const {userData, refetch} = useUserData();
    const navigate = useNavigate();
    const {user} = useAuth();






    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const amount = Number(data?.required_workers) * Number(data?.payable_amount);

        const addTaskData = {...data, image:uploadImageUrl, email: user?.email, buyer_name: user?.displayName, buyer_image: user?.photoURL}

        if (amount > userData.coins) {
            Swal.fire({
                icon: 'error',
                title: "Not available Coin. Purchase Coin",
                showCancelButton: true,
                confirmButtonColor: '#05a117',
                cancelButtonColor: '#e8442e',
                confirmButtonText: "Ok",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    return navigate('/dashboard/purchase-coin')
                } else if (result.isCancel) {
                    return
                }

            });
            return
        }

        const res = await axiosSecure.post(`/add-task`, addTaskData)

        if(res?.data?.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully added task",
                showConfirmButton: false,
                timer: 1500
              });

            const patchResult = await axiosSecure.patch(`/users?email=${user?.email}`, {amount} )
            if(patchResult?.data?.acknowledged === true){
                refetch();
                reset();
                setUploadImageUrl('')
            }

        }
    }


    useEffect(() => {
        const uploadImage = async () => {
            if (localImage) {

                setUploadImageUrl('')
                const uploadImageUrl = await imageUpload(localImage)
                setUploadImageUrl(uploadImageUrl)
                if (uploadImageUrl) {
                    setLocalImage('')
                }
                return
            }
        }
        uploadImage();

    }, [localImage])


    return (
        <div>
            <ReactHelmet helmetText={"Buyer || Add Task"}/>

            <div className="lg:card-body">
                <h2 className="text-center font-bold text-2xl text-secondary-color">Add New Task</h2>
                <form className="fieldset" onSubmit={handleSubmit(onSubmit)}>
                    <label className="label">Title</label>
                    <input type="text" className="input w-full focus:border-none focus:outline-primary-color"{...register("task_title", { required: 'Filed is required' })} placeholder="Title" />
                    <p className="text-red-500">{errors?.task_title?.message}</p>
                    <label className="label">Task Detail</label>
                    <input type="text" {...register('task_detail', { required: 'Filed is required' })} className="input w-full focus:border-none focus:outline-primary-color" placeholder="Task detail" />
                    <p className="text-red-500">{errors?.task_detail?.message}</p>
                    <label className="label">Required Workers </label>
                    <input type="number" {...register('required_workers', { required: "Filed is required" , valueAsNumber: true})} className="input w-full focus:border-none focus:outline-primary-color" placeholder="Required Workers" />
                    <p className="text-red-500">{errors?.required_workers?.message}</p>
                    <label className="label">Payable Amount</label>
                    <input type="number" {...register('payable_amount', { required: 'Filed is required',  valueAsNumber: true })} className="input w-full focus:border-none focus:outline-primary-color" placeholder="Payable Amount" />
                    <p className="text-red-500">{errors?.payable_amount?.message}</p>
                    <label className="label">Completion Date </label>
                    <input type="date" {...register('completion_date', { required: "Filed is required" })} className="input w-full focus:border-none focus:outline-primary-color" placeholder="Completion Date" />
                    <p className="text-red-500">{errors?.completion_date?.message}</p>
                    <label className="label">Submission Info </label>
                    <input type="text" {...register('submission_info', { required: 'Filed is required' })} className="input w-full focus:border-none focus:outline-primary-color" placeholder="Submission Info" />
                    <p className="text-red-500">{errors?.submission_info?.message}</p>
                    <label className="label">Task Image </label>
                    <input type="file" onChange={(e) => {

                        setLocalImage('')
                        setUploadImageUrl('')

                        setLocalImage(e.target.files[0])

                    }} className="file-input file-input-md file:bg-primary-color file:text-white focus:border-none focus:outline-primary-color" />
                    <button className="btn bg-primary-color text-primary-text text-xl  h-14 mt-4 " disabled={!uploadImageUrl} >Add Task {localImage ? <span className="loading loading-spinner text-primary-color text-4xl"></span> : ''}</button>

                </form>
            </div>
        </div>
    );
};

export default AddTask;
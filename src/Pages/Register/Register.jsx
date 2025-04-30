
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import useAuth from '../../Hooks/useAuth';
import { useEffect, useState } from 'react';
import { imageUpload } from '../../api/utils';
import Swal from 'sweetalert2'
import { FcGoogle } from 'react-icons/fc';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Register = () => {

    const { createUser, signInWithGoogle } = useAuth();
    const [localImage, setLocalImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm()
    const onSubmit = async (data) => {

        if (data) {
            try {
                const res = await createUser(data?.name, imageUrl, data?.email, data?.password);
                if (res.email) {
                    const { password, ...rest } = data
                    const userData = { image: imageUrl, ...rest }
                    try {
                        setError('')
                        await axiosPublic.post('/users', userData)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User create successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/')

                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                const err = (error.message.includes('auth/email-already-in-use'))
                if (err) {
                    setError('email already in use')
                }
            }
        } else {
            return
        }

    }

    const handleGoogle = async () => {
        try {

            let userRole = ''
            await Swal.fire({
                title: "Select Your role",
                input: "select",
                inputOptions: {
                    buyer: "Buyer",
                    worker: "Worker",
                },
                inputPlaceholder: "Select role",
                showCancelButton: true,
                confirmButtonColor: " #05a117",
                cancelButtonColor: "red", 
                inputValidator: (value) => {

                    userRole = value
                }
            });

            if (!userRole) {
                return
            }

            const res = await signInWithGoogle()

            if (res.user) {

                const { email, photoURL, displayName, } = res.user;
                const userData = { name: displayName, email, image: photoURL, role: userRole }
                try {
                    setError('')
                    await axiosPublic.post('/users', userData)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User create successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')

                } catch (error) {
                    console.log(error)
                }
            }


        } catch (error) {
            const err = (error.message.includes('auth/email-already-in-use'))
            if (err) {
                setError('email already in use')
            }
        }

    }



    useEffect(() => {
        if (localImage === '') {
            return
        } else {
            const uploaded = async () => {
                setImageUrl('')
                const url = await imageUpload(localImage)
                setImageUrl(url)

                if (url) {
                    setLocalImage('')
                }
            }

            uploaded()
        }
    }, [localImage])



    return (
        <div>
            <div>
                <Link to="/" className=''><FaArrowLeft className='ring-2 ring-primary-color text-primary-color lg:m-10 md: m-8  rounded-full p-2 text-3xl' /></Link>
            </div>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse p-5 lg:-mt-20">
                    <div className="card lg:w-md max-w-md shadow-2xl border border-primary-color ">
                        <h1 className='text-3xl font-bold text-center text-primary-color pt-10'>Register Now!</h1>
                        <div className="card-body w-full ">
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                                <label className="label text-secondary-text">Name</label>
                                <input type="text"  {...register('name', { required: true })} className="input w-full border border-primary-color focus:border-secondary-color focus:outline-0" placeholder="Name" />
                                {errors.name && <p className='text-red-500'>This field is required</p>}
                                <label className="label text-secondary-text">Email</label>
                                <input type="email"  {...register('email', {
                                    required: 'This filed is required', pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })} className="input w-full border border-primary-color focus:border-secondary-color focus:outline-0" placeholder="Email" />
                                <p className='text-red-500'>{errors.email?.message}</p>
                                <p className='text-red-500'>{error}</p>
                                <label className="label text-secondary-text">Role</label>
                                <select defaultValue={''} {...register("role", { required: "This filed is required" })} className="input w-full border border-primary-color focus:border-secondary-color focus:outline-0 text-secondary-text">
                                    <option value="">Select Role</option>
                                    <option value="worker">Worker</option>
                                    <option value="buyer">Buyer</option>
                                </select>
                                {<p className='text-red-500'>{errors.role?.message}</p>}
                                <label className="label text-secondary-text">Password</label>

                                <input name='password' type="password" {
                                    ...register("password", {
                                        required: 'This field is required',
                                        validate: {
                                            hasUpper: (value) => /[A-Z]/.test(value) || 'At least one uppercase litter',
                                            hasLower: (value) => /[a-z]/.test(value) || 'At least one lowercase litter',
                                            hasNumber: (value) => /[0-9]/.test(value) || 'At least one number',
                                            hasSpecial: (value) => /[@$!%*?&]/.test(value) || 'At least one special character',
                                            hasLength: (value) => value.length > 6 || 'Length must be 6 digit'
                                        }
                                    }
                                    )} className="input w-full border border-primary-color focus:border-secondary-color focus:outline-0" placeholder="Password" />
                                <span className='text-red-500'>{errors.password?.message}</span>
                                <label className="label text-secondary-text">File</label>
                                <input type="file" onChange={(e) => setLocalImage(e.target.files[0])} className="file-input w-full border border-primary-color text-secondary-text  focus:border-secondary-color focus:outline-0" />
                                <button disabled={!imageUrl} className={`btn bg-primary-color text-primary-text mt-4 ${imageUrl ? "" : "text-secondary-text"}`} >Register {imageUrl ? '' : localImage ? <span className="loading loading-spinner loading-md"></span> : ''}</button>
                            </form>
                            <div className='flex justify-center '>
                                <FcGoogle onClick={handleGoogle} className='text-4xl cursor-pointer' />
                            </div>
                            <p className="mt-4 text-center text-secondary-text text-lg">
                                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default Register;
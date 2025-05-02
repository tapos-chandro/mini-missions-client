
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Login = () => {

    const { signInUser, signInWithGoogle, } = useAuth();
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const axiosPublic = useAxiosPublic()



    const onSubmit = async (data) => {


        try {
            const res = await signInUser(data.email, data.password)

            if (res.user) {
                navigate(location?.state?.from?.pathname || "/")
            }
            setError('')
        } catch (error) {
            if (error.message.includes('invalid-credential')) {
                setError('invalid credential')
            }
        }


    }

//  google login related 
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
                    navigate(location?.state?.from?.pathname || "/")

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



    return (
        <>
            <div>
                <Link to="/" className=''><FaArrowLeft className='ring-2 ring-primary-color text-primary-color lg:m-10 md: m-8 m-4 rounded-full p-2 text-3xl' /></Link>
            </div>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card w-md shadow-2xl border border-primary-color">
                        <h1 className='text-3xl font-bold text-center mt-10  text-primary-color'>Login now!</h1>
                        <div className="card-body w-full ">
                            <form className="fieldset" onSubmit={handleSubmit(onSubmit)}>
                                <label className="label">Email</label>
                                <input  {...register('email', { required: 'This field is required' })} type="email" className="input w-full border border-primary-color focus:border-secondary-color focus:outline-0" placeholder="Email" />
                                <p className='text-red-500'>{errors.email?.message}</p>
                                <label className="label">Password</label>
                                <input {...register('password', { required: "This field is required" })} type="password" className="input w-full border border-primary-color focus:border-secondary-color focus:outline-0" placeholder="Password" />
                                <p className='text-red-500'>{errors.password?.message}</p>
                                <p className='text-red-500'>{error}</p>

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn bg-primary-color text-primary-text mt-4">Login</button>
                            </form>

                            <div className='flex justify-center mt-6'>
                                <FcGoogle onClick={handleGoogle} className='text-4xl cursor-pointer' />
                            </div>
                            <p className="mt-4 text-center text-secondary-text text-lg">
                                Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                            </p>
                        </div>
                    </div>
                </div>


            </div>

        </>
    );
};

export default Login;

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {

    const { signInUser, signInWithGoogle,  } = useAuth();
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    


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


    const handleGoogle = async () => {
        const res = await signInWithGoogle()
        console.log(res.user)
        if(res.user.email){
            navigate(location?.state?.from?.pathname || "/")
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
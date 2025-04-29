
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <div>
                <Link to="/" className=''><FaArrowLeft className='ring-2 ring-red-400 text-red-400 lg:m-10 md: m-8 m-4 rounded-full p-2 text-3xl' /></Link>
            </div>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card w-md shadow-2xl border border-primary-color">
                        <h1 className='text-3xl font-bold text-center mt-10 text-primary-color'>Register Now!</h1>
                        <div className="card-body w-full ">
                            <form className="fieldset">
                                <label className="label text-secondary-text">Email</label>
                                <input type="email" className="input w-full border border-primary-color focus:border-secondary-color focus:outline-0" placeholder="Email" />
                                <label className="label text-secondary-text">Password</label>
                                <input type="password" className="input w-full border border-primary-color focus:border-secondary-color focus:outline-0" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn bg-primary-color text-primary-text mt-4">Login</button>
                            </form>
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
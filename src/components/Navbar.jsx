
import { IoMenu } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../src/assets/images/logo-0.png"
import { BsCoin } from 'react-icons/bs';
import useAuth from '../Hooks/useAuth';
import useUserData from '../Hooks/useUserData';



const Navbar = () => {

    const { user, logOutUser } = useAuth()
    const {userData} = useUserData()


    const handleLogOutUser = () => {
        logOutUser()

    }

    const navLinks = <>
        <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={'/'}>Home</NavLink>
        {
            user && userData &&
            <>
                <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={'/coin'}>Available Coin </NavLink>
                <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={`/dashboard/${userData?.role}-home`}>Dashboard</NavLink>
            </>
        }

        {
            user ? '' : <>
                <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={'/login'}>Login</NavLink>
                <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={'/register'}>Register</NavLink></>
        }

    </>


    return (
        <div className="navbar py-3 fixed left-0 z-50 bg-primary-text">
            <div className="navbar-start">
                <Link to={'/'} className="text-xl"><img src={logo} className='lg:w-60 w-52' /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end flex justify-end">
                <div className="drawer drawer-end lg:hidden flex justify-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button btn bg-primary-color "><IoMenu className='text-xl text-primary-text ' /></label>
                    </div>
                    <div className="drawer-side z-50">
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay "><RxCross2 className='text-primary-color text-2xl mb-5 border rounded-full p-1' /></label>
                            {/* Sidebar content here */}
                            {navLinks}
                            {
                                user ? <div className=' items-center flex flex-col-reverse gap-3  lg:hidden '>

                                    <div className='flex items-center gap-1'>
                                        <span className='text-xl font-bold text-secondary-color'>{userData?.coins}</span> <BsCoin className='text-3xl' />
                                    </div>

                                    <Link className="px-2 bg-primary-color border-none hover:border lg:text-md  btn m-2 text-primary-text" to={'https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-tapos-chandro.git'} target="_blank">Join as Developer</Link>
                                    <button className='btn  btn-primary bg-primary-color border-none mx-3' onClick={handleLogOutUser}> LogOut </button>
                                    <Link to='/profile'>
                                        <div className="avatar">
                                            <div className="w-12 rounded-full">
                                                <img src={user?.photoURL} referrerPolicy="no-referrer" />
                                            </div>
                                        </div>
                                    </Link>
                                </div> : ''
                            }
                        </ul>
                    </div>
                </div>
                {
                    user && <div className=' items-center hidden  lg:block '>
                        <div className=' flex items-center gap-2'>
                            <div className='flex items-center gap-1'>
                                <span className='text-xl font-bold text-secondary-color'>{userData?.coins}</span> <BsCoin className='text-3xl' />
                            </div>
                            <Link to="/profile">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={user?.photoURL} referrerPolicy="no-referrer" />
                                    </div>
                                </div>
                            </Link>
                            <button className='btn mr-2  btn-primary rounded-full bg-primary-color border-none ' onClick={handleLogOutUser}> LogOut </button>

                        </div>
                    </div>
                }
                <Link to={'https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-tapos-chandro.git'} target="_blank">
                    <button className=" bg-primary-color border-none hover:border lg:text-md  btn rounded-full px-5 md:hidden  lg:inline-block hidden  text-primary-text" >
                        Join as Developer
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
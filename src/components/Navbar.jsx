import React from 'react';
import { IoMenu } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../src/assets/images/logo-0.png"

const Navbar = () => {
    const navLinks = <>
        <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={'/'}>Home</NavLink>
        <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={'/dashboard'}>Dashboard</NavLink>
        <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={'/coin'}>Available Coin </NavLink>
        <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={'/login'}>Login</NavLink>
        <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={'/register'}>Register</NavLink>
        <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-secondary-text" to={'https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-tapos-chandro.git'} target="_blank">Join as Developer</NavLink>
    </>



    return (
        <div className="navbar">
            <div className="navbar-start">
                <Link to={'/'} className="text-xl"><img src={logo} className='lg:w-60 w-52 ' /></Link>
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
                        <label htmlFor="my-drawer-4" className="drawer-button btn bg-primary-color "><IoMenu  className='text-xl text-primary-text '/></label>
                    </div>
                    <div className="drawer-side">
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay "><RxCross2 className='text-red-600 text-2xl mb-5 border rounded-full p-1' /></label>
                            {/* Sidebar content here */}
                                {navLinks}
                                <button className='btn btn-primary m-2 bg-primary-color text-primary-text border-none'> submit</button>
                        </ul>
                    </div>
                </div>
                <button className='btn hidden lg:block btn-primary bg-primary-color border-none'> submit</button>

            </div>
        </div>
    );
};

export default Navbar;
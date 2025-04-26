import React from 'react';
import { IoMenu } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {


    const navLinks = <>
        <NavLink className="px-2 bg-amber-100 btn m-2" to={'/'}>Home</NavLink>
        <NavLink className="px-2 bg-amber-100 btn m-2" to={'/login'}>Login</NavLink>
        <NavLink className="px-2 bg-amber-100 btn m-2" to={'/register'}>Register</NavLink>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <Link to={'/'} className="text-xl">daisyUI</Link>
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
                        <label htmlFor="my-drawer-4" className="drawer-button btn "><IoMenu  className='text-2xl'/></label>
                    </div>
                    <div className="drawer-side">
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay "><RxCross2 className='text-red-600 text-2xl mb-5 border rounded-full p-1' /></label>
                            {/* Sidebar content here */}
                                {navLinks}
                        </ul>
                    </div>
                </div>
                <button className='btn hidden lg:block btn-primary'> submit</button>

            </div>
        </div>
    );
};

export default Navbar;
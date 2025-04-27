import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import footerLogo from '../../src/assets/images/logo-2.png'


const Footer = () => {
    return (
        <footer className="text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">

                {/* Logo */}
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <Link to={"/"} className='flex items-center flex-col text-3xl'>
                        <img src={footerLogo} alt="MiniMissions Logo" className="" /> Mini Missions
                    </Link>
                </div>

                <div className='flex lg:flex-row my-10 flex-col'>
                    <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text" to={'/'}>Home</NavLink>
                    <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text" to={'/dashboard'}>Dashboard</NavLink>
                    <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text" to={'/coin'}>Available Coin </NavLink>

                    <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text" to={'/login'}>Login</NavLink>
                    <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text" to={'/register'}>Register</NavLink>
                    <NavLink className="px-2 bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text" to={'https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-tapos-chandro.git'} target="_blank">Join as Developer</NavLink>
                </div>

                {/* Social Icons */}
                <div className="flex space-x-4">
                    <Link to="https://www.linkedin.com/in/tapos-chandro/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaLinkedinIn className='text-4xl' />
                    </Link>
                    <Link to="https://www.facebook.com/taposKumar24/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        <FaFacebookF className='text-4xl' />
                    </Link>
                    <Link to="https://github.com/tapos-chandro" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <FaGithub className='text-4xl' />
                    </Link>
                </div>
               

            </div>

            {/* Bottom Text */}
            <div className="text-center mt-4 text-sm text-primary-text">
                © {Date()} MiniMissions. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import footerLogo from '../../src/assets/images/logo-2.png'


const Footer = () => {

    const user = true

    return (
        <footer className="text-white py-6">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 justify-between px-4">

                {/* Logo */}
                <div className="flex lg:items-center justify-center lg:justify-start space-x-2 mb-4 md:mb-0 pt-10">
                    <Link to={"/"} className='flex items-center flex-col text-3xl'>
                        <img src={footerLogo} alt="MiniMissions Logo" className="" /> Mini Missions
                    </Link>
                </div>

                <div className='flex lg:flex-row flex-wrap my-10 flex-col justify-center'>
                    <NavLink className=" bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text rounded-full px-6" to={'/'}>Home</NavLink>
                    <NavLink className=" bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text rounded-full px-6" to={'/dashboard'}>Dashboard</NavLink>
                    {
                        user ? "" : <>
                            <NavLink className=" bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text rounded-full px-6" to={'/login'}>Login</NavLink>
                            <NavLink className=" bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text rounded-full px-6" to={'/register'}>Register</NavLink>
                        </>
                    }
                    <NavLink className=" bg-transparent border-none hover:border lg:text-md  btn m-2 text-primary-text rounded-full px-6" to={'https://github.com/tapos-chandro'} target="_blank">Join as Developer</NavLink>
                </div>

                {/* Social Icons */}
                <div className="flex lg:justify-end md:justify-end justify-center lg:items-center space-x-4 md:pt-16">
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
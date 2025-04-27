import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">

                {/* Logo */}
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <img src="/logo.png" alt="MiniMissions Logo" className="h-8" />
                    <span className="text-xl font-bold">MiniMissions</span>
                </div>

                {/* Social Icons */}
                <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaLinkedinIn />
                    </a>
                    <a href="https://facebook.com/your-facebook-profile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        <FaFacebookF />
                    </a>
                    <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <FaGithub />
                    </a>
                </div>

            </div>

            {/* Bottom Text */}
            <div className="text-center mt-4 text-sm text-gray-400">
                © {Date()} MiniMissions. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
import React from 'react';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <div>
                <Container>
                    <Navbar />
                </Container>
            </div>
            <Container>
               <Outlet/>
            </Container>
            <div className='bg-gray-900'>
                <Container>
                    <Footer/>
                </Container>
            </div>
        </>
    );
};

export default MainLayout;
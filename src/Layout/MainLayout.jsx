import React from 'react';
import Container from '../components/Container';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <>
            <div>
                <Container>
                    <Navbar />
                </Container>
            </div>
            <Container>
                <h1>This is layout</h1>
                <button className='btn btn-primary text-2xl'>Submit </button>
            </Container>
        </>
    );
};

export default MainLayout;
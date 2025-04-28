import React from 'react';
import Banner from '../../components/Banner';
import AvailableTask from './AvailableTask';
import BestWorkers from './BestWorkers';
import Testimonials from './Testimonials';
import Faq from './Faq';

const Home = () => {
    return (
        <div>
            <Banner />
            <BestWorkers/>
            <AvailableTask />
            <Faq/>
            <Testimonials/>
        </div>
    );
};

export default Home;
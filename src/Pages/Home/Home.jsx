import React from 'react';
import Banner from '../../components/Banner';
import AvailableTask from './AvailableTask';
import BestWorkers from './BestWorkers';
import Testimonials from './Testimonials';
import Faq from './Faq';
import Statistics from './Statistics';

const Home = () => {
    return (
        <div>
            <Banner />
            <BestWorkers/>
            <AvailableTask />
            <Faq/>
            <Statistics/>
            <Testimonials/>
        </div>
    );
};

export default Home;
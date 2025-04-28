import React from 'react';
import Banner from '../../components/Banner';
import SectionTitle from '../../components/SectionTitle';
import AvailableTask from './AvailableTask';
import BestWorkers from './BestWorkers';

const Home = () => {
    return (
        <div>
            <Banner />
            <BestWorkers/>
            <AvailableTask />
        </div>
    );
};

export default Home;
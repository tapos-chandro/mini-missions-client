import React from 'react';
import Card from '../../components/Card';
import SectionTitle from '../../components/SectionTitle';

const AvailableTask = () => {
    return (
        <div>
            <SectionTitle title="Available Task" />
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-10'>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>
    );
};

export default AvailableTask;
import React from 'react';
import Card from '../../components/Card';
import SectionTitle from '../../components/SectionTitle';

const AvailableTask = () => {

    const tasks = [
        {
            title: "I'll Create, Manage and Optimize your Google Ads PPC Campaign for $35"
        }
    ]


    return (
        <div>
            <SectionTitle title="Available Task" />
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
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
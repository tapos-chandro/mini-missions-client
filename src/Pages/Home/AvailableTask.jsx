import React from 'react';
import Card from '../../components/Card';
import SectionTitle from '../../components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useTasks from '../../Hooks/useTasks';
import { Link } from 'react-router-dom';
import useUserData from '../../Hooks/useUserData';

const AvailableTask = () => {
    const axiosSecure = useAxiosSecure();

    const {userData} = useUserData();

    // const {data: tasks} = useQuery({
    //     queryKey: ['tasks'], 
    //     queryFn: async () => {  
    //         const res = await axiosSecure.get('')

    //     }
    // })

    const { tasks } = useTasks();
    console.log(tasks)

    // const tasks = [
    //     {
    //         title: "I'll Create, Manage and Optimize your Google Ads PPC Campaign for $35"
    //     }
    // ]


    return (
        <div>
            <SectionTitle title="Available Task" />
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {
                    tasks?.map(task => <Card task={task}></Card>)
                }

            </div>
            <div className='w-full flex justify-center'>
                {
                    userData?.role === 'worker' && <Link to={'/dashboard/task-list'}>
                    <button className='btn bg-primary-color mt-10 mb-20 text-lg rounded-full text-light'>See more tasks</button>
                </Link>
                }
            </div>
        </div>
    );
};

export default AvailableTask;
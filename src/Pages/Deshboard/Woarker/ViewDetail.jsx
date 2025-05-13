import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import useAuth from '../../../Hooks/useAuth';
import ReactHelmet from '../../../components/ReactHelmet';

const ViewDetail = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [submissionDetails, setSubmissionDetails] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();





    const { data: task, isLoading } = useQuery({
        queryKey: ['taskDetail'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/available-task?id=${id}`)
            return res.data[0]
        }
    })

    
    if (isLoading) {
        return <Loading></Loading>
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const submission = {
            task_id: task._id,
            task_title: task.task_title,
            payable_amount: task.payable_amount,
            worker_email: user?.email,
            worker_name: user?.displayName,
            submission_details: submissionDetails,
            Buyer_name: task.buyer_name,
            Buyer_email: task.email,
            current_date: new Date(),
            status: 'pending',
        };

        try {
            setLoading(true);
            setMessage('')
          const res =   await axiosSecure.post('/submission', submission);
          if(res.data.insertedId){
            navigate('/dashboard/my-submissions')

          }
            setMessage('Submission successful!');
            setSubmissionDetails('');
        } catch (error) {
            setMessage('Submission failed.');
            console.log(error)
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl pt-10">
            <ReactHelmet helmetText={"Worker || View detail"}/>
            <h2 className="text-3xl font-bold mb-4 text-secondary-color">{task?.task_title}</h2>
            <p className="mb-2 text-secondary-text"><strong className='text-secondary-color'>Description:</strong> {task?.task_detail}</p>
            <p className="mb-2 text-secondary-text"><strong className='text-secondary-color'>Payable Amount: </strong>{task?.payable_amount} Coins</p>
            <p className="mb-2 text-secondary-text"><strong className='text-secondary-color'>Buyer:</strong> {task?.buyer_name} ({task?.email})</p>
            <p className="mb-6 text-secondary-text"><strong className='text-secondary-color'>Required Workers:</strong> {task?.required_workers}</p>

            <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-semibold">Submission Details</label>
                <textarea
                    className="w-full border border-primary-color rounded p-3 mb-4"
                    rows="5"
                    value={submissionDetails}
                    onChange={(e) => setSubmissionDetails(e.target.value)}
                    placeholder="Describe how you completed the task..."
                    required
                ></textarea>

                <button
                    type="submit"
                    className="bg-primary-color text-white px-5 py-2 rounded disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Task'}
                </button>
            </form>

            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
};

export default ViewDetail;
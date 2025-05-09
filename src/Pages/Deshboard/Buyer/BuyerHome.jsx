import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const BuyerHome = () => {
  // Static mock data
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();


  const [buyerStates, submissionsReview, refetch] = useQueries({
    queries: [
      {
        queryKey: ['buyerStates'],
        queryFn: async () => {
          const res = await axiosSecure.get(`/buyer-states?email=${user?.email}`)
          return res.data
        }
      },
      {
        queryKey: ['buyerReview', user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/submissions-review?email=${user?.email}`)
          return res.data
        }
      },
    ]
  })


  const [showModal, setShowModal] = useState(false);
  const [submissionData, setSubmissionData] = useState({});

  const handleApprove = async (id) => {


    const findSubmission = submissionsReview?.data?.find(submission => submission._id === id)

    const findSubmissionData = {
      worker_email: findSubmission?.worker_email,
      buyer_email: findSubmission?.Buyer_email
    }

    const notificationData = {
      payable_amount: findSubmission?.payable_amount,
      Buyer_name : findSubmission?.Buyer_name,
      worker_email: findSubmission?.worker_email,
      status: "approved",
      time: new Date()
    }

    const res = await axiosSecure.patch(`/approved-submission?id=${id}`, findSubmissionData)
    if (res?.data?.matchedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Approved Submission",
        showConfirmButton: false,
        timer: 1500
      });

      await buyerStates.refetch();
      await submissionsReview.refetch();

    }

  };

  const handleReject = (id) => {


  };


  const handleSubmissions = (id) => {

    const findSubmission = submissionsReview?.data.find(submission => submission?._id === id)

    if (findSubmission) {
      setSubmissionData(findSubmission)
    }



  }

  console.log(buyerStates?.data)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-primary-color text-light shadow-md p-4 text-center ">
          <h4 className="text-lg font-semibold">Total Tasks</h4>
          <p className="text-3xl font-bold">{buyerStates?.data?.totalTasks}</p>
        </div>
        <div className="card bg-primary-color text-light shadow-md p-4 text-center">
          <h4 className="text-lg font-semibold">Pending Works</h4>
          <p className="text-3xl font-bold">{buyerStates?.data?.pendingWorks}</p>
        </div>
        <div className="card bg-primary-color  text-light shadow-md p-4 text-center">
          <h4 className="text-lg font-semibold">Total Paid</h4>
          <p className="text-3xl font-bold">${buyerStates?.data?.totalPayment}</p>
        </div>
      </div>

      {/* Submissions Table */}
      <div>
        <h2 className="text-2xl pt-8 font-bold mb-4 text-secondary-color">Task To Review</h2>
        <div className="overflow-x-auto border rounded-xl border-primary-color">
          <table className="table w-full ">
            <thead className="bg-base-200 text-base-content">
              <tr className='flex justify-between bg-primary-color text-light rounded-t-lg'>
                <th className='text-center w-full'>Worker</th>
                <th className='text-center w-full'>Task Title</th>
                <th className='text-center w-full'>Payable</th>
                <th className='text-center w-full'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissionsReview?.data?.map((sub) => (
                <tr key={sub._id} className='flex justify-between border-b border-gray-300'>
                  <td className='text-center w-full '>{sub.worker_name}</td>
                  <td className='text-center w-full '>{sub.task_title}</td>
                  <td className='text-center w-full '>${sub.payable_amount}</td>
                  <td className="text-center w-full   flex gap-2">
                    <button
                      className="btn bg-primary-color text-light btn-sm"
                      onClick={() => { handleSubmissions(sub?._id), setShowModal(true) }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-success btn-sm text-light"
                      onClick={() => handleApprove(sub._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-error btn-sm text-light"
                      onClick={() => handleReject(sub._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Submission Detail</h3>
            <p><span className='font-medium'>Task Title:</span> {submissionData?.task_title}</p>
            <p><span className='font-medium'>Payable Amount:</span> {submissionData?.payable_amount} coins</p>
            <p><span className='font-medium'>Status:</span> {submissionData?.status} </p>

            <div className='divider'></div>
            <p><span className='font-medium'>Submission Details:</span> {submissionData?.submission_details}</p>
            <p><span className='font-medium'>Worker Name:</span> {submissionData?.worker_name}</p>
            <p><span className='font-medium'>Worker Email:</span> {submissionData?.worker_email}</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default BuyerHome;

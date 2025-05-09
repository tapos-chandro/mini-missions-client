import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-0.png'
import { IoMenuSharp, IoNotifications } from 'react-icons/io5';
import { IoIosNotifications } from "react-icons/io";
import useAuth from '../../Hooks/useAuth';
import SideNav from './SideNav';
import useUserData from '../../Hooks/useUserData';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
const DashboardNav = () => {
    const { user } = useAuth();
    const { userData } = useUserData();
    const [isModal, setIsModal] = useState(false);
    const popupRef = useRef();
    const axiosSecure = useAxiosSecure();


    const { data: notifications, isLoading, refetch } = useQuery({
        queryKey: ['notification'],
        queryFn: async () => {
            const res = await axiosSecure(`/notification?email=${user.email}`)
            return res.data;
        }
    })

    const sortNotificationsWorker = notifications?.workerResult?.sort((a, b) => new Date(b.time) - new Date(a.time))
    const sortNotificationsBuyer = notifications?.buyerResult?.sort((a, b) => new Date(b.time) - new Date(a.time))


    const handleNotification = async (e) => {

        e.stopPropagation();

        setIsModal(!isModal)
        await refetch();
    }

    useEffect(() => {
        const handleClickOutSite = (e) => {

            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setIsModal(false)
            }
        }
        document.addEventListener("click", handleClickOutSite);
        return () => document.removeEventListener('click', handleClickOutSite);
    }, [])

    const notificationsDetails = <>

        {
            notifications?.buyerResult?.length > 0 ? sortNotificationsBuyer?.map(notification =>
                <div key={notification?._id} className='border flex items-center gap-2 p-3 rounded-2xl border-gray-200 bg-primary-color text-light'>
                    <IoIosNotifications className=' text-5xl' />
                    <p className='capitalize'>{notification?.message}</p>
                </div>) : sortNotificationsWorker?.map(notification =>
                    <div key={notification?._id} className='border flex items-center gap-2 p-3 rounded-2xl border-gray-200 bg-primary-color text-light'>
                        <IoIosNotifications className=' text-5xl' />
                        <p className='capitalize'>{notification?.message}</p>
                    </div>)
        }

    </>
    return (
        <div>
            <div>
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="flex-1">
                        <Link to={'/'} className="text-xl"><img src={logo} className='lg:w-60 w-52 py-4 ml-5' /></Link>
                    </div>
                    <div className='md:block lg:block hidden'>
                        <div className="flex gap-5 ">
                            <div>
                                <div className='flex gap-3 text-sm font-medium text-secondary-color items-center'>Available coin : {userData?.coins} <img className='W-14 h-14 rounded-full' src={user?.photoURL} /> </div>
                                <div className='flex gap-3 text-sm font-medium text-secondary-color items-center capitalize'>{userData?.role} |  {user?.displayName} </div>
                            </div>
                            <div className='flex items-center mr-5 relative'>
                                <IoNotifications className='text-4xl  cursor-pointer z-50 text-secondary-color' onClick={handleNotification} />
                                {/* notifications modal  */}
                                {/* <div className='border-[20px] p-5 '> */}
                                    <div ref={popupRef} className={`rounded-2xl  h-96 overflow-scroll min-w-sm  p-5 bg-light border border-primary-color  text-secondary-color absolute top-24 right-0 z-50 ${isModal ? "block" : "hidden"}`} >


                                        {notificationsDetails}
                                    {/* </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* mobile menu  */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn bg-primary-color text-primary-text lg:hidden md:hidden  block text-2xl mr-5"><IoMenuSharp className='flex items-center mt-2' /></label>

                </div>


                <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <div className='md:hidden lg:hidden block'>
                                <div className="flex gap-5 ">
                                    <div>
                                        <div className='flex gap-3 text-sm font-medium text-primary-color items-center'>Available coin |  <img className='W-14 h-14 rounded-full' src={user?.photoURL} /> </div>
                                        <div className='flex gap-3 text-sm font-medium text-primary-color items-center'>User Role |  {user?.displayName} </div>
                                    </div>
                                    <div className='flex items-center mr-5 relative'>
                                        <IoNotifications className='text-4xl  cursor-pointer z-50 text-primary-color' onClick={handleNotification} />
                                        {/* notifications modal  */}
                                        <div ref={popupRef} className={`rounded-2xl h-96 overflow-scroll min-w-52 p-5 bg-primary-color text-light absolute top-24 right-0 ${isModal ? "block" : "hidden"}`} >
                                            {notificationsDetails}
                                        </div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <SideNav></SideNav>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;
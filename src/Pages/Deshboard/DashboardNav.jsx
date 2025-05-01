import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-0.png'
import { IoMenuSharp, IoNotifications } from 'react-icons/io5';
import useAuth from '../../Hooks/useAuth';
import SideNav from './SideNav';
const DashboardNav = () => {
    const { user } = useAuth();
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
                                <div className='flex gap-3 text-sm font-medium text-primary-color items-center'>Available coin |  <img className='W-14 h-14 rounded-full' src={user?.photoURL} /> </div>
                                <div className='flex gap-3 text-sm font-medium text-primary-color items-center'>User Role |  {user?.displayName} </div>
                            </div>
                            <div className='flex items-center mr-5'>
                                <IoNotifications className='text-4xl text-secondary-color cursor-pointer'></IoNotifications>
                            </div>
                        </div>
                    </div>
                    {/* mobile menu  */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn bg-primary-color text-primary-text lg:hidden md:hidden  block text-2xl mr-5"><IoMenuSharp  className='flex items-center mt-2'/></label>




                    
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
                                        <div className='flex items-center mr-5'>
                                            <IoNotifications className='text-4xl text-secondary-color cursor-pointer'></IoNotifications>
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
import { NavLink} from "react-router-dom";


const SideNav = () => {


    const role = 'admin';

    const adminLinks = <>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/admin-home"}>Home</NavLink>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/manage-user"}>Manage User</NavLink>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/manage-task"}>Manage Task</NavLink>

    </>

    const workerLinks = <>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/worker-home"}>Home</NavLink>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/task-list"}>Task List</NavLink>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/my-submissions"}>My Submissions</NavLink>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/withdrawals"}>Withdrawals</NavLink>
    </>
    const buyerLinks = <>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/buyer-home"}>Home</NavLink>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/add-task"}>Add New Tasks</NavLink>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/my-task"}>My Task's</NavLink>
        <NavLink className="w-full  my-3 py-2 text-center" to={"/dashboard/purchase-coin"}>Purchase Coin</NavLink>
    </>


    return (
        <div className="flex flex-col">
            {role === 'admin'? adminLinks : role === "buyer" ? buyerLinks : workerLinks}
        </div>
    );
};

export default SideNav;
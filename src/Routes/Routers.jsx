import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import Profile from "../components/Profile";
import DashboardLayout from "../Layout/DashboardLayout";
import AdminHome from "../Pages/Deshboard/Admin/AdminHome";
import PrivetRoutes from "./PrivetRoutes";
import ManageUser from "../Pages/Deshboard/Admin/ManageUser";
import ManageTask from "../Pages/Deshboard/Admin/ManageTask";
import WorkerHome from "../Pages/Deshboard/Woarker/WoarkerHome";
import BuyerHome from "../Pages/Deshboard/Buyer/BuyerHome";







const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <p>Loading</p>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: '/profile',
                element: <Profile />
            }
        ],


    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },

    // dashboard related route 
    {
        path: "/dashboard",
        element: <PrivetRoutes><DashboardLayout></DashboardLayout></PrivetRoutes>,
        children: [

            // admin relate route 
            {
                path:"admin-home",
                element: <AdminHome></AdminHome>,
            },
            {
                path: 'manage-user',
                element: <ManageUser></ManageUser>,
            },
            {
                path: 'manage-task',
                element: <ManageTask></ManageTask>,
            },
          
            // worker related route 

            {
                path: 'worker-home',
                element: <WorkerHome></WorkerHome>
            },

            // buyer related route 
            {
                path: 'buyer-home',
                element: <BuyerHome></BuyerHome>
            }
            
            
        ]
    }

])

export default router 
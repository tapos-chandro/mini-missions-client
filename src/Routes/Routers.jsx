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
import AddTask from "../Pages/Deshboard/Buyer/AddTask";
import MyTask from "../Pages/Deshboard/Buyer/MyTask";
import PurchasesCoins from "../Pages/Deshboard/Buyer/PurchasesCoins";
import PaymentHistory from "../Pages/Deshboard/Buyer/PaymentHistory";
import TaskList from "../Pages/Deshboard/Woarker/TaskList";
import Submissions from "../Pages/Deshboard/Woarker/Submissions";
import Withdrawals from "../Pages/Deshboard/Woarker/Withdrawals";
import Payment from "../Pages/Payment/Payment";
import ViewDetail from "../Pages/Deshboard/Woarker/ViewDetail";
import AdminRoutes from "./AdminRoutes";
import NotFoundPage from "../components/NotFoundPage";







const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement:<NotFoundPage></NotFoundPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: 'payment/:id',
                element: <PrivetRoutes><Payment></Payment></PrivetRoutes>
            },
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
                path: "admin-home",
                element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>,
            },
            {
                path: 'manage-user',
                element: <AdminRoutes><ManageUser></ManageUser></AdminRoutes>,
            },
            {
                path: 'manage-task',
                element: <AdminRoutes> <ManageTask></ManageTask></AdminRoutes>,
            },

            // worker related route 

            {
                path: 'worker-home',
                element: <PrivetRoutes><WorkerHome></WorkerHome></PrivetRoutes>
            },
            {
                path: 'task-list',
                element: <PrivetRoutes><TaskList></TaskList></PrivetRoutes>
            },
            {
                path: 'my-submissions',
                element: <PrivetRoutes><Submissions></Submissions></PrivetRoutes>
            },
            {
                path: 'withdrawals',
                element: <PrivetRoutes><Withdrawals></Withdrawals></PrivetRoutes>
            },
            {
                path: 'detail/:id',
                element: <PrivetRoutes><ViewDetail></ViewDetail></PrivetRoutes>
            },

            // buyer related route 
            {
                path: 'buyer-home',
                element: <PrivetRoutes><BuyerHome></BuyerHome></PrivetRoutes>
            },
            {
                path: 'my-task',
                element: <PrivetRoutes><MyTask></MyTask></PrivetRoutes>
            },
            {
                path: 'purchase-coin',
                element: <PrivetRoutes><PurchasesCoins></PurchasesCoins></PrivetRoutes>
            },
            {
                path: 'payment-history',
                element: <PrivetRoutes><PaymentHistory></PaymentHistory></PrivetRoutes>
            },
            {
                path: 'add-task',
                element: <PrivetRoutes><AddTask></AddTask></PrivetRoutes>
            },

            // payment related route 



        ]
    }

])

export default router 
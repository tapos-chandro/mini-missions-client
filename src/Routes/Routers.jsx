import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <p>Loading</p>,
        children: [
            {
             path: "/",
             element: <Home></Home>
            }
        ],
        
    },

])

export default router 
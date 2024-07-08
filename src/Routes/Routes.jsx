import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
// import Home from "../Pages/ErrorPage/Home/Home";
// import Surveys from "../Pages/Surveys/Surveys";
import SurveyDetails from "@/Pages/Surveys/SurveyDetails/SurveyDetails";
import Registration from "@/Shared/Registration/Registration";
import Login from "@/Shared/Login/Login";
import Dashboard from "@/Layout/Dashboard";
import AddSurvey from "@/Pages/Dashboard/AddSurvey/AddSurvey";
import DashboardHome from "@/Pages/Dashboard/DashboardHome/DashboardHome";
import PrivateRoute from "@/Pages/PrivateRoute/PrivateRoute";
import Pro from "@/Pages/Pro/Pro";
import Payment from "@/Pages/Payment/Payment";
import Practice from "@/Pages/Practice/Practice";
import { lazy } from "react";
import AdminHome from "@/Pages/Dashboard/AdminHome/AdminHome";
import ManageUsers from "@/Pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "@/Pages/AdminRoute/AdminRoute";
import ManageSurvey from "@/Pages/Dashboard/ManageSurvey/ManageSurvey";

const Home = lazy(() => import("../Pages/ErrorPage/Home/Home"));
const Surveys = lazy(() => import('../Pages/Surveys/Surveys'))


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "surveys",
                element: <Surveys></Surveys>
            },
            {
                path: 'survey/:_id',
                element: <PrivateRoute><SurveyDetails></SurveyDetails></PrivateRoute>,
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: "registration",
                element: <Registration></Registration>
            },
            {
                path: "pro",
                element: <Pro></Pro>
            },
            {
                path: "payment",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
            },
            {
                path: "payment/:_id",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
                // loader: ({ params }) => fetch(`http://localhost:5000/pricingCard/${params.id}`)
            },
            {
                path: "practice",
                element: <Practice></Practice>
            },
            {
                path: "/dashboard",
                element: <Dashboard></Dashboard>,
                children: [
                    // user dashboard 
                    {
                        path: "/dashboard",
                        element: <DashboardHome></DashboardHome>
                    },
                    {
                        path: "adminHome",
                        element: <AdminHome></AdminHome>
                    },
                    {
                        path: "addSurvey",
                        element: <AddSurvey></AddSurvey>
                    },
                    {
                        path: "manageUsers",
                        element: <ManageUsers></ManageUsers>
                    },
                    {
                        path: "manageSurveys",
                        element: <ManageSurvey></ManageSurvey>
                    }
                    // pro-user dashboard 
                ]
            }
        ]

    },


])


export default router;
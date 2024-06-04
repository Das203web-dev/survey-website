import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/ErrorPage/Home/Home";
import Surveys from "../Pages/Surveys/Surveys";
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
                element: <Payment></Payment>,
            },
            {
                path: "payment/:_id",
                element: <Payment></Payment>,
                // loader: ({ params }) => fetch(`http://localhost:5000/pricingCard/${params.id}`)
            },
            {
                path: "practice",
                element: <Practice></Practice>
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    // user dashboard 
                    {
                        path: "/dashboard",
                        element: <DashboardHome></DashboardHome>
                    },
                    {
                        path: "addSurvey",
                        element: <AddSurvey></AddSurvey>
                    }
                    // pro-user dashboard 
                ]
            }
        ]

    },


])


export default router;
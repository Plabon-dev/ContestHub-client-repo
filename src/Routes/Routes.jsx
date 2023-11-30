import AllContest from '../Layout/AllContest';
import ContestDetails from '../Layout/ContestDetails/ContestDetails';
import Home from '../Layout/Home/Home';
import Login from '../Layout/Login';
import Payment from '../Layout/Payment';
import Register from '../Layout/Register';
import AddContest from '../Layout/dashBoard/AddContest';
import ContestSubmitted from '../Layout/dashBoard/ContestSubmitted';
import DashBoard from '../Layout/dashBoard/DashBoard';
import ManageContests from '../Layout/dashBoard/ManageContests';
import ManageUser from '../Layout/dashBoard/ManageUser';
import MyCreatedContest from '../Layout/dashBoard/MyCreatedContest';
import MyProfile from '../Layout/dashBoard/MyProfile';
import MyRegisteredContest from '../Layout/dashBoard/MyRegisteredContest';
import Main from './../Layout/Main';
import {

  createBrowserRouter,
} from "react-router-dom";
import PrivetRoutes from './PrivetRoutes';
import MyWinnedContest from '../Layout/dashBoard/MyWinnedContest';
import Timeline from '../Layout/Timeline';
import AboutUs from '../Layout/AboutUs';
import AdminRoutes from './AdminRoutes';
import CreatorRoutes from './CreatorRoutes';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>

      },
      {
        path: '/allcontests',
        element: <AllContest></AllContest>

      },
      {
        path: '/login',
        element: <Login></Login>

      },
      {
        path: '/timeline',
        element: <Timeline></Timeline>

      },
      {
        path: '/aboutus',
        element: <AboutUs></AboutUs>

      },
      {
        path: '/register',
        element: <Register></Register>

      },
      {
        path: '/payment/:id',
        element: <Payment></Payment>,
        loader: ({ params }) => fetch(`http://localhost:5000/contests/${params.id}`)

      },
      {
        path: '/contestdetails/:id',
        element: <PrivetRoutes><ContestDetails></ContestDetails></PrivetRoutes>,
        loader: ({ params }) => fetch(`http://localhost:5000/contests/${params.id}`)

      },

    ]
  },
  {
    path: 'dashboard',
    element: <PrivetRoutes><DashBoard></DashBoard></PrivetRoutes>,
    children: [
        {
          path: 'myRegisteredContest',
          element: <MyRegisteredContest></MyRegisteredContest>
        },
        {
          path: 'manageuser',
          element: <AdminRoutes><ManageUser></ManageUser></AdminRoutes>
        },
        
        {
          path: 'managecontest',
          element: <AdminRoutes><ManageContests></ManageContests></AdminRoutes>
        },
        {
          path: 'profile',
          element: <MyProfile></MyProfile>
        },
        {
          path: 'addcontest',
          element: <CreatorRoutes><AddContest></AddContest></CreatorRoutes>
        },
        {
          path: 'createdcontest',
          element: <CreatorRoutes><MyCreatedContest></MyCreatedContest></CreatorRoutes>
        },
        {
          path: 'contestsubmitted',
          element: <CreatorRoutes><ContestSubmitted></ContestSubmitted></CreatorRoutes>
        },
        {
          path: 'contestswinned',
          element: <MyWinnedContest></MyWinnedContest>
        },
    ]
  }
]);
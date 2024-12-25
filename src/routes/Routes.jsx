import {
    createBrowserRouter,
   
  } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/404Page"
import Homepage from "../pages/Homepage";
import AllFoods from "../pages/AllFoods";
import SingleFoodPage from "../pages/SingleFoodPage";
import Purchase from "../pages/Purchase";
import PrivateRoute from "./PrivateRoute";
import MyOrders from "../pages/MyOrders";
import AddFood from "../pages/AddFood";
import MyFoods from "../pages/MyFoods";
import Gallery from "../pages/Gallery";


  export const router = createBrowserRouter([
   
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/',
          element: <Homepage></Homepage>
        },
        {
          path: 'register',
          element: <Register></Register>
        },
        {
          path: 'allFoods',
          element: <AllFoods></AllFoods>,
          loader: () => fetch('https://assignment-11-flame.vercel.app/foodCount')
        },
       
        {
          path: 'allFoods/:_id',
          loader: ({params}) => fetch(`https://assignment-11-flame.vercel.app/allFoods/${params._id}`),
          element: <SingleFoodPage></SingleFoodPage>
        },
        {
          path: 'purchase/:_id',
          loader: ({params}) => fetch(`https://assignment-11-flame.vercel.app/allFoods/${params._id}`),
          element: <PrivateRoute><Purchase></Purchase></PrivateRoute>
        },
        {
          path: 'myOrders',
          element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
        },
        {
          path: 'addFood',
          element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
        },
        {
          path: 'myFoods',
          element: <PrivateRoute><MyFoods></MyFoods></PrivateRoute>
        },
        {
          path: 'gallery',
          element: <Gallery></Gallery>
        },




        

      ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
      },
      
  ]);
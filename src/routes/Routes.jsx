import {
    createBrowserRouter,
   
  } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/Notfound";
import Homepage from "../pages/Homepage";


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
          element: <Register></Register>
        },
        {
          path: 'gallery',
          element: <Register></Register>
        },


        

      ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
      },
      
  ]);
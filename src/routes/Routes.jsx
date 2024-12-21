import {
    createBrowserRouter,
   
  } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/Notfound";
import Homepage from "../pages/Homepage";
import AllFoods from "../pages/AllFoods";
import SingleFoodPage from "../pages/SingleFoodPage";


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
          element: <AllFoods></AllFoods>
        },
        {
          path: 'gallery',
          element: <Register></Register>
        },
        {
          path: 'allFoods/:_id',
          loader: ({params}) => fetch(`https://assignment-11-flame.vercel.app/allFoods/${params._id}`),
          element: <SingleFoodPage></SingleFoodPage>
        },



        

      ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
      },
      
  ]);
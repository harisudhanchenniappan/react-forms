import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import WelcomePage from './WelcomePage'
import LoginSignupPage from './LoginSignupPage'
import Home from './Home'
import Responses from './Responses'
import CreateForm from './CreateForm'
import SubmitForm from './SubmitForm'


const router=createBrowserRouter([
    {
    path:'/',
    element:<WelcomePage />
    
    },
    {
        path:'/Login-signup',
        element:<LoginSignupPage />
      },
      {
        path:'/home',
        element:<Home />,        
      },
      {
        path:'/responses',
        element:<Responses />,        
      },
      {
        path:'/create-form',
        element:<CreateForm />,        
      },
      {
        path:'/form/:id',
        element:<SubmitForm />,        
      },
    
      
      
    ])
    const All = () => {
      return <RouterProvider router={router} />
    }
    
    export default All
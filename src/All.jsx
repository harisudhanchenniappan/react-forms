import React from 'react'
import Mains from './Mains'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router=createBrowserRouter([
    {
        path:'/form/:id',
        element:<Mains />
    }
])

const All = () => {
  
    return <RouterProvider router={router} />
  
}

export default All
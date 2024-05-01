import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Components/MainLayout.jsx'
import Chat from './Components/Pages/Chat.jsx'
import Login from './Components/Authentication/Login.jsx'
import Reg from './Components/Authentication/Registration.jsx'
import AuthProvider from './Components/Provider/AuthProvide.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/chat',
        element: <Chat />
      },
      {
        path: '/register',
        element: <Reg />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)

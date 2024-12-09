import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import RegisterEvent from './components/RegisterEvent.jsx'
import UserContextProvider from "./contexts/UserContext.jsx"
import AdminLogin from './components/AdminLogin.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import AdminAuthComp from './components/AdminAuthComp.jsx'
import AdminContextProvider from './contexts/AdminContext.jsx'
import ViewEvents from './components/ViewEvents.jsx'
import EditEvent from './components/EditEvent.jsx'
import AddEvent from './components/AddEvent.jsx'
import EventRegistrations from './components/EventRegistrations.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<App />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={<AdminLogin />} />
      <Route path='/admin-dashboard' element={<AdminAuthComp><AdminDashboard /></AdminAuthComp>} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/registerev/:eventId' element={<RegisterEvent />} />
      <Route path='/admin/event/:eventId' element={<AdminAuthComp><EditEvent /></AdminAuthComp>} />
      <Route path='/admin/events' element={<AdminAuthComp><ViewEvents /></AdminAuthComp>} />
      <Route path='/admin/add-event' element={<AdminAuthComp><AddEvent /></AdminAuthComp>} />
      <Route path='/admin/event-registrations' element={<AdminAuthComp><EventRegistrations /></AdminAuthComp>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </AdminContextProvider>
  </StrictMode>,
)


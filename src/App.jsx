import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Welcome from './pages/Welcome.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Delegate_dashboard from './pages/Delegate_dashboard.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import Organization_profile from './pages/Organization_profile.jsx';
import History from './pages/History.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BottomNavbar from './components/BottomNavbar.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const location = useLocation();

  // 👇 Only show BottomNavbar if not on '/' or '/welcome'
  const hideNavbarRoutes = ['/', '/welcome'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <BottomNavbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/welcome' element={<Welcome />} />

        <Route path='/dashboard' element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path='/delegate_dashboard' element={
          <ProtectedRoute><Delegate_dashboard /></ProtectedRoute>
        } />
        <Route path='/create_event' element={
          <ProtectedRoute><CreateEvent /></ProtectedRoute>
        } />
        <Route path='/organization_profile' element={
          <ProtectedRoute><Organization_profile /></ProtectedRoute>
        } />
        <Route path='/history' element={
          <ProtectedRoute><History /></ProtectedRoute>
        } />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;

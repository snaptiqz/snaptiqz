import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Welcome from './pages/Welcome.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SuggestionsPage from './pages/SuggestionsPage.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import Organization_profile from './pages/Organization_profile.jsx';
import History from './pages/History.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BottomNavbar from './components/BottomNavbar.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LoadScript } from '@react-google-maps/api';
import TopNavbar from './components/TopNavbar.jsx';

const App = () => {
  const location = useLocation();

  // 👇 Only show BottomNavbar if not on '/' or '/welcome'
  const hideNavbarRoutes = ['/', '/welcome'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
     {shouldShowNavbar && (
  <>
    <TopNavbar />
    <BottomNavbar />
  </>
)}


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/welcome' element={<Welcome />} />

        <Route path='/dashboard' element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path='/suggestion' element={
          <ProtectedRoute><SuggestionsPage /></ProtectedRoute>
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

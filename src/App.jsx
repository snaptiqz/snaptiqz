import React, { useState, useEffect } from 'react';
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
import TopNavbar from './components/TopNavbar.jsx';
import Spinner from './components/Spinner.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/welcome'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timeout);
    } else {
      setLoading(false); // immediately remove spinner for other routes
    }
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* Spinner only shown for '/' */}
      {loading && <Spinner />}

      {/* Conditional Navbars */}
      {shouldShowNavbar && (
        <>
          <TopNavbar />
          <BottomNavbar />
        </>
      )}

      {/* Only delay Home rendering on `/`, all others load instantly */}
      <Routes>
        <Route path='/' element={loading ? null : <Home />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/suggestion' element={<ProtectedRoute><SuggestionsPage /></ProtectedRoute>} />
        <Route path='/create_event' element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        <Route path='/organization_profile' element={<ProtectedRoute><Organization_profile /></ProtectedRoute>} />
        <Route path='/history' element={<ProtectedRoute><History /></ProtectedRoute>} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;

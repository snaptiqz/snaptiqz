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
import { ToastContainer, cssTransition,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/welcome'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const [loading, setLoading] = useState(false);

  // Custom toast transition
  const CustomTransition = cssTransition({
    enter: 'animate-fadeInUp',
    exit: 'animate-fadeOutDown',
    duration: [300, 200],
  });

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
        
         
          <BottomNavbar />
        </>
      )}

      <Routes>
        <Route path='/' element={loading ? null : <Home />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/suggestion' element={<ProtectedRoute><SuggestionsPage /></ProtectedRoute>} />
        <Route path='/create_event' element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        <Route path='/organization_profile' element={<ProtectedRoute><Organization_profile /></ProtectedRoute>} />
        <Route path='/history' element={<ProtectedRoute><History /></ProtectedRoute>} />
      </Routes>

      <ToastContainer
  position="top-right"
  autoClose={3000} // ⬅️ Slightly longer
  hideProgressBar
  closeOnClick
  pauseOnHover={false} // ⬅️ Important fix for mobile
  draggable={false}
  closeButton={true}
  theme="colored"
  transition={Slide} // or try Slide/Zoom to isolate issue
  toastClassName={({ type }) => {
    const base =
      "relative pointer-events-auto w-[280px] max-w-md sm:max-w-lg " +
      "backdrop-blur-xl rounded-xl shadow-2xl mr-2 px-4 py-4 sm:mx-24 sm:mr-6 my-3 sm:my-4 " +
      "text-sm sm:text-base transition-colors " +
      "after:pointer-events-none after:absolute after:inset-0 after:-translate-x-full " +
     
      "after:from-transparent after:via-white/10 after:to-transparent ";

    const typeStyles = {
      success:
        "bg-green-600/10 border border-green-500/30 text-white hover:bg-green-600/20",
      error:
        "bg-red-600/10 border border-red-500/30 text-white hover:bg-red-600/20",
      default:
        "bg-white/10 border border-white/20 text-white hover:bg-white/20",
    };

    return base + (typeStyles[type] || typeStyles.default);
  }}
  bodyClassName="text-sm font-medium relative z-10"
  className="z-50"
/>

    </div>
  );
};

export default App;
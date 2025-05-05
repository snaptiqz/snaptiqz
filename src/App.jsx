import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Welcome from './pages/Welcome.jsx';
import Org_dashboard from './pages/Org_dashboard.jsx';
import Delegate_dashboard from './pages/Delegate_dashboard.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import Organization_profile from './pages/Organization_profile.jsx';
import History from './pages/History.jsx';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/org_dashboard' element={<Org_dashboard />} />
        <Route path='/delegate_dashboard' element={<Delegate_dashboard/>} />
        <Route path='/create_event' element={<CreateEvent />} />
        <Route path='/organization_profile' element={<Organization_profile />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </div>
  );
};

export default App;

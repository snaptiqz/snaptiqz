import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  Clock,
  FileText,
  Star,
  DollarSign,
  ArrowLeft,
  QrCode,
  Pencil,
} from 'lucide-react';
import gridBg from '../assets/Grid_mob.svg';
import { AuthContext } from '../context/AuthContext.jsx';
import Spinner from '../components/Spinner.jsx';
import avatar from '../assets/avatar.svg';
import StarryBackground from '../components/StarryBackground.jsx';

const Organization_profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) return <Spinner />;

  return (
    <div
          className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(circle at top, rgba(0, 70, 255, 0.1) 0%, transparent 20%)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          {/* Grid Background */}
          <img
            src={gridBg}
            alt="grid background"
            className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-3/4 w-[120vw] sm:w-[60vw] max-w-none opacity-80 pointer-events-none z-0"
          />
      <StarryBackground count={80} />

      <div className="max-w-sm mx-auto px-6 py-6 relative z-10">
        {/* Back + Title */}
        <div className="flex items-center gap-2 mb-10">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="text-white bg-[#2b2b2b] p-1 rounded-lg" size={28} />
          </button>
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>

        {/* User Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <img
                src={user?.image || avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full border border-white"
              />
              <div className="absolute -bottom-1 -right-1 bg-white text-black p-1 rounded-full">
                <Pencil size={10} />
              </div>
            </div>
            <div>
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-gray-400">Add Description</p>
            </div>
          </div>
          <QrCode className="w-8 h-8 text-white/80" />
        </div>

        {/* Menu Items */}
        <div className="space-y-6 text-md text-white/80">
          <button className="flex items-center gap-3">
            <Lock size={20} /> Privacy
          </button>
          <button onClick={() => navigate('/history')} className="flex items-center gap-3">
            <Clock size={20} /> History
          </button>
          <button className="flex items-center gap-3">
            <FileText size={20} /> My Certificates
          </button>
          <button className="flex items-center gap-3">
            <Star size={20} /> Favorite Delegates
          </button>
          <button className="flex items-center gap-3">
            <DollarSign size={20} /> Revenue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Organization_profile;

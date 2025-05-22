// File: pages/Step1ProfileSetup.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import avatar from '../assets/avatar.svg';
import logo from '../assets/logo.svg';
import gridBg from '../assets/Grid_mob.svg';
import StarryBackground from '../components/StarryBackground';

const ProfileSetUp = () => {
  const navigate = useNavigate();
  const { user, updateProfile,checkUsername } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user?.profileImage || '');
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async () => {
  if (!name.trim() || !username.trim()) return;

  setLoading(true);
  setUsernameError('');

  try {
    const isTaken = await checkUsername(username.trim());
    if (isTaken.exists) {
      setUsernameError('Username is already taken');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('username', username.trim());
    if (file) formData.append('profileImage', file);

    await updateProfile(formData);
    navigate('/suggestions');
  } catch (err) {
    console.error('Failed to update profile:', err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden">
      <img src={gridBg} alt="grid background" className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-3/4 w-[100vw] sm:w-[60vw] max-w-none opacity-80 pointer-events-none z-0" />
      <img src={logo} alt="Logo" className="w-8 h-8 mt-6 ml-6" />
      <StarryBackground count={80} />

      <div className="flex flex-col items-center mt-20">
        <p className="text-xl sm:text-2xl mb-6">Let’s Set up your Profile</p>
        <div className="relative w-24 h-24 mb-4">
          <img
            src={file ? URL.createObjectURL(file) : preview || user?.image || avatar}
            alt="Avatar"
            className="rounded-full w-full h-full object-cover"
          />
          <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer text-sm">
            ✎
          </label>
          <input
            type="file"
            id="avatarUpload"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files[0];
              if (f) {
                setFile(f);
                setPreview(URL.createObjectURL(f));
              }
            }}
            className="hidden"
          />
        </div>

        <input
          type="text"
          placeholder="My Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border border-gray-500 rounded-lg px-4 py-2 mb-3 w-64 text-center placeholder-gray-400"
        />

        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError('');
            }}
            className="bg-transparent border border-gray-500 rounded-lg px-4 py-2 mb-1 w-64 text-center placeholder-gray-400"
            />
            {usernameError && (
            <p className="text-red-500 text-sm mt-1 mb-4">{usernameError}</p>
            )}


        <button
          onClick={handleProfileUpdate}
          className="bg-white text-black px-6 py-2 rounded-full disabled:opacity-50"
          disabled={loading || !name.trim() || !username.trim()}
        >
          {loading ? 'Saving...' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSetUp;
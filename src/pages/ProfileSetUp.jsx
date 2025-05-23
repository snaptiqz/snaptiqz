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
  const { user, updateProfile, useUsernameCheck } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user?.profileImage || '');
  const [loading, setLoading] = useState(false);

  const { data: usernameStatus, isFetching: checkingUsername } = useUsernameCheck(username);
  const isUsernameValid = usernameStatus && !usernameStatus.exists;

  const handleProfileUpdate = async () => {
    if (!name.trim() || !username.trim()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('username', username.trim());
      if (file) formData.append('profileImage', file);

      await updateProfile(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden">
      <img
        src={gridBg}
        alt="grid background"
        className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-3/4 w-[100vw] sm:w-[60vw] max-w-none opacity-80 pointer-events-none z-0"
      />
      <img src={logo} alt="Logo" className="w-8 h-8 mt-6 ml-6" />
      <StarryBackground count={80} />

      <div className="flex flex-col items-center mt-20">
        <p className="text-xl sm:text-2xl mb-6">Let’s Set up your Profile</p>

        {/* Avatar Upload */}
        <div className="relative w-24 h-24 mb-4">
          <img
            src={file ? URL.createObjectURL(file) : preview || user?.image || avatar}
            alt="Avatar"
            className="rounded-full w-full h-full object-cover"
          />
          <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 right-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer text-sm"
          >
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

        {/* Name Field */}
        <input
          type="text"
          placeholder="My Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border border-gray-500 rounded-lg px-4 py-2 mb-3 w-64 text-center placeholder-gray-400"
        />

        {/* Username Field */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setUsername(value);
            setUsernameTouched(true);
          }}
          className="bg-transparent border border-gray-500 rounded-lg px-4 py-2 mb-1 w-64 text-center placeholder-gray-400"
        />

        {/* Username Status */}
        {usernameTouched && username && (
          <p
            className={`text-sm mt-1 mb-4 ${
              checkingUsername ? 'text-yellow-500' : isUsernameValid ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {checkingUsername
              ? 'Checking...'
              : isUsernameValid
              ? 'Username is available'
              : 'Username is already taken'}
          </p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleProfileUpdate}
          className="bg-white text-black px-6 py-2 rounded-lg mt-4 disabled:opacity-50"
          disabled={loading || checkingUsername || !name.trim() || !username.trim() || !isUsernameValid}
        >
          {loading ? 'Saving...' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSetUp;

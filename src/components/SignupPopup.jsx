import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.svg';
import google from '../assets/google_logo.png';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner'; // Assuming Spinner is a separate component

const SignupPopup = ({ onClose }) => {
  const { register, login } = useContext(AuthContext);

  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      if (mode === 'signup') {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) return setError('Weak password.');
        if (password !== confirmPassword) return setError('Passwords do not match.');
        await register({ email, password });
      } else {
        if (!email || !password) return setError('Enter both email and password.');
        await login({ email, password });
      }
    } catch {
      setError(`${mode === 'signup' ? 'Signup' : 'Login'} failed.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md text-white flex justify-center items-center"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-red-400 text-md"
      >
        <FaTimes />
      </button>

      <div className="w-full max-w-md relative px-6 py-10">
        <img src={logo} alt="Logo" className="w-8 h-8 mb-6 mx-auto" />
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome to Snaptiqz</h2>

        {mode === 'signup' && (
          <p className="text-white/90 text-center mb-2 text-sm sm:text-lg sm:mt-4">
            Thank you for signing up. Begin your hosting journey here by creating an account.
          </p>
        )}

        {mode === 'signup' &&
          (!hasMinLength || !hasUpperCase || !hasNumber || !hasSpecial ? (
            <div className="text-xs text-red-400 text-center mb-4">
              {(() => {
                const conditions = [];
                if (!hasMinLength) conditions.push('at least 8 characters');
                if (!hasUpperCase) conditions.push('one uppercase letter');
                if (!hasNumber) conditions.push('one number');
                if (!hasSpecial) conditions.push('one special character.');
                return `Password must have ${conditions.join(', ')}`;
              })()}
            </div>
          ) : (
            <div className="text-xs text-green-400 text-center mb-4">Password is strong</div>
          ))}

        {/* ✅ Wrapped in a form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 mb-4 bg-[#1e1e1e] rounded-full border border-gray-700 text-white"
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 pr-10 bg-[#1e1e1e] rounded-full border border-gray-700 text-white"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

        

          {mode === 'signup' && (
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-3 pr-10 bg-[#1e1e1e] rounded-full border border-gray-700 text-white"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          )}

          {error && <p className="text-red-400 text-sm text-center mb-3">{error}</p>}

          <button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-white text-black py-3 rounded-full font-semibold mb-4 flex justify-center items-center gap-2"
>
  {isSubmitting ? (
    <>
      <Spinner />
      {mode === 'signup' ? 'Signing up' : 'Signing in'}
    </>
  ) : (
    mode === 'signup' ? 'Sign Up' : 'Sign In'
  )}
</button>

           {mode === 'signin' && (
    <div
      onClick={() => navigate('/forgotpassword')} // ⬅️ navigate on click
      className="text-center text-xs text-white mb-4 cursor-pointer hover:underline"
    >
      Forgot Your Password?
    </div>
  )}

        </form>

        <div className="flex items-center gap-2 text-gray-500 text-sm my-4">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="text-white/60">OR</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>


        <button
          onClick={() => alert('Google login not yet implemented')}
          className="w-full flex items-center justify-center gap-2 bg-black text-white border border-gray-700 py-3 rounded-full hover:bg-gray-800 mt-8"
        >
          <img src={google} alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          {mode === 'signup' ? 'Already have an account?' : 'New here?'}{' '}
          <span
            onClick={() => {
              setMode(mode === 'signup' ? 'signin' : 'signup');
              setError('');
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-white cursor-pointer underline"
          >
            {mode === 'signup' ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupPopup;

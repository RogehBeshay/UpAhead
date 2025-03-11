import React, { useEffect } from 'react';
import waveLogo from '../images/goodbye.png';
import calendarImg from '../images/calendarPic.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/tasks'); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/tasks');
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-evenly items-center text-center flex-row gap-5 h-full">
        <div className="content-container flex justify-center items-center text-center flex-row gap-5 h-full">
          <div className="w-[700px] text-center flex flex-col justify-center">
            <h1 className="text-7xl font-extrabold text-gray-800 text-left">
              Welcome to <img src={waveLogo} alt="Wave Icon" className="inline-block w-16 h-16" />
              <span className='text-[#958fc1]'> ManageMate!</span>
            </h1>
            <div className="mt-8 text-center w-[700px]">
              <p className="text-gray-800 text-base text-left">
                Organize your tasks efficiently, track progress, and stay on top of deadlines all in one place. Sign in, create tasks, and mark them as complete—it's that easy!
              </p>
              <button
                onClick={handleGoogleSignIn}
                className="bg-[#958fc1] w-48 h-16 rounded-lg hover:shadow-xl hover:font-semibold flex justify-center items-center mt-[20px]"
              >
                Google Login ▶
              </button>
            </div>
          </div>
          <img
            className='size-[400px] shadow-[0_15px_20px_-15px_rgba(0,0,0,0.3)] shadow-[#958fc1]'
            src={calendarImg} alt="Task Manager"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

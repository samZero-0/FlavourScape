import { updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Register = () => {
  
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const { createAccount, setUser, googleSignin } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleGoogleLogin = () => {
    googleSignin()
      .then(res => {
        toast.success("Register Successful");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 800);
       
      })
      .catch(err => {
        
        toast.error("Google login failed");
      })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    if (regex.test(password)) {
      createAccount(email, password)
        .then((result) => {
          const currentUser = result.user;
          setUser(currentUser);
          updateProfile(currentUser, { displayName: name, photoURL: photo })
          
            .then(() => {
              toast.success("Register Successful");
              setTimeout(() => {
                navigate("/");
              }, 800);
              
              
            })
            .catch(err => {
              toast.error(`Registration Failed: ${err}`);
            })
        })
        .catch((error) => {
          toast.error(`Registration Failed: ${error}`);
        });
    } else {
      setError('Password must have an uppercase letter, lowercase letter, and a length of at least 6 characters.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  py-12">
    <ToastContainer />
   
  
    <div className="bg-white dark:bg-transparent  rounded-lg overflow-hidden md:flex w-4/5 lg:w-3/5">
      {/* Lottie Animation */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center  p-6">
        <DotLottieReact
          src="https://lottie.host/d036fd77-2e19-41c9-9d9a-ea7b23dfd792/8GWv13DLTr.lottie"
          loop
          autoplay
          speed={1}
          style={{ width: "350px", height: "350px" }}
        />
      </div>
  
      {/* Form Section */}
      <div className="w-full md:w-1/2 md:p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white  mb-6">Create an Account</h1>
        
        <form onSubmit={handleFormSubmit} className="space-y-6 dark:border dark:rounded-xl p-6 ">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
  
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Username</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="name"
                placeholder="Enter your username"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
  
          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Photo URL</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="url"
                name="photo"
                placeholder="Enter your photo URL"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
  
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-3 text-gray-600"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white text-lg font-bold py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
  
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  
          {/* Google Sign-In */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full  text-black dark:text-white border rounded-xl py-2  focus:outline-none"
            >
              <FaGoogle className="mr-2" /> Login with Google
            </button>
          </div>
  
          {/* Already Registered */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default Register;

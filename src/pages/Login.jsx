

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";

const Login = () => {
  
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const { signIn, setUser,  googleSignin } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    googleSignin()
      .then(res => {
        toast.success("Login successful",res);
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1000);
        
      })
      .catch(err => {
        toast.error("Login failed: " + err.message);
      });
  };

  

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then(res => {
        setUser(res.user);
        toast.success("Login successful");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 800);
         
      })
      .catch(err => {
        toast.error(`Login Failed: ${err.message}`);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center py-5">
      <ToastContainer />
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="mt-5">
        <h1 className="text-2xl font-bold">Sign in</h1>
      </div>

      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-xl">
        <form className="card-body" onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              
              type="email"
              placeholder="email"
              className="input input-bordered"
              name="email"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="password"
              className="input input-bordered pr-10"
              name="password"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-12 text-xl"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
           
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>

          <div className="form-control mt-6">
            <button onClick={handleGoogleLogin} className="btn flex items-center text-lg">
              <FaGoogle /> Login with Google
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10">
        <span>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 underline">
            Register now
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;

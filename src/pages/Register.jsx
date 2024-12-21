import { updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";

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
    <div className="w-full flex justify-center items-center flex-col gap-4 py-12">
      
      <ToastContainer />
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div>
        <h1 className="text-2xl font-bold">Create an account</h1>
      </div>
      <form className="w-full flex justify-center items-center flex-col gap-4 py-12" onSubmit={handleFormSubmit}>
        <label className="input input-bordered flex items-center gap-2 md:w-1/4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Email" name="email" required />
        </label>
        <label className="input input-bordered flex items-center gap-2 md:w-1/4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow" placeholder="Username" name="name" />
        </label>

        <label className="input input-bordered flex items-center gap-2 md:w-1/4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="url" className="grow" placeholder="Enter your Photo URL" name="photo" />
        </label>

        <label className="input input-bordered flex items-center gap-2 md:w-1/4 relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
          </svg>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="password"
            className="input pr-10"
            name="password"
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>

        <div className="form-control mt-6 w-1/4">
          <button className="btn text-center text-lg font-bold btn-primary" type="submit">Register</button>
        </div>

        {error && <div className="text-xl font-bold text-red-500">{error}</div>}

        <div className="form-control mt-6">
          <Link ><button onClick={handleGoogleLogin} className="btn flex items-center text-lg "><FaGoogle /> Login with Google</button></Link>
        </div>

        <div>
          <span>Already have an account? <Link to='/login' className="text-blue-700 underline">Log in</Link></span>
        </div>
      </form>
    </div>
  );
};

export default Register;

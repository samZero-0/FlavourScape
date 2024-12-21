import { useContext, useState } from "react";
import { MdOutlineFastfood } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { AuthContext } from "../providers/AuthProvider";



const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  const { user, logOut } = useContext(AuthContext)



  return (
    <section className="sticky top-0 z-50 bg-white backdrop-blur-md bg-white/60">
      <section className="md:w-11/12 md:mx-auto">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            <img
              src="/logo-main.png"
              alt="Logo"
              className="w-[60px] h-[40px] hidden md:block"
            />
            <Link to="/" className="btn btn-ghost text-xl">
              PlateMate
            </Link>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="#aboutUs">About</a>
              </li>
              <li>
                <Link to="/mealPlan">Meal Plan</Link>
              </li>
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end">
        

            {user && user.email ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL?.split("?")[0]} alt="User Avatar" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-200 rounded-box z-[1] mt-2 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={logOut}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink to="/login" className="btn bg-[#a0e2ff] hidden lg:flex">
                <AiOutlineLogin className="text-xl" /> Login/Signup
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {hamburger && (
          <div
            className="absolute top-[64px] left-0 w-full bg-white shadow-lg z-40 lg:hidden"
            data-aos="fade-down"
          >
            <ul
              className="menu menu-vertical p-4"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <li>
                <Link to="/" onClick={() => setHamburger(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/mealPlan" onClick={() => setHamburger(false)}>
                  Meal Plan
                </Link>
              </li>
              <li>
                <Link to="/categories" onClick={() => setHamburger(false)}>
                  Categories
                </Link>
              </li>
              <li>
                <a href="/login" onClick={() => setHamburger(false)}>
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" onClick={() => setHamburger(false)}>
                  SignUp
                </a>
              </li>
            </ul>
          </div>
        )}
      </section>
    </section>
  );
};

export default Navbar;

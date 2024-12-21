import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";



const MainLayout = () => {
    return (
        <div>
            <ToastContainer></ToastContainer>
       <div className="w-full">
           <NavBar></NavBar>

        <div className="w-11/12 mx-auto ">

            <div className="min-h-[calc(100vh-289px)]">
            <Outlet></Outlet>

            </div>

            
        </div>
        <Footer></Footer>
        </div>
        

        </div>
    );
};

export default MainLayout;
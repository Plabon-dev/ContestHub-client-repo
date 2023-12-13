import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import CustomCursor from './../Components/cursorEffect/CustomCursor';

const Main = () => {
    return (
        <div>
            <div className="hidden lg:flex"><CustomCursor /></div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;
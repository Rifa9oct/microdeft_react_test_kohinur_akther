import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
    const location = useLocation();
    const noHeader = location.pathname.includes('login') || location.pathname.includes('register');

    return (
        <div>
            {noHeader || <Header />}
            <Outlet />
        </div>
    );
};

export default Root;
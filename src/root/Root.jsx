import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import AuthProvider from "../provider/AuthProvider";

const Root = () => {
    const location = useLocation();
    const noHeader = location.pathname.includes('login') || location.pathname.includes('register') || location.pathname.includes('courses');

    return (
        <div>
            <AuthProvider>
                {noHeader || <Header />}
                <Outlet />
            </AuthProvider>
        </div>
    );
};

export default Root;
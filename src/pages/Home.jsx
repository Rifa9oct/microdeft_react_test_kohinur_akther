import { Link } from "react-router-dom";
import banner from "../assets/banner.jpg"
import { useAuth } from "../hooks/useAuth";
import DisplayCourses from "./DisplayCourses";

const Home = () => {
    const { auth } = useAuth();
    const user = auth?.user ? auth?.user : "";

    const bannerimg = {
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: '100vh'
    }

    return (
        <>
            {/* banner  */}
            <div style={bannerimg}>
                {
                    user ? (
                        <div className="flex justify-center items-center bg-black bg-opacity-70 w-full h-[100vh]">
                            <div>
                                <p className="text-5xl text-white font-bold font-serif">Welcome to our community!</p>

                                <div className="flex justify-center items-center text-white mt-10">
                                    <Link to="courses" className="animate-pulse">
                                        <button className="w-[170px] border-2 rounded-md uppercase font-bold text-center py-2 bg-blue-500 hover:bg-transparent shadow shadow-white text-white">
                                            create courses
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center bg-black bg-opacity-70 w-full h-[100vh]">
                            <div>
                                <p className="text-5xl text-white font-bold font-serif">Welcome to our community!</p>

                                <div className="flex justify-center items-center text-white gap-8 mt-10">
                                    <Link to="login" className="animate-pulse">
                                        <button className="w-[120px] border-2 rounded-md uppercase font-bold text-center py-2 bg-blue-500 hover:bg-transparent shadow shadow-white">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="register" className="animate-pulse">
                                        <button className="w-[120px] border-2 rounded-md uppercase font-bold text-center py-2 bg-blue-500 hover:bg-transparent shadow shadow-white">
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>

            {/* Display courses  */}
            {
                user && (
                    <div>
                        <DisplayCourses />
                    </div>
                )
            }
        </>
    );
};

export default Home;
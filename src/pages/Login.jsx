import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const { setAuth } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const user = { email, password };

        try {
            const res = await axios.post("https://react-interview.crd4lc.easypanel.host/api/login", user);
            if (res.status === 200) {
                setAuth(res?.data?.data );
                navigate("/");
            }

        } catch (err) {
            if (err.status === 422) {
                Swal.fire({
                    title: `${err?.response?.data?.message}😟`,
                    icon: "error",
                });
            } else {
                console.log(err)
            }
        }
        reset();
    }

    return (
        <>
            <Link to="/" className="flex items-center border-2 m-[50px] text-white rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 p-2 w-[140px]">
                <IoArrowBack className="text-[18px]" />
                <p className="text-sm font-bold">Go Back Home</p>
            </Link>

            <div className="flex justify-center mb-[120px]">
                <form onSubmit={handleSubmit(onSubmit)} method="post" autoComplete="off" className="w-[500px] h-[600] border-2 rounded-lg p-8 shadow-lg">
                    <h1 className="text-center text-3xl font-bold mb-8 uppercase">Login <span className="textStyle">Your Account</span></h1>
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="email" className="text-gray-600 mb-2 block font-bold">Email</label>
                            <input type="email"
                                {...register("email", { required: true })}
                                name="email"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                                placeholder="youremail@gmail.com" />
                            {errors.email && <span className="text-sm mt-1 text-red-500"><MdError className="inline" /> Email field is required.</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="text-gray-600 mb-2 block font-bold">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"}
                                    {...register("password", { required: true, minLength: 8, maxLength: 15 })}
                                    name="password"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring- focus:outline-none focus:border-blue-500 placeholder-gray-400"
                                    placeholder="*******" />
                                {errors.password?.type === "required" && <p className="text-sm mt-1 text-red-500"><MdError className="inline" /> Password field is required.</p>}
                                {errors.password?.type === "minLength" && <p className="text-sm mt-1 text-red-500"><MdError className="inline" /> Password must be 8 characters.</p>}
                                {errors.password?.type === "maxLength" && <p className="text-sm mt-1 text-red-500"><MdError className="inline" /> Password must be less than 15 characters.</p>}

                                <span className="absolute top-4 right-4 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center">
                            <input type="checkbox" name="remember" id="remember"
                                className="text-blue-500 focus:ring-0 rounded-sm cursor-pointer" />
                            <label htmlFor="remember" className="text-gray-600 ml-3 cursor-pointer">Remember Me</label>
                        </div>
                        <Link to="#" className="text-red-500">Forgot Password</Link>
                    </div>
                    <div className="mt-4">
                        <button type="submit"
                            className="block w-full py-2 text-center text-white bg-blue-600 border border-blue-500 rounded hover:bg-transparent hover:text-blue-500 transition uppercase font-roboto font-medium">Login</button>
                    </div>
                    <p className="mt-4 text-center text-gray-600">Don&apos;t have an account? <Link to="/register" className="text-blue-500 font-bold"> Register Now</Link></p>
                </form>
            </div>
        </>
    );
};

export default Login;
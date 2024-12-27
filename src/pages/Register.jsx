import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoArrowBack } from "react-icons/io5";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const name = data.name;
            const email = data.email;
            const password = data.password;
            const user = { name, email, password };

            const res = await axios.post("https://react-interview.crd4lc.easypanel.host/api/register", user);

            if (res.status === 200) {
                navigate("/login");
            }

        } catch (error) {
            if (error.status === 422) {
                Swal.fire({
                    title: `${error.response.data.message}🙄`,
                    icon: "warning",
                });
            } else {
                console.log(error);
            }
        }
        reset();
    }

    return (
        <>
            <Link to="/" className="flex items-center border-2 m-[50px] text-white rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 p-2 w-[160px]">
                <IoArrowBack className="text-[20px]" />
                <p className="text-lg">Go Back Home</p>
            </Link>
            
            <div className="flex justify-center mb-[120px]">
                <form onSubmit={handleSubmit(onSubmit)}
                    method="post" autoComplete="off" className="w-[500px] h-[600] border-2 rounded-lg p-8 shadow-lg">
                    <h1 className="text-center text-3xl font-bold mb-8 uppercase">Create <span className="textStyle">Your Account</span></h1>
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="name" className="text-gray-600 mb-2 block">Full Name</label>
                            <input type="text"
                                {...register("name", { required: true })}
                                name="name"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm focus:outline-none rounded focus:ring-0 focus:border-blue-500 placeholder-gray-400"
                                placeholder="your name..." />
                            {errors.name && <span className="text-sm mt-1 text-red-500"><MdError className="inline" /> Name field is required.</span>}
                        </div>
                        <div>
                            <label htmlFor="email" className="text-gray-600 mb-2 block">Email</label>
                            <input type="email"
                                {...register("email", { required: true })}
                                name="email"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                                placeholder="youremail@gmail.com" />
                            {errors.email && <span className="text-sm mt-1 text-red-500"><MdError className="inline" /> Email field is required.</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
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
                    <div className="mt-6">
                        <div className="flex items-center">
                            <input type="checkbox" name="aggrement" id="aggrement"
                                className="text-blue-500 focus:ring-0 rounded-sm cursor-pointer" />
                            <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer">I have read and agree to the <a
                                href="#" className="text-red-500 font-bold">terms & conditions</a></label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button type="submit"
                            className="block w-full py-2 text-center text-white bg-blue-600 border border-blue-500 rounded hover:bg-transparent hover:text-blue-500 transition uppercase font-roboto font-medium">Create an account</button>
                    </div>
                    <p className="mt-4 text-center text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 font-bold">Login Now</Link></p>
                </form>
            </div>
        </>

    );
};

export default Register;
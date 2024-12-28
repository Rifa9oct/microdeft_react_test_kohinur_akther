import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";

const Courses = () => {
    const { auth } = useAuth();
    const { api } = useAxios();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const title = data.title;
        const description = data.description;
        const badge_text = data.badge_text;
        const badge_color = data.badge_color;
        const instructor_name = data.instructor_name;
        const course = { title, description, badge_text, badge_color, instructor_name };

        if (!auth?.token) {
            navigate("/login");
            return;
        }

        try {
            const res = await api.post(`https://react-interview.crd4lc.easypanel.host/api/course`, course);
            if (res.status === 200) {
                Swal.fire({
                    title: "Good job!",
                    text: `${res?.data?.status_message}`,
                    icon: "success"
                });
                console.log(res.data.data);
                navigate("/");
            }

        } catch (err) {
            if (err.status === 422) {
                Swal.fire({
                    title: `${err.response.data.message}😟`,
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
                <form onSubmit={handleSubmit(onSubmit)} method="post" autoComplete="off" className="w-[600px] h-[600] border-2 rounded-lg p-8 shadow-lg">
                    <h1 className="text-center text-3xl font-bold mb-8 uppercase">Create <span className="textStyle">Your Courses</span></h1>
                    <div className="space-y-2">
                        <div>
                            <label className="text-gray-600 mb-2 block mt-2 font-bold">Title</label>
                            <input type="text"
                                {...register("title", { required: true })}
                                name="title"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                                placeholder="title name" />
                            {errors.title && <span className="text-sm mt-1 text-red-500"><MdError className="inline" /> Title field is required.</span>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <label className="text-gray-600 mb-2 block mt-2 font-bold">Description</label>
                            <textarea type="text"
                                {...register("description", { required: true, maxLength: 120 })}
                                name="description" placeholder="your description" className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:outline-none focus:border-blue-500 placeholder-gray-400" />
                            {errors.description?.type === "required" && <span className="text-sm text-red-500"><MdError className="inline" /> Description field is required.</span>}
                            {errors.description?.type === "maxLength" && <p className="text-sm text-red-500"><MdError className="inline" />Description must be less than 120 characters.</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <label className="text-gray-600 mb-2 mt-2 block font-bold">Badge Text</label>
                            <input type="text"
                                {...register("badge_text", { required: true })}
                                name="badge_text"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                                placeholder="badge text" />
                            {errors.badge_text && <span className="text-sm mt-1 text-red-500"><MdError className="inline" /> Badge Text field is required.</span>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <label className="text-gray-600 mb-2 block mt-2 font-bold">Badge Color</label>
                            <input type="title"
                                {...register("badge_color", { required: true })}
                                name="badge_color"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                                placeholder="badge color" />
                            {errors.badge_color && <span className="text-sm mt-1 text-red-500"><MdError className="inline" /> Badge Color field is required.</span>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <label className="text-gray-600 mb-2 block mt-2 font-bold">Instructor Name</label>
                            <input type="title"
                                {...register("instructor_name", { required: true })}
                                name="instructor_name"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                                placeholder="instructor name" />
                            {errors.instructor_name && <span className="text-sm mt-1 text-red-500"><MdError className="inline" /> Instructor Name field is required.</span>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <button type="submit"
                            className="block w-full py-2 text-center text-white bg-blue-600 border border-blue-500 rounded hover:bg-transparent hover:text-blue-500 transition uppercase font-roboto font-medium">Create</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Courses;
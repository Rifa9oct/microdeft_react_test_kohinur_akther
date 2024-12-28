import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import CourseCard from "../components/CourseCard";

const DisplayCourses = () => {
    const { api } = useAxios();
    const [courses, setCourses] = useState();

    useEffect(() => {
        async function getCourses() {
            try {
                const res = await api.get("https://react-interview.crd4lc.easypanel.host/api/course");
                if (res.status === 200) {
                    setCourses(res?.data?.data?.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
        getCourses();

    }, [api])

    return (
        <div className="my-[120px] mx-28">
            <h1 className="text-4xl text-center font-bold font-serif">My <span className="textStyle">Courses</span></h1>

            <div className="grid grid-cols-4 justify-between mt-10">
                {
                    courses?.map(course => <CourseCard key={course.id} course={course} />)
                }
            </div>
        </div>
    );
};

export default DisplayCourses;
import { FaUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import './card.css'

const CourseCard = ({ course }) => {
    const badge_bg = {
        backgroundColor: `${course.badge_color}`
    }

    const arrow = {
        color: `${course.badge_color}`
    }

    return (
        <div className="card card_body">
            <img src={course.image} alt="course image"/>

            <div>
                <div className="badge">
                    <div className="badge1">
                        <FaUser />
                        <p>{course.instructor_name.slice(0, 12)}</p>
                    </div>

                    <p className="badge2" style={badge_bg} >{course.badge_text}</p>
                </div>
                <div className="card_des">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                </div>

                <div className="button" style={arrow}>
                    <Link to="#">
                        <button><FaArrowRight /></button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
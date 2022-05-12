import Header from "./Header";
import Content from "./Content";

const Courses = ({ courses }) =>

    <>
        {courses.map(course =>
            <ul key={course.id}>
                <Header name={course.name}/>
                <Content parts={course.parts}/>
            </ul>
        )}
    </>

export default Courses
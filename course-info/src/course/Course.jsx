import Header from './header/Header';
import Part from './parts/Part';

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            {course.parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    );
};

export default Course;
import Header from './header/Header';
import Part from './parts/Part';
import Sum from './Sum/Sum';

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            {course.parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
            <Sum parts={course.parts} />
        </div>
    );
};

export default Course;
import Header from './header/Header';
import Part from './parts/Part';

const Course = ({course}) => {

    const total = course.parts.reduce((sum,part)=>{
            return sum+part.exercises},0)


    return (
        <>
            <Header name={course.name}/>

            {course.parts.map(part=>
                <Part key={part.id} part={part}/>
            )}

            <h3>total of {total} exercises</h3>
        
        </>
    )
}

export default Course;
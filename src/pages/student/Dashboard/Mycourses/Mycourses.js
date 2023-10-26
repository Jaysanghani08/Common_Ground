import React from 'react';
import coursesData from '../../../../data/Mycourses'; // Import course data
import "./Mycourses.css";
import { color } from 'framer-motion';

const MyCourses = () => {
  return (
    <section className="main-course">
      <div className="course-box">
      <h1>My Courses</h1>
        <div className="course">
          {coursesData.map((course) => (
            <div className="box" key={course.id}>
              <h3>{course.title}</h3>
              <p>{course.progress}% - progress</p>
              <button>continue</button>
              <i className={course.icon}></i>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyCourses;

import React from 'react'
import Coursecard from "../../../CourseCard/Coursecard"
function OurCourses({ id }) {
  return (
    <>
    <div id={id}>
        <div className="heading" id='our-free-courses'>
            <h2>OUR COURSES</h2>
            <h3>Explore Our Popular Online Courses</h3>
            </div>
            <Coursecard />
            </div>
    </>
  )
}

export default OurCourses

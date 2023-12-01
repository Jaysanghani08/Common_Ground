import React from "react"
import "./courses.css"
import DevelopmentImage from "../../Images/Development.png";
import DesigningImage from "../../Images/Designing.png";
import PersonalityImage from "../../Images/Personality.png";
import DigitalMarketingImage from "../../Images/digital-marketing.png";
export const online = [
  {
    cover: DevelopmentImage,
    hoverCover: DevelopmentImage,
    courseName: "Development",
    course: "25 Courses",
  },
  {
    cover: DesigningImage,
    hoverCover: DesigningImage,
    courseName: "Designing",
    course: "25 Courses",
  },
  {
    cover: PersonalityImage,
    hoverCover: PersonalityImage,
    courseName: "Personality Development",
    course: "10 Courses",
  },
  {
    cover:  DigitalMarketingImage,
    hoverCover: DigitalMarketingImage,
    courseName: "Digital Markrting",
    course: "15 Courses",
  },
  
]
const OnlineCourses = ({id}) => {
  return (
    <>
     <div id={id}>
      <section className='online'>
        <div className='container'>
          <h2>COURSES</h2>
          <h3>Browse Our Online Courses</h3>
          <div className='content grid3'>
            {online.map((val) => (
              <div className='box'>
                <div className='img'>
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt='' className='show' />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

export default OnlineCourses

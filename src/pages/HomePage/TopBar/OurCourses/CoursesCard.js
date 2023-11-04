import React from "react"
import "./courses.css"

export const coursesCard = [
  {
    id: 1,
    coursesName: "Introducing to Software Engineering",
    courTeacher: [
      {
        dcover: "./images/back.webp",
        name: "by John Smith",
        totalTime: "50 lectures",
      },
    ],
    price: "free",
  
  },
  {
    id: 2,
    coursesName: "Enhancing Adobe Photoshop CC 2020 Skills",
    courTeacher: [
      {
        name: "by Ram Gurung",
        totalTime: "30 lectures ",
      },
    ],
    price: "free",
   
  },
  {
    id: 3,
    coursesName: "HTML, CSS, and Javascript for Web Developers",
    courTeacher: [
      {
        name: "by Saroj Nepal",
        totalTime: "50 lectures ",
      },
    ],
    price: "free",
  
  }
  
]
const CoursesCard = () => {
  return (
    <>
    <div className="container">
      <section className='coursesCard'>
        <h2>Ouer free Courses</h2>
        <div className=' grid2'>
          {coursesCard.map((val) => (
            <div className='items'>
              <div className='content flex'>
                
                <div className='text'>
                  <h1>{val.coursesName}</h1>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <label htmlFor=''>(5.0)</label>
                  </div>
                  <div className='details'>
                    {val.courTeacher.map((details) => (
                      <>
                        <div className='box'>
                          
                          <div className='para'>
                            <h4>{details.name}</h4>
                          </div>
                        </div>
                        <span>{details.totalTime}</span>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className='price'>
                <h3>
                  {val.price}
                </h3>
              </div>
              <button className='outline-btn'>ENROLL NOW !</button>
            </div>
          ))}
        </div>
      </section>
      </div>
    </>
  )
}

export default CoursesCard

import React from "react"
import "./about.css"
export const homeAbout = [
  {
    id: 1,
    cover: "https://img.icons8.com/dotty/80/000000/storytelling.png",
    title: "Course Accessibility",
    desc: "Select a suitable course from the vast area of other courses",
  },
  {
    id: 1,
    cover: "https://img.icons8.com/ios/80/000000/diploma.png",
    title: "Schedule Learning",
    desc: "Learn at whatever and whenever at your suitable time and place.",
  },
  {
    id: 1,
    cover: "https://img.icons8.com/ios/80/000000/athlete.png",
    title: "Expert Instructions",
    desc: "Hold the opportunity to learn from the industry’s expert",
  },
]


const AboutCard = ({id}) => {
  return (
    <>
    <div id={id}>
      <section className='aboutHome anotherComponent'>
        <div className='container flexSB'>
          <div className='left row'>
           
            <div className="left-text">
              <h2>Why choose</h2>
              <h2 style={{fontSize:'30px'}}>Common Ground</h2>
              <h5>Look into yourself, get something in return as your achievement.</h5>
              </div>
          </div>
          <div className='right row'>
            <div className='items'>
              {homeAbout.map((val) => {
                return (
                  <div className='item flexSB'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      </div> 
    </>
  )
}

export default AboutCard
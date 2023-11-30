import React from "react"
// import Heading from "../common/heading/Heading"
import "./about.css"
// import { homeAbout } from "../../dummydata"
// import Awrapper from "./Awrapper"
import eduactorImg from "../Images/educator.jpg"
export const homeAbout = [
  {
    id: 1,
    cover: "https://img.icons8.com/dotty/80/000000/storytelling.png",
    title: "Online Courses",
    desc: "In the vast expanse of digital learning, your knowledge and experience can shine like a beacon, reaching learners from all corners of the globe. Share your expertise through meticulously crafted online courses.",
  },
  {
    id: 1,
    cover: "https://img.icons8.com/ios/80/000000/diploma.png",
    title: "MENTORING AND GUIDANCE",
    desc: "As an educator, your role goes beyond certification. You have the power to mentor and guide students on their educational journey, helping them build knowledge, skills, and a deeper understanding of the subject matter.",
  },
  {
    id: 1,
    cover: "https://img.icons8.com/ios/80/000000/athlete.png",
    title: "LEXPERT FACILITATION",
    desc: "Your wisdom is a guiding light, illuminating the path of those hungry for knowledge. Foster an environment where students can thrive under your expert guidance.",
  },
]


const AboutCard = ({id}) => {
  return (
    <>
    <div id={id}>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='right row'>
          <div className="heading">
            <h2>ENABLE LIFELONG LEARNING</h2>
            <h3>Advantages of Sharing Your Expertise Online</h3>
            </div>
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
          <div className='left row'>
          <img src={eduactorImg } alt='' className="educator_img" />
          </div>
        </div>
      </section>
      
     </div>
    </>
  )
}

export default AboutCard
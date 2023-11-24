import React from "react"
import "./about.css"
export const homeAbout = [
  {
    id: 1,
    cover: "https://img.icons8.com/dotty/80/000000/storytelling.png",
    title: "Online Courses",
    desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
  {
    id: 1,
    cover: "https://img.icons8.com/ios/80/000000/diploma.png",
    title: "Earn A Certificates",
    desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
  {
    id: 1,
    cover: "https://img.icons8.com/ios/80/000000/athlete.png",
    title: "Learn with Expert",
    desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
]

export const awrapper = [
  {
    cover: "https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/80/ffffff/external-graduation-education-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png",
    data: "3,000",
    title: "SUCCESS STORIES",
  },

  {
    cover: "https://img.icons8.com/ios/80/ffffff/athlete.png",
    data: "320",
    title: "TRUSTED TUTORS",
  },
  {
    cover: "https://img.icons8.com/external-outline-icons-maxicons/80/ffffff/external-calender-insurance-outline-outline-icons-maxicons.png",
    data: "1,000",
    title: "SCHEDULES",
  },
  {
    cover: "https://img.icons8.com/ios/80/ffffff/macbook-idea--v3.png",
    data: "587",
    title: "COURSES",
  },
]
const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row'>
            {/* <img src='https://previews.123rf.com/images/stockgiu/stockgiu1902/stockgiu190207314/117472048-school-online-education-student-boy-with-laptop-cartoon-vector-illustration-graphic-design.jpg' alt='' /> */}
            <div className="left-text">
              <h2>Why choose</h2>
              <h2>Common Ground</h2>
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
       
    </>
  )
}

export default AboutCard
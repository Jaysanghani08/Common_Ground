import React from "react"
import "./TopBar.css"

const TopBar = () => {
  return (
    <>
      <section className='TopBar'>
        <div className='Top-container'>
          <div className='row'>
            <div className="heading">
            <h2>WELCOME TO COMMON GROUND</h2>
            <h3>Don’t limit yourself to learning</h3>
            </div>
            <p style={{width:'70%'}}>with help of E-learning, create your own path and drive on your skills on your own to achieve what you seek</p>
            {/* <div className='Top-button'>
              <button className='primary-btn'>
                GET STARTED NOW --/ <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button className='primary-btn'>
                VIEW COURSE --/ <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div> */}
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default TopBar
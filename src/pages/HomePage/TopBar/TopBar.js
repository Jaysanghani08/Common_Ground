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
            <h3>Best Online Education Expertise</h3>
            </div>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
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
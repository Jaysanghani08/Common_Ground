import React from "react";

const LoadingPage = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                Start learning today
                  <span></span>
                </h1>
                <p>Welcome to COMMON GROUND , Your gateway to a world of online lerning and knowledge. Whether you're looking to advance your career, explore new interests, or enhance your skills, our online courses and resources offer a flexible and convenient way to achieve your educational goals.</p>
                <a
                  href="#courses_main_container"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  View Courses
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoadingPage

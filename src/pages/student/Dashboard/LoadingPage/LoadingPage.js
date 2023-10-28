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
                Start learning today.
                  <span></span>
                </h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt doloribus ipsa inventore illum laboriosam numquam tempora sed consequuntur in officia quasi fuga accusantium dolores, natus omnis eos dolor molestias placeat?</p>
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

import React from 'react';
import './Error.css';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="error-container">
        <div className='er-num'>404</div>
      <div className='er-headtag'>Oops! Something went wrong.</div>
      {/* <p>We're sorry, but it seems like there was an error.</p> */}
      <p className='er-content'>The page you are looking might have been removed had its name changed or is temporary unavailable.</p>
      <Link to="/homepage">
        <button className="er-home-button">Go Back to Home</button>
      </Link>
    </div>
  );
};

export default Error;

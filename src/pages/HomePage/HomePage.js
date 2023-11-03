import React from 'react';
import TopBar from './TopBar/TopBar';
import Sidebar from '../student/Dashboard/Sidebar/Sidebar';
import StudentsAbout from './TopBar/studentsAbout'; 
import EducatorAbout from './TopBar/educatorAbout'
const HomePage = () => {
  return (
    <div>
      <Sidebar />
      <TopBar />
      <StudentsAbout />
      <EducatorAbout/>
    </div>
  );
};

export default HomePage;

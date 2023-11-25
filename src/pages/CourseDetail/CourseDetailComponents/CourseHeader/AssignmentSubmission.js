// AssignmentSubmission.jsx

import React, { useState } from 'react';
import './AssignmentSubmission.css'; // Import the CSS file
import PdfViewerModal from './PdfViewerModel'; // Import your PDF viewer modal component

const AssignmentSubmission = () => {
  const [isFileContentOpen, setIsFileContentOpen] = useState(false);

  const toggleFileContent = () => {
    setIsFileContentOpen(!isFileContentOpen);
  };

  // Dummy data (replace with actual data)
  const submissionFile = {
    fileName: 'example.pdf',
    // Add other file details as needed
  };

  const studentDetails = {
    name: 'John Doe',
    studentID: '123456',
    // Add other student details as needed
  };

  return (
    <div className="combined-view-row">
      <div className="list-container">
        <div className="list-item">
          <h3>Submission File</h3>
          <h6>File Name: {submissionFile.fileName}</h6>
          <button onClick={toggleFileContent}>
            {isFileContentOpen ? 'Close File' : 'Open File'}
          </button>
        </div>

        <div className="list-item">
          <h3>Student Details</h3>
          <h6>Name: {studentDetails.name}</h6>
          <h6>Student ID: {studentDetails.studentID}</h6>
        </div>
      </div>

      {isFileContentOpen && (
        <PdfViewerModal
          fileName={submissionFile.fileName}
          onClose={() => setIsFileContentOpen(false)}
        />
      )}
    </div>
  );
};

export default AssignmentSubmission;

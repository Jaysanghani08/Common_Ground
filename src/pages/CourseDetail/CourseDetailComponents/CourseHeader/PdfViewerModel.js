// PdfViewerModal.jsx

import React from 'react';

const PdfViewerModal = ({ fileName, onClose }) => {
  // Dummy PDF content (replace with actual PDF content)
  const pdfContent = 'This is the PDF content.';

  return (
    <div className="pdf-viewer-modal">
      <div className="modal-content">
        <h3>{fileName}</h3>
        <embed src={`data:application/pdf;base64,${btoa(pdfContent)}`} type="application/pdf" width="100%" height="500px" />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PdfViewerModal;

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { getCertificate } from '../../services/Apis';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
function CertificateDownloadButton() {

    const { courseId } = useParams()
    const handleDownloadCertificate = async () => {
        try {
            const response = await getCertificate(courseId);
            console.log(response?.data);

            // Create a blob from the response data
            const blob = new Blob([response?.data], { type: 'application/pdf' });

            // Create a download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            // link.target = "_blank";
            link.download = 'certificate.pdf';

            // Append the link to the document and trigger a click
            document.body.appendChild(link);
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);

            // Release the object URL
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error fetching the certificate:', error);
            toast.error('Error fetching the certificate.');
        }
    };

    return (
        <Button variant="outlined" color="primary" onClick={handleDownloadCertificate}>
            Download Certificate
        </Button>
    );
}

export default CertificateDownloadButton;

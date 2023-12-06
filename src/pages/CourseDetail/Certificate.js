import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { getCertificate } from '../../services/Apis';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { BACKEND_URL } from '../../services/helper';
import axios from 'axios';
import getToken from '../../services/getToken';
import Cookies from 'js-cookie';

function CertificateDownloadButton() {
    const token = Cookies.get('token');
    const { courseId } = useParams()
    const handleDownloadCertificate = async () => {
        try {
            // const response = await getCertificate(courseId);
            const response = await axios.get(`${BACKEND_URL}/student/${courseId}/certificate`, {
                'responseType': 'blob', headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response);

            // Create a blob from the response data
            const blob = new Blob([response?.data], { type: 'application/pdf' });

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.target = "_blank";
            // link.download = 'certificate.pdf';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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

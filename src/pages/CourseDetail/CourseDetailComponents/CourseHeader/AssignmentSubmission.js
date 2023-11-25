import React, { useState, useEffect } from 'react';
// import { getSubmissions } from '../../../../services/Apis';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

function SubmissionViewer({ assignmentId}) {
    const [submissions, setSubmissions] = useState([]);
    const [openPdfDialog, setOpenPdfDialog] = useState(false);
    const [pdfTitle, setPdfTitle] = useState('');
    const [pdfFile, setPdfFile] = useState(null);

    const [openSubmissionViewer, setOpenSubmissionViewer] = useState(false);

    const handleViewSubmissions = () => {
        setOpenSubmissionViewer(true);
    };

    const handleCloseSubmissionViewer = () => {
        setOpenSubmissionViewer(false);
    };

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                // const response = await getSubmissions(assignmentId);
                // setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };

        fetchSubmissions();
    }, [assignmentId]);

    const handleOpenPdfDialog = (pdfTitle, pdfFile) => {
        setPdfTitle(pdfTitle);
        setPdfFile(pdfFile);
        setOpenPdfDialog(true);
    };

    const handleClosePdfDialog = () => {
        setPdfTitle('');
        setPdfFile(null);
        setOpenPdfDialog(false);
    };


    return (
        <>
        <Button variant="outlined" color="secondary" onClick={handleViewSubmissions}>
                View Submissions
            </Button>

            <Dialog open={openSubmissionViewer} onClose={handleCloseSubmissionViewer} maxWidth="md" fullWidth>
                <DialogTitle>View Submissions</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Student ID</TableCell>
                                <TableCell>Submission Time</TableCell>
                                <TableCell>PDF File</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {submissions.map((submission) => (
                            <TableRow key={submission._id}>
                                
                                <TableCell>{submission.submittedBy.username}</TableCell>
                            
                                <TableCell>{submission.submittedBy._id}</TableCell>
                            
                                <TableCell>{new Date(submission.submissionTime).toLocaleString()}</TableCell>
                                <TableCell>
                                    {submission.submission && (
                                        <IconButton
                                            edge="end"
                                            color="inherit"
                                            onClick={() => handleOpenPdfDialog('PDF Title', submission.attachment)}
                                        >
                                            <FullscreenIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                             ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSubmissionViewer} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* PDF Dialog */}
            <Dialog
                open={openPdfDialog}
                onClose={handleClosePdfDialog}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {pdfTitle}
                        <IconButton edge="end" color="inherit" onClick={handleClosePdfDialog} aria-label="fullscreen">
                            <FullscreenExitIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {pdfFile && <iframe title="PDF Viewer" width="100%" height="100%" src={URL.createObjectURL(pdfFile)} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePdfDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SubmissionViewer;

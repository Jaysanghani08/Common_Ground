import React, { useState, useEffect } from 'react';
// import { getSubmissions } from '../../../../services/Apis';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PictureAsPdf from '@mui/icons-material/PictureAsPdf';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { gradeSubmission } from '../../../../services/Apis';
// import TextField from '@mui/material/TextField';

function TmpForGrade({assignmentId, submissionId}) {

    const [grade, setGrade] = useState('');
    const {courseId} = useParams();

    const handleSubmitGrade = async () => {
        const data = {
            "grade" : grade
        }

        const response = await gradeSubmission(courseId, assignmentId, submissionId, data);

        if(response?.status === 200){
            toast.success("Graded succesfully.")
            window.location.reload()
        }else{
            toast.error('Error in grade submission.')
        }
    }

    return (
    <>
        <TextField id="standard-basic" label="Assign Grade" variant="standard" value={grade} onChange={(e)=>setGrade(e.target.value)}/>
        <Button variant='contained' onClick={handleSubmitGrade}>Assign</Button>
    </>
    )
}

function SubmissionViewer({ assignmentId, submissions }) {
    // const [submissions, setSubmissions] = useState([]);

    console.log(submissions)
    const [openPdfDialog, setOpenPdfDialog] = useState(false);
    const [pdfTitle, setPdfTitle] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const { courseId } = useParams();
    const token = Cookies.get('token')

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
                // setSubmissions(response?.data);
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

            <Dialog open={openSubmissionViewer} onClose={handleCloseSubmissionViewer} maxWidth="md" fullWidth >
                <DialogTitle>View Submissions</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Student ID</TableCell>
                                {/* <TableCell>Submission Time</TableCell> */}
                                <TableCell>PDF File</TableCell>
                                <TableCell>Grade</TableCell>
                                <TableCell>Assign Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {submissions?.map((submission) => (
                                <TableRow key={submission._id}>

                                    <TableCell>{submission.submittedBy.username}</TableCell>

                                    <TableCell>{submission.submittedBy._id}</TableCell>

                                    {/* <TableCell>{new Date(submission.submissionTime).toLocaleString()}</TableCell> */}
                                    <TableCell>
                                        {submission.submission && (
                                            <IconButton
                                                edge="end"
                                                color="inherit"
                                                onClick={() => handleOpenPdfDialog('PDF Title', submission?.submission[0])}
                                            >
                                                <PictureAsPdf />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                    <TableCell>{submission.grade}</TableCell>
                                    <TableCell>
                                        <TmpForGrade assignmentId={assignmentId} submissionId={submission?._id}/>
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
                fullScreen={true}
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
                    {pdfFile && <iframe title="PDF Viewer" width="100%" height="100%" src={`https://common-ground-9kqv.onrender.com/file/retrieve?courseId=${courseId}&path=${pdfFile}&jwt=${token}`} />}
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

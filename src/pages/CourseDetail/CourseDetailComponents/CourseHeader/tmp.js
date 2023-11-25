import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify'
import { SubmitAssignment, DeleteAssignmentSubmission } from '../../../../services/Apis';
import { useParams } from 'react-router-dom';
import { AttachmentOutlined } from '@mui/icons-material';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
// import getToken from '../../../../services/getToken';
import Cookies from 'js-cookie';


export default function FormDialog({ assignmentId, submissionId, deadline, submissiondata, isSubmitted, createdby, usertype, isEnrolled }) {
    const token = Cookies.get('token')
    const [open, setOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const { courseId } = useParams();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFiles(file);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            "submission": selectedFiles
        }

        console.log(data)
        try {
            const response = await SubmitAssignment(courseId, assignmentId, data);
            console.log(response)
            if (response?.status === 201) {
                toast.success('Assignment submitted successfully');
                window.location.reload()
            } else {
                toast.error('Error submitting assignment');
            }
        } catch (error) {
            console.error('Error submitting assignment:', error);
            toast.error('Error submitting assignment');
        }

        handleClose();
    };

    const handleDeleteSubmission = async () => {
        try {
            const response = await DeleteAssignmentSubmission(courseId, submissionId);
            console.log(response);

            if (response?.status === 200) {
                toast.success('Assignment submission deleted successfully');
                window.location.reload()
            } else {
                toast.error('Error deleting assignment submission');
            }
        } catch (error) {
            console.error('Error deleting assignment submission:', error);
            toast.error('Error deleting assignment submission');
        }

        handleClose();
    };

    const handleOpenSubmissionForm = () => {
        const submissionDeadline = new Date(deadline).getTime();
        const currentTime = new Date().getTime();

        if (submissionDeadline > currentTime) {
            setOpen(true);
        } else {
            toast.error('Submission deadline has passed');
        }
    };

    const [openSubmissionDialog, setOpenSubmissionDialog] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleFullScreen = () => {
        setFullScreen(!fullScreen);
    };

    const handleOpenAssignmentDialog = () => {
        if ((usertype === 'student' && isEnrolled && isSubmitted)) {
            setOpenSubmissionDialog(true)
        }
        else {
            setOpenSubmissionDialog(false)
            toast.error("You are not enrolled in this course")
        }
    };

    const handleCloseAssignmentDialog = () => {
        setOpenSubmissionDialog(false);
    };

    // const link = 

    return (
        <React.Fragment>
            {
                (usertype === 'student' && isEnrolled && !isSubmitted) &&
                <>
                    <Button style={{ fontWeight: "600" }} variant="outlined" onClick={handleOpenSubmissionForm}>
                        Submit Assignment
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Submit your response
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Select file"
                                type="file"
                                onChange={handleFileChange}
                                fullWidth
                                variant="standard"
                            />
                            <DialogContentText>
                                <ul>
                                    <li>{selectedFiles?.name}</li>
                                </ul>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }



            {
                (usertype === 'student' && isEnrolled && isSubmitted) &&
                <>
                <h5>Your Submission</h5>
                    <IconButton onClick={handleOpenAssignmentDialog}>
                        <AttachmentOutlined style={{ fontSize: '25px' }} />
                        <span>
                            File
                        {/* {submissiondata[0]?.submission[0]?.split('/')?.pop()?.match(/\/\/(.+?\.PDF)/i)?.at(1)} */}
                        </span>
                    </IconButton>

                    <Dialog
                        open={openSubmissionDialog}
                        onClose={handleCloseAssignmentDialog}
                        fullScreen={fullScreenDialog || fullScreen}
                        classes={{ paper: 'custom-paper' }}
                    >
                        <DialogTitle>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {submissiondata[0].submission[0].match(/\/ASSIGNMENTS\/(.+?\.PDF)/i)[1]}
                                <IconButton edge="end" color="inherit" onClick={toggleFullScreen} aria-label="fullscreen">
                                    {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                                </IconButton>
                            </div>
                        </DialogTitle>
                        <DialogContent className="custom-dialog-content">
                            {/* {link} */}
                            <iframe title="Assignment Viewer" width="100%" height="100%" src={`http://localhost:8000/file/retrieve?courseId=${courseId}&path=${submissiondata[0].submission[0]}&jwt=${token}`} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseAssignmentDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>




                    <Button style={{ fontWeight: "600" }} variant="outlined" color="error" onClick={handleDeleteSubmission}>
                        Delete Submission
                    </Button>
                </>
            }
        </React.Fragment>
    );
}

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

export default function FormDialog({ assignmentId, submissionId, deadline, submissiondata, isSubmitted, createdby, usertype, isEnrolled }) {

    // console.log(assignmentId)
    console.log(submissionId)
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

    return (
        <React.Fragment>
            {
                (usertype === 'student' && isEnrolled && !isSubmitted) &&
                <>
                    <Button style={{fontWeight:"600"}} variant="outlined" onClick={handleOpenSubmissionForm}>
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
                <Button style={{fontWeight:"600"}} variant="outlined" color="error" onClick={handleDeleteSubmission}>
                    Delete Submission
                </Button>
            }
        </React.Fragment>
    );
}

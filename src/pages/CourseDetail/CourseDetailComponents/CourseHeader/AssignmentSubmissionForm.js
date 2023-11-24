// AssignmentSubmissionForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { SubmitAssignment, DeleteAssignmentSubmission } from '../../../../services/Apis';

function AssignmentSubmissionForm({ courseId, assignmentId, submissionId, deadline }) {
    const [submissionData, setSubmissionData] = useState('');
    const [openSubmissionForm, setOpenSubmissionForm] = useState(false);

    const handleInputChange = (e) => {
        setSubmissionData(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await SubmitAssignment(courseId, assignmentId, submissionData);

            if (response?.status === 200) {
                toast.success('Assignment submitted successfully');
                onSubmit(submissionData); 
            } else {
                toast.error('Error submitting assignment');
            }
        } catch (error) {
            console.error('Error submitting assignment:', error);
            toast.error('Error submitting assignment');
        }

        onClose();
    };

    const handleDeleteSubmission = async () => {
        try {
            const response = await DeleteAssignmentSubmission(submissionId);

            if (response?.status === 200) {
                toast.success('Assignment submission deleted successfully');
                onSubmit(null);
            } else {
                toast.error('Error deleting assignment submission');
            }
        } catch (error) {
            console.error('Error deleting assignment submission:', error);
            toast.error('Error deleting assignment submission');
        }

        onClose();
    };

    const handleOpenSubmissionForm = () => {
        const submissionDeadline = new Date(deadline).getTime();
        const currentTime = new Date().getTime();

        if (submissionDeadline > currentTime) {
            setOpenSubmissionForm(true);
        } else {
            toast.error('Submission deadline has passed');
        }
    };

    const handleCloseSubmissionForm = () => {
        setOpenSubmissionForm(false);
    };

    const onSubmit = (data) => {
    
        console.log('Submission data:', data);
    };

    const onClose = () => {
        setOpenSubmissionForm(false);
    };

    return (
        <>
            <Dialog open={openSubmissionForm} onClose={onClose}>
                <DialogTitle>Submit Assignment</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Submission Data"
                            variant="outlined"
                            fullWidth
                            value={submissionData}
                            onChange={handleInputChange}
                        />
                        <DialogActions>
                            <Button type="submit" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button onClick={handleDeleteSubmission} color="secondary">
                                Delete Submission
                            </Button>
                            <Button onClick={onClose} color="default">
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Button variant="outlined" color="primary" onClick={handleOpenSubmissionForm}>
                Submit Assignment
            </Button>
        </>
    );
}

AssignmentSubmissionForm.propTypes = {
    courseId: PropTypes.string.isRequired,
    assignmentId: PropTypes.string.isRequired,
    submissionId: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
};

export default AssignmentSubmissionForm;
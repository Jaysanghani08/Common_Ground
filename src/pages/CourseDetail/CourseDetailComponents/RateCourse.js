import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import { RateCourse } from '../../../services/Apis';

function RateCourseDialog({ courseId }) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event, newRating) => {
        setRating(newRating);
    };

    const handleRateCourse = async () => {
        try {
            const response = await RateCourse(courseId, { rating });

            if (response?.status === 200) {
                toast.success('Course rated successfully');
                handleClose();
            } else {
                toast.error('Error rating the course');
            }
        } catch (error) {
            console.error('Error rating the course:', error);
            toast.error('Error rating the course');
        }
    };

    const handleOpenRateDialog = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button  color="primary" onClick={handleOpenRateDialog}>
                Rate Course
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Rate the Course</DialogTitle>
                <DialogContent>
                    <div>
                        <Rating
                            name="course-rating"
                            value={rating}
                            precision={0.5}
                            onChange={handleRatingChange}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={handleRateCourse} color="primary">
                        Rate
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

RateCourseDialog.propTypes = {
    courseId: PropTypes.string.isRequired,
};

export default RateCourseDialog;

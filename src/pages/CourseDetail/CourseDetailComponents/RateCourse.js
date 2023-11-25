import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { RateCourse } from '../../../services/Apis';
import StarIcon from '@mui/icons-material/Star'; 
import { Button } from '@mui/material';
import { useParams } from "react-router-dom";

const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
};

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

function RateCourseDialog() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const {courseId} = useParams()


  const handleRateCourse = async () => {
    const data = {
        "rating" :rating,
        "comment" : "ankd"
    }
    try {
      const response = await RateCourse(courseId, data);
        console.log(response);
      if (response?.status === 200) {
        toast.success('Course rated successfully');
      } else {
        toast.error('Error rating the course');
      }
    } catch (error) {
      console.error('Error rating the course:', error);
      toast.error('Error rating the course');
    }
  };

  return (
    <div>
          <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={rating}
        precision={0.5} 
        getLabelText={getLabelText}
        onChange={(event, newRating) => {
          setRating(newRating);
        }}
        // onChangeActive={(event, newHover) => {
        //   setHover(newHover);
        // }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        style={{ marginTop: '10px' }}
      />
      {rating !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
      )}
    </Box>
        <Button variant="contained" color="primary" onClick={handleRateCourse}>
        Rate Course
      </Button>
      
    </div>
  );
}

RateCourseDialog.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default RateCourseDialog;

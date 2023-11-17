import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import TextField from '@mui/material/TextField';
function CourseContent(props) {
  const { description } = props;
  return (
    <div>
      {/* Render course content here */}
      <h5>{description}</h5>
    </div>
  );
}

CourseContent.propTypes = {
  content: PropTypes.node,
};



// AssignmentEditForm component
function AssignmentEditForm({ open, onClose, onEditSubmit, initialData }) {
  const [editedData, setEditedData] = useState(initialData);

  const handleEditPostNameChange = (e) => {
    setEditedData({
      ...editedData,
      title: e.target.value,
    });
  };

  const handleEditInputChange = (e) => {
    setEditedData({
      ...editedData,
      description: e.target.value,
    });
  };

  const handleEditDeadlineChange = (date) => {
    setEditedData({
      ...editedData,
      deadline: date.toISOString(), 
    });
  };

  const handlePdfFileChange = (e) => {
    
    console.log('PDF file uploaded:', e.target.files[0]);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    onEditSubmit(editedData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Assignment</DialogTitle>
      <DialogContent>
        <form onSubmit={handleEditFormSubmit}>
          <TextField
            label="Assignment Title"
            variant="outlined"
            fullWidth
            value={editedData.title}
            onChange={handleEditPostNameChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={editedData.description}
            onChange={handleEditInputChange}
          />
         <TextField
            label="Deadline"
            type="datetime-local"
            variant="outlined"
            fullWidth
            value={editedData.deadline}
            onChange={(e) => handleEditDeadlineChange(new Date(e.target.value))}
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfFileChange}
          />
          <DialogActions>
            <Button type="submit" color="primary">
              Save
            </Button>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

AssignmentEditForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onEditSubmit: PropTypes.func,
  initialData: PropTypes.object,
};


export function Assigments(props) {
  const { title, description, assignmentLink, AssignmentTitle, deadline } = props;
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(deadline));
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleOpenAssignmentDialog = () => {
    setOpenAssignmentDialog(true);
  };

  const handleCloseAssignmentDialog = () => {
    setOpenAssignmentDialog(false);
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  const theme = useTheme();
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(deadline));
    }, 1000);

 
    return () => clearInterval(intervalId);
  }, [deadline]);

  function calculateTimeRemaining(endTime) {
    const deadlineTime = new Date(endTime).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = deadlineTime - currentTime;

    if (timeDifference <= 0) {
      // Deadline 
      return 'Deadline has passed';
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const handleOpenEditForm = () => {
    setOpenEditForm(true);
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  };

  const handleEditSubmit = (editedData) => {
    
    console.log('Edit submission:', editedData);
    handleCloseEditForm();
  };

  const handleDelete = () => {
  
    console.log('Delete action');
    handleCloseAssignmentDialog();
  };


  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <CourseContent description={description} />
          <ul>
            {assignmentLink.map((link, index) => (
              <li key={index}>
                <IconButton onClick={handleOpenAssignmentDialog}>
                  <AssignmentIcon style={{ fontSize: '25px' }} />
                </IconButton>
                <a href={link}>{AssignmentTitle[index]}</a>
              </li>
            ))}
          </ul>

          {deadline && (
            <div>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }} >Deadline: {formatDeadline(deadline)}</Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '8px' }} >Time remaining: {timeRemaining}</Typography>
            </div>
          )}
        </div>


        
        {/* Edit and Delete Buttons */}
        <div style={{ marginTop: '16px' }}>
            <Button variant="outlined" color="primary" onClick={handleOpenEditForm}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        


        {/* Assignment Dialog */}
        <Dialog
          open={openAssignmentDialog}
          onClose={handleCloseAssignmentDialog}
          fullScreen={fullScreenDialog || fullScreen}
          classes={{ paper: 'custom-paper' }}
        >
          <DialogTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {AssignmentTitle} - Assignment
              <IconButton edge="end" color="inherit" onClick={toggleFullScreen} aria-label="fullscreen">
                {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent className="custom-dialog-content">
            <iframe title="Assignment Viewer" width="100%" height="100%" src={assignmentLink} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAssignmentDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Form */}
        <AssignmentEditForm
          open={openEditForm}
          onClose={handleCloseEditForm}
          onEditSubmit={handleEditSubmit}
          initialData={{
            title,
            description,
            deadline,
            // Add other fields you want to edit
          }}
        />
      </AccordionDetails>
    </Accordion>
  );

  function formatDeadline(deadline) {
    const formattedDeadline = new Date(deadline).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return formattedDeadline;
  }

}

Assigments.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node,
  assignmentLink: PropTypes.arrayOf(PropTypes.string),
  AssignmentTitle: PropTypes.arrayOf(PropTypes.string),
  deadline: PropTypes.string,
};

export default Assigments;

import React, { useState } from 'react';
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
import { useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
// import './Assigments.css';

function CourseContent(props) {
  const { content } = props;
  return (
    <div>
      {/* Render course content here */}
      <h5>{content}</h5>
    </div>
  );
}

CourseContent.propTypes = {
  content: PropTypes.node,
};

export function Assigments(props) {
  const { title, content, assignmentLink, AssignmentTitle } = props;
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

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
          <CourseContent content={content} />
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
      </AccordionDetails>
    </Accordion>
  );
}

Assigments.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  assignmentLink: PropTypes.string,
  AssignmentTitle: PropTypes.string,
};

export default Assigments;

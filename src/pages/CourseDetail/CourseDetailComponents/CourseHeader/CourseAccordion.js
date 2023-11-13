import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useMediaQuery, useTheme } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import TextField from '@mui/material/TextField';

const VideoStreamingComponent = ({ videoLink }) => (
    <video width="100%" height="100%" controls>
      <source src={videoLink} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
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
  
  export function CourseAccordion(props) {
    // console.log("Data" : props);
    console.log('Props:', props);

    const {
      content,
      pdfLink,
      assignmentLink,
      pdfTitle,
      AssignmentTitle,
      VideoTitle,
      videoLink,
      postName,
    } = props;
  
    const [expanded, setExpanded] = useState(false);
    const [openPdfDialog, setOpenPdfDialog] = useState(false);
    const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [openVideoDialog, setOpenVideoDialog] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
  
    const toggleContent = () => {
      setExpanded(!expanded);
    };
  
    const handleOpenPdfDialog = () => {
      setOpenPdfDialog(true);
    };
  
    const handleClosePdfDialog = () => {
      setOpenPdfDialog(false);
    };
  
    const handleOpenAssignmentDialog = () => {
      setOpenAssignmentDialog(true);
    };
  
    const handleOpenVideoDialog = () => {
      setOpenVideoDialog(true);
    };
  
    const handleCloseVideoDialog = () => {
      setOpenVideoDialog(false);
    };
  
    const handleCloseAssignmentDialog = () => {
      setOpenAssignmentDialog(false);
    };
  
    const toggleFullScreen = () => {
      setFullScreen(!fullScreen);
    };
  
    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));
  

    const [editedContent, setEditedContent] = useState(content);
    const [editedPostName, setEditedPostName] = useState(postName);
    const [editedPdfFile, setEditedPdfFile] = useState(null);
    const [editedVideoFile, setEditedVideoFile] = useState(null);

    const handleEditFormOpen = () => {
      setEditedContent(content);
      setEditedPdfFile(null); // Add this line if you're using file input for PDF
      setEditedVideoFile(null); // Add this line if you're using file input for video
      setOpenEditForm(true);
    };
    

  const handleEditFormClose = () => {
    setOpenEditForm(false);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for editing
    // Update the main content with the edited data
    // ...
    // Close the edit form
    props.editContent(editedContent,editedPostName);
    // props.editPostName(editedPostName);

    setOpenEditForm(false);
  };

  const handleEditInputChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleEditPostNameChange = (e) => {
    setEditedPostName(e.target.value);
  };

  const handlePdfFileChange = (e) => {
    const file = e.target.files[0];
    setEditedPdfFile(file);
  };
  
  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    setEditedVideoFile(file);
  };
  

  // Logic for deleting content
  const handleDelete = () => {
    // Handle delete logic
    // You might want to show a confirmation dialog before deleting
    // ...
    props.deleteContent();
  };
    return (
      <div>
        <IconButton onClick={toggleContent} style={{ color: 'blue' }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          {expanded ? 'Hide Post' : 'Show Post'}- {postName}
        </IconButton>
        {expanded && (
          <div>
            <CourseContent content={content} />
            <div>
            <Button onClick={handleEditFormOpen}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
            <ul>
              <li>
                <IconButton onClick={handleOpenPdfDialog}>
                  <PictureAsPdfIcon style={{ fontSize: '25px' }} />
                </IconButton>
                <a href={pdfLink}>PDF Material</a>
              </li>
              <li>
              <IconButton onClick={handleOpenVideoDialog}>
              <VideoLibraryIcon style={{ fontSize: '25px' }} />
                   </IconButton>
                    <a href={videoLink}>Video</a>
              </li>
            </ul>
          </div>
        )}
        

 {/* Edit Form Dialog */}
 <Dialog open={openEditForm} onClose={handleEditFormClose}>
        <DialogTitle>Edit Content</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditFormSubmit}>

          <TextField
              label="Post Name"
              variant="outlined"
              fullWidth
              value={editedPostName}
              onChange={handleEditPostNameChange}
            />

            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              value={editedContent}
              onChange={handleEditInputChange}
            />
            <input
                type="file"
                accept=".pdf"
                onChange={handlePdfFileChange}
              />
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
              />
             
            <DialogActions>
              <Button type="submit" color="primary">
                Save
              </Button>
              <Button onClick={handleEditFormClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>


         {/* PDF */}
            <Dialog
                open={openPdfDialog}
                onClose={handleClosePdfDialog}
                fullScreen={fullScreenDialog || fullScreen} // Set full screen
                classes={{ paper: 'custom-paper' }}
            >
                <DialogTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {pdfTitle}
                        <IconButton edge="end" color="inherit" onClick={toggleFullScreen} aria-label="fullscreen">
                            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent className="custom-dialog-content">
                  {editedPdfFile && <iframe title="PDF Viewer" width="100%" height="100%" src={URL.createObjectURL(editedPdfFile)} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePdfDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Video Streaming Dialog */}
           <Dialog
                open={openVideoDialog}
                onClose={handleCloseVideoDialog}
                fullScreen={fullScreenDialog || fullScreen}
                classes={{ paper: 'custom-paper' }}
            >
                <DialogTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {VideoTitle}
                        <IconButton edge="end" color="inherit" onClick={toggleFullScreen} aria-label="fullscreen">
                            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </IconButton>
                    </div>
                </DialogTitle>
                {/* Replace the iframe with your video streaming component */}
                <DialogContent className="custom-dialog-content">
                  {editedVideoFile && <VideoStreamingComponent videoLink={URL.createObjectURL(editedVideoFile)} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseVideoDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

CourseAccordion.propTypes = {
    content: PropTypes.node,
    postName: PropTypes.string.isRequired,
    pdfLink: PropTypes.string,
    assignmentLink: PropTypes.string,
    pdfTitle: PropTypes.string,
    AssignmentTitle: PropTypes.string,
    videoLink: PropTypes.string,
    VideoTitle: PropTypes.string,
  };

export default CourseAccordion;

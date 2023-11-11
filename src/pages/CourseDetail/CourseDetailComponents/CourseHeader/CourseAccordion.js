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
import "./CourseAccordion.css";
function CourseContent(props) {
    const { content } = props;
    return (
        <div>
            {/* Render course content here */}
            {/* <Typography variant="h5">Course Content</Typography> */}
            <h5>{content}</h5>
        </div>
    );
}

CourseContent.propTypes = {
    content: PropTypes.node,
};

export function CourseAccordion(props) {
    console.log(props)  
    const { content, pdfLink="/vgnn", assignmentLink={}, pdfTitle="hjhjb", AssignmentTitle={} } = props;
    const [expanded, setExpanded] = useState(false);
    const [openPdfDialog, setOpenPdfDialog] = useState(false);
    const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

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

    const handleCloseAssignmentDialog = () => {
        setOpenAssignmentDialog(false);
    };

    const toggleFullScreen = () => {
        setFullScreen(!fullScreen);
    };

    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className='accordion'>
            <IconButton onClick={toggleContent} style={{ color: 'blue' }}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {content.title}
            </IconButton>
            {expanded && (
                <div>
                    <CourseContent content={content.body} />
                    <ul>
                        <li>
                            <IconButton onClick={handleOpenPdfDialog}>
                                <PictureAsPdfIcon style={{ fontSize: '25px' }} />
                            PDF Material
                            </IconButton>
                        </li>
                    </ul>
                </div>
            )}

            <Dialog
                open={openPdfDialog}
                onClose={handleClosePdfDialog}
                fullScreen={fullScreenDialog || fullScreen}
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
                    <iframe title="PDF Viewer" width="100%" height="100%" src={pdfLink} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePdfDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Assignment Dialog */}
            {/* <Dialog
                open={openAssignmentDialog}
                onClose={handleCloseAssignmentDialog}
                fullScreen={fullScreenDialog || fullScreen} // Set full screen
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
            </Dialog> */}
        </div>
    );
}

CourseAccordion.propTypes = {
    content: PropTypes.node,
    pdfLink: PropTypes.string,
    assignmentLink: PropTypes.string,
    pdfTitle:PropTypes.string,
    AssignmentTitle:PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.node),
};

export default CourseAccordion;

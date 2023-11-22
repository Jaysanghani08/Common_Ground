import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
import { useParams } from 'react-router-dom';
import { deletePost, editPost } from './../../../../services/Apis';
import { toast } from 'react-toastify';
import getToken from '../../../../services/getToken';

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
    const { post, sectionId, content, pdfLink, assignmentLink, pdfTitle, AssignmentTitle, postName, createdby, usertype, isEnrolled } = props;
    // console.log(post)
    const [expanded, setExpanded] = useState(false);
    const [openPdfDialog, setOpenPdfDialog] = useState(false);
    const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [openVideoDialog, setOpenVideoDialog] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);

    const { courseId } = useParams();

    const toggleContent = () => {
        setExpanded(!expanded);
    };

    const handleOpenPdfDialog = () => {
        if ((usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled)) {
            setOpenPdfDialog(true)
        }
        else {
            setOpenPdfDialog(false)
            toast.error("You are not enrolled in this course")
        }
    };

    const handleClosePdfDialog = () => {
        setOpenPdfDialog(false);
    };

    const handleOpenAssignmentDialog = () => {
        setOpenAssignmentDialog(true);
    };

    const handleOpenVideoDialog = () => {
        if ((usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled)) {
            setOpenVideoDialog(true)
        }
        else {
            setOpenVideoDialog(false)
            toast.error("You are not enrolled in this course")
        }
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


    const [editedContent, setEditedContent] = useState(post.body);
    const [editedPostName, setEditedPostName] = useState(post.title);
    const [editedPdfFile, setEditedPdfFile] = useState(null);
    const [editedVideoFile, setEditedVideoFile] = useState(null);

    const handleEditFormOpen = () => {
        setEditedContent(post.body);
        setEditedPdfFile(null); // Add this line if you're using file input for PDF
        setEditedVideoFile(null); // Add this line if you're using file input for video
        setOpenEditForm(true);
    };

    const handleEditFormClose = () => {
        setOpenEditForm(false);
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("title", editedPostName);
        data.append("body", editedContent);

        const edited = await editPost({ courseId, sectionId, postId: post._id, newData: data });
        // console.log(edited)

        if (edited?.status === 200) {
            toast.success("Post Edited Successfully");
            window.location.reload();
        } else {
            toast.error("Error Editing Post");
        }
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
    const handleDelete = async () => {
        const deleted = await deletePost({ courseId, sectionId, postId: post._id });
        // console.log(deleted)

        if (deleted?.status === 200) {
            toast.success("Post Deleted Successfully");
            window.location.reload();
        } else {
            toast.error("Error Deleting Post");
        }

    };
    return (
        <div>
            <IconButton onClick={toggleContent} style={{ color: 'blue' }}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {post.title}
            </IconButton>
            {expanded && (
                <div>
                    <CourseContent content={content} />
                    <h4 style={{
                        filter: (usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled) ? 'none' : 'blur(5px)',
                        userSelect: (usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled) ? 'auto' : 'none',
                        pointerEvents: (usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled) ? 'auto' : 'none',

                    }}>
                        {post.body}</h4>

                    {
                        usertype === 'educator' && getToken('educator')?.userId === createdby &&
                        <div>
                            <Button onClick={handleEditFormOpen}>Edit</Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </div>
                    }
                    <ul>
                        <li>
                            <IconButton onClick={handleOpenPdfDialog}>
                                <PictureAsPdfIcon style={{ fontSize: '25px' }} />
                                <span style={{
                                    filter: (usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled) ? 'none' : 'blur(5px)',
                                    userSelect: (usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled) ? 'auto' : 'none',
                                    pointerEvents: (usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled) ? 'auto' : 'none',

                                }}>
                                    {"title"} {/* Change this with the title of the PDF */}
                                </span>
                            </IconButton>
                        </li>
                        <li>
                            <IconButton onClick={handleOpenVideoDialog}>
                                <VideoLibraryIcon style={{ fontSize: '25px' }} />
                                <span style={{
                                    filter: (usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled) ? 'none' : 'blur(5px)',
                                    userSelect: (usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled) ? 'auto' : 'none',
                                    pointerEvents: (usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled) ? 'auto' : 'none',

                                }}>
                                    {"title"} {/* Change this with the title of the PDF */}
                                </span>
                            </IconButton>
                        </li>
                    </ul>
                </div>
            )
            }


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
                        {/* <input
                type="file"
                accept=".pdf"
                onChange={handlePdfFileChange}
              />
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
              /> */}

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
                        {"VideoTitle"}
                        <IconButton edge="end" color="inherit" onClick={toggleFullScreen} aria-label="fullscreen">
                            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </IconButton>
                    </div>
                </DialogTitle>
                {/* Replace the iframe with your video streaming component */}
                <DialogContent className="custom-dialog-content">
                    {/* Your video streaming component goes here */}
                    <VideoStreamingComponent videoLink={"videoLink"} />
                </DialogContent>
                <DialogActions>
                    {
                        <Button onClick={handleCloseVideoDialog} color="primary">
                            Close
                        </Button>}
                </DialogActions>
            </Dialog>
        </div >
    );
}

CourseAccordion.propTypes = {
    content: PropTypes.node,
    postName: PropTypes.string,
    pdfLink: PropTypes.string,
    assignmentLink: PropTypes.string,
    pdfTitle: PropTypes.string,
    AssignmentTitle: PropTypes.string,
    videoLink: PropTypes.string,
    VideoTitle: PropTypes.string,
};

export default CourseAccordion;

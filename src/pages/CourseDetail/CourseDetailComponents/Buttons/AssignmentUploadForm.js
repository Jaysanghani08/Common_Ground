import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useMediaQuery, useTheme } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './video_and_pdf_button.css';
import { toast } from 'react-toastify';
import { createAssignment } from '../../../../services/Apis';
import { useParams } from 'react-router-dom';

const AssignmentUploadForm = ({ sectionId }) => {
    const { courseId } = useParams();
    const [selectedFile, setSelectedFile] = useState();
    const [openPdfDialog, setOpenPdfDialog] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpenPdfDialog = () => {
        setOpenPdfDialog(true);
    };

    const handleClosePdfDialog = () => {
        setOpenPdfDialog(false);
    };

    const toggleFullScreen = () => {
        setFullScreen(!fullScreen);
    };

    const [formData, setFormData] = useState({
        title: '',
        deadline: '',
    });

    // //console.log(formData);

    const handle_Change = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files;
        setSelectedFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    
        const data = new FormData();
        data.append('title', formData.title);
        data.append('dueDate', formData.deadline);
        data.append('description', 'fisesufjsefsdbdsufsd');
        for (let i = 0; i < selectedFile.length; i++) {
            data.append('attachments', selectedFile[i]);
        }
        // //console.log(data)

        if (!formData.title) {
            toast.error('Enter Assignment Title');
        } else if (!formData.deadline) {
            toast.error('Enter Assignment Deadline');
        } else if (!selectedFile) {
            toast.error('Upload Assignment (PDF)');
        } else {
            const newAssignment = await createAssignment(courseId, data);

            if (newAssignment?.status === 201) {
                toast.success('Assignment created successfully');
                handleClosePdfDialog();
                window.location.reload(true);
            } else {
                toast.error('Something went wrong');
            }
        }

    };

    return (
        <>
            <Button variant="contained" onClick={handleOpenPdfDialog}>
                Add Assignment
            </Button>
            <Dialog
                open={openPdfDialog}
                onClose={handleClosePdfDialog}
                fullScreen={fullScreenDialog || fullScreen}
                classes={{ paper: 'custom-paper' }}
            >
                <DialogTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button variant="contained" edge="end" color="inherit" onClick={toggleFullScreen} aria-label="fullscreen">
                            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent className="custom-dialog-content">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <div className="bn-main-button">
                            <div className="bn-section-name">
                                <TextField
                                    id="outlined-basic"
                                    label="Assignment Title"
                                    variant="outlined"
                                    value={formData.title}
                                    name="title"
                                    onChange={handle_Change}
                                />
                            </div>
                            <div className="bn-section-description">

                                <TextField
                                    id="outlined-basic"
                                    label="Assignment Deadline"
                                    variant="outlined"
                                    type="datetime-local"
                                    value={formData.deadline}
                                    name="deadline"
                                    onChange={handle_Change}
                                />
                            </div>
                            <div>
                                <div>
                                    <label className="assignment-pdf">PDF File:</label>
                                    <div className="assignment-pdf">
                                        <input
                                            type="file"
                                            name="attachment"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            multiple
                                        />
                                    </div>
                                </div>
                                <div className="bn-submit-button">
                                    <Button onClick={handleSubmit} variant="contained">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePdfDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AssignmentUploadForm;

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
import './button.css'
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import { createSection } from '../../../../services/Apis';
import { useLocation, useParams } from 'react-router-dom';


export default function BasicTextFields() {

    // const [courseID, setCourseID] = useState(courseId)

    const { courseId } = useParams();

    // //console.log(courseId)
    const [openPdfDialog, setOpenPdfDialog] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);

    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpenPdfDialog = () => {
        setOpenPdfDialog(true);
    };

    const handleClosePdfDialog = () => {
        setOpenPdfDialog(false);
    };

    const handleOpenAssignmentDialog = () => {
        setOpenAssignmentDialog(true);
    };

    const toggleFullScreen = () => {
        setFullScreen(!fullScreen);
    };

    const [formData, setFormData] = useState({
        title: '',
    });

    const handle_Change = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // setCourseID(courseId)
    };
    // //console.log(formData);

    const handle_Submit = async (e) => {
        // e.preventDefault();

        if (!formData.title) {
            toast.error('Please enter section name')
            return
        }

        if (!courseId) {
            toast.error('Course ID is not defined')
            return
        }

        const response = await createSection(courseId, formData);
        // //console.log(response);
        if (response?.message === "Section created") {
            toast.success('Section created successfully')
            // setCourseID(courseId)
            handleClosePdfDialog();
            window.location.reload(true);
        }
        else {
            toast.error('Something went wrong')
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpenPdfDialog}>
                Add Section
            </Button>
            <Dialog
                open={openPdfDialog}
                onClose={handleClosePdfDialog}
                fullScreen={fullScreenDialog || fullScreen}
                classes={{ paper: 'custom-paper' }}
            >

                <DialogTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Button edge="end" color="inherit" onClick={toggleFullScreen} aria-label="fullscreen">
                            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />} Add Section
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
                        <form>
                            
                            <div className="bn-main-button">
                                
                                <div className="bn-section-name">
                                    <TextField id="outlined-basic" label="SectionName" variant="outlined" value={formData.name} name="title" onChange={handle_Change} />
                                </div>
                                {/* <div className="bn-section-description">
                                    <TextField id="outlined-basic" label="SectionDiscription" variant="outlined" value={formData.description} name='description' onChange={handle_Change} />
                                </div> */}
                                <div className="bn-submit-button">
                                    <Button variant="contained" onClick={handle_Submit}>Submit</Button>
                                </div>
                            </div>
                        </form>

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
}

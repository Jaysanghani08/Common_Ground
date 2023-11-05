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
import './video_and_pdf_button.css'

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

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

const handleCloseAssignmentDialog = () => {
    setOpenAssignmentDialog(false);
};

const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
};

const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handle_Change = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handle_Submit = (e) => {
    e.preventDefault();
    const apiUrl = 'https://6517e4a9582f58d62d353374.mockapi.io/anand';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data sent to the API:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
    }
  };

  return (
    <>
    <Button variant="contained" onClick={handleOpenPdfDialog}>
    Add Post
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
    <form onSubmit={handle_Submit}>
    <div className="bn-main-button">
    <div className="bn-section-name">
      <TextField  id="outlined-basic" label="PostName" variant="outlined" value={formData.name} name="name" onChange={handle_Change}/>
      </div>
      <div className="bn-section-description">
      <TextField  id="outlined-basic" label="PostDiscription" variant="outlined"  value={formData.description} name='description' onChange={handle_Change}/>
      </div>
      
    <div >
      <form onSubmit={handleSubmit}>
        <div >
          <label className="post-pdf">PDF File:</label>
          <div className="post-pdf">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          </div>
         
        </div>
        <div >
          <label className="post-video">Video File:</label>
          <div className="post-video">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
          />
          </div>
          
        </div>

      <div className="bn-submit-button">
      <Button variant="contained" >Submit</Button>
      </div>
        
      </form>
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

   
};

export default FileUploadForm;

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


export default function BasicTextFields({ sections, setSections }) {

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
    console.log('Form submitted!');
    const apiUrl = 'https://6517e4a9582f58d62d353374.mockapi.io/anand';
    console.log('Data to be submitted:', formData);
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSections([...sections, {
          title: "Ankur", // Assuming 'name' is the title of the section
          details: "yess", // Assuming 'description' is the details of the section
          pdfLink: [], // You can set the initial values as needed
          pdfTitle: [],
          assignmentLink: [],
          AssignmentTitle: [],
          content: [],
          
      }]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
    <form onSubmit={(e) => handle_Submit(e)}>
    <div className="bn-main-button">
       <div className="bn-section-name">
      <TextField  id="outlined-basic" label="SectionName" variant="outlined" value={formData.name} name="name" onChange={handle_Change}/>
      </div>
      <div className="bn-section-description">
      <TextField  id="outlined-basic" label="SectionDiscription" variant="outlined"  value={formData.description} name='description' onChange={handle_Change}/>
      </div>
      <div className="bn-submit-button">
      <Button variant="contained" onClick={(e) => handle_Submit(e)} >Submit</Button>
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

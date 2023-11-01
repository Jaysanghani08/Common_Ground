import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
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
import './TabMenu.css';

Dialog.propTypes = {
    open: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool,
    children: PropTypes.node,
};
function CustomAccordion(props) {
    const { title, pdfLink, assignmentLink, details, AssignmentTitle, pdfTitle} = props;


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


    return (
        <Accordion style={{ margin: '10px 0' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="primary">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <h5>{details}</h5>
                </div>
                <ul>
                    <li>
                        <IconButton onClick={handleOpenPdfDialog}>
                            <PictureAsPdfIcon style={{ fontSize: '25px' }} />
                        </IconButton>
                        <a href={pdfLink}>PDF Material</a>
                    </li>
                    <li>
                        <IconButton onClick={handleOpenAssignmentDialog}>
                            <AssignmentIcon style={{ fontSize: '25px' }} />
                        </IconButton>
                        <a href={assignmentLink}>Assignment</a>
                    </li>
                </ul>

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
                        <iframe
                            title="PDF Viewer"
                            width="100%"
                            height="100%"
                            src={pdfLink}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePdfDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

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
                        <Typography>
                            <iframe
                                title="PDF Viewer"
                                width="100%"
                                height="100%"
                                src={assignmentLink}
                            />
                        </Typography>
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

CustomAccordion.propTypes = {
    title: PropTypes.string.isRequired,
    pdfLink: PropTypes.string.isRequired,
    assignmentLink: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography color={'gray'}>
                        <CustomAccordion
                            title="Week 1"
                            pdfLink="https://mrcet.com/downloads/digital_notes/CSE/III%20Year/COMPUTER%20NETWORKS%20NOTES.pdf"
                            pdfTitle="Matrial-1"
                            assignmentLink="link-to-assignment-1"
                            AssignmentTitle="Networks"
                            details="This is the details for Week 1."
                        />
                        <CustomAccordion
                            title="Week 2"
                            pdfLink="link-to-pdf-2"
                            pdfTitle="Matrial-2"
                            assignmentLink="link-to-assignment-2"
                            details="This is the details for Week 2."
                        />
                        <CustomAccordion
                            title="Week 3"
                            pdfLink="https://mrcet.com/downloads/digital_notes/CSE/III%20Year/COMPUTER%20NETWORKS%20NOTES.pdf"
                            pdfTitle="Matrial-3"
                            assignmentLink="link-to-assignment-3"
                            details="This is the details for Week 3."
                        />
                        <CustomAccordion
                            title="Week 4"
                            pdfLink="https://mrcet.com/downloads/digital_notes/CSE/III%20Year/COMPUTER%20NETWORKS%20NOTES.pdf"
                            pdfTitle="Matrial-4"
                            assignmentLink="link-to-assignment-4"
                            details="This is the details for Week 4."
                        />
                        {/* Add more */}
                    </Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                Item One
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
        </Box>
    );
}

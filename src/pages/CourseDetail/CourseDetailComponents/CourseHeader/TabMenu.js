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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useMediaQuery, useTheme } from '@mui/material';
import './TabMenu.css';
import { handleAddPost, handleDeletePost, handleEditPost, } from './../../../../services/Apis';
import CourseAccordion from './CourseAccordion';
import FileUploadForm from '../Buttons/video_and_pdf_button';
import DicussionForum from "../DicussionForum/DicussionForum";
import BasicTextFields from "../Buttons/button"
import Assignments from './Assignments';
import StudentList from './StudentList';
import { deleteSection, editSection } from './../../../../services/Apis';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AssignmentUploadForm from '../Buttons/AssignmentUploadForm';
import getToken from '../../../../services/getToken';

Dialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool,
    children: PropTypes.node,
};

function CustomAccordion(props) {
    const { index, title, content, sectionId, usertype, createdby, isEnrolled } = props;

    const { courseId } = useParams();

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [fullScreen, setFullScreen] = useState(false);
    const theme = useTheme();
    const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleFullScreen = () => {
        setFullScreen(!fullScreen);
    };

    const [formData, setFormData] = useState({
        title: '',
    });

    const handleOpenPdfDialog = () => {
        setEditDialogOpen(true);
    };

    const handleCloseEditSectionDialog = () => {
        setEditDialogOpen(false);
    };

    const handleEditSection = () => {
        setEditDialogOpen(true);
    };

    const handle_Change = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // setCourseID(courseId)
    };
    // console.log(formData);

    const handleEditSectionSubmit = async (e) => {
        // e.preventDefault();

        if (!formData.title) {
            toast.error('Please enter section name')
            return
        }

        if (!courseId) {
            toast.error('Course ID is not defined')
            return
        }

        const response = await editSection(courseId, sectionId, formData);
        // console.log(response);
        if (response?.status === 201) {
            toast.success('Section edited successfully')
            // setCourseID(courseId)
            handleCloseEditSectionDialog();
            window.location.reload(true);
        }
        else {
            toast.error('Something went wrong')
        }
    };


    const handleDeleteSection = async () => {
        const deleted = await deleteSection(courseId, sectionId);
        if (deleted?.status === 201) {
            toast.success("Section deleted Successfully.")
            window.location.reload(true);
        }
        else {
            toast.error("Somthing went wrong.")
        }
    };


    return (
        <Accordion style={{ margin: '10px 0' }} className='accordion'>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

                {/* title of accordian */}
                <Typography color="primary" style={{ fontSize: '18px' }}>{title}</Typography>

                {/* edit and delete sections */}
                {
                    usertype === 'educator' && getToken('educator')?.userId === createdby &&
                    <div >
                        <Button variant="outlined" onClick={handleEditSection} >Edit</Button>
                        <Button variant="outlined" onClick={handleDeleteSection}>Delete</Button>
                    </div>
                }
            </AccordionSummary>

            <Dialog
                open={editDialogOpen}
                onClose={handleCloseEditSectionDialog}
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
                                    <Button variant="contained" onClick={handleEditSectionSubmit}>Submit</Button>
                                </div>
                            </div>
                        </form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditSectionDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <AccordionDetails>
                <div>
                    {content && content.map((post, courseIndex) => (
                        <CourseAccordion
                            createdby={createdby}
                            usertype={usertype}
                            isEnrolled={isEnrolled}
                            sectionId={sectionId}
                            key={courseIndex}
                            post={post}
                        />
                    ))}
                </div>
                {
                    usertype === 'educator' && getToken('educator')?.userId === createdby &&
                    <FileUploadForm sectionId={sectionId} />
                }
            </AccordionDetails>
        </Accordion>
    );
}

CustomAccordion.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string, // Change 'description' to 'details'
    pdfFiles: PropTypes.string,
    assignmentFilespdfFiles: PropTypes.string,
    pdfTitle: PropTypes.arrayOf(PropTypes.string),
    AssignmentTitle: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.arrayOf(PropTypes.string),
    posts: PropTypes.node,
    editSection: PropTypes.func.isRequired,
    deleteSection: PropTypes.func.isRequired,
    usertype: PropTypes.string.isRequired,
    createdby: PropTypes.string.isRequired,
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
                        {children}
                        {/* Add more CustomAccordion components for different weeks */}
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

export default function BasicTabs({ sections, courseAssignments, enrolledStudents, discussionData, usertype, createdby, isEnrolled }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const students = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        // Add more students as needed
    ];

    const editSection = (index, editedTitle) => {

        const handleAddAssignment = (newAssignment) => {
            setAssignments([...assignments, newAssignment]);
            toast.success('Assignment added successfully');
        };
    };

    const deleteSection = (index) => {

    };

    const [assignments, setAssignments] = useState([]);

    return (


        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ backgroundColor: 'white' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ color: '#fff' }}>
                        <Tab style={{ fontSize: '18px' }} label="SECTIONS" {...a11yProps(0)} />
                        <Tab style={{ fontSize: '18px' }} label="ASSIGNMENTS" {...a11yProps(1)} />
                        {
                            ((usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled))
                            && <Tab style={{ fontSize: '18px' }} label="DISCUSSIONFORUM" {...a11yProps(2)} />
                        }
                        {
                            (usertype === 'educator' && getToken('educator')?.userId === createdby) &&
                            <Tab style={{ fontSize: '18px' }} label="STUDENTS" {...a11yProps(3)} />
                        }
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    {sections && sections.map((section, index) => (
                        <CustomAccordion
                            isEnrolled={isEnrolled}
                            createdby={createdby}
                            usertype={usertype}
                            key={index}
                            sectionId={section._id}
                            index={index}
                            title={section.title}
                            editSection={editSection}
                            deleteSection={deleteSection}
                            content={section.posts}
                        />
                    ))}
                    {
                        usertype === 'educator' && getToken('educator')?.userId === createdby &&
                        <BasicTextFields />
                    }
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1} >
                    {
                        courseAssignments &&
                        courseAssignments.map((assignment, index) => (
                            <Assignments
                                isEnrolled={isEnrolled}
                                createdby={createdby}
                                usertype={usertype}
                                key={index}
                                // assignmentdata={assignment}
                                submissiondata={assignment.submission}
                                // isSubmitted={true}
                                title={assignment.title}
                                description={assignment.description}
                                deadline={assignment.dueDate}
                                assignmentLink={assignment.attachment}
                                assignmentId={assignment._id}
                            // AssignmentTitle={assignment.AssignmentTitle}
                            />
                        ))
                    }

                    {
                        usertype === 'educator' && getToken('educator')?.userId === createdby &&
                        <AssignmentUploadForm />
                    }
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    {
                        ((usertype === 'educator' && getToken('educator')?.userId === createdby) || (usertype === 'student' && isEnrolled))
                        && <div className="dicussion-forum">
                            <DicussionForum data={discussionData} usertype={usertype} createdby={createdby} isEnrolled={isEnrolled} />
                        </div>
                    }
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    {/* <h2>STUDENTS</h2> */}
                    {(usertype === 'educator' && getToken('educator')?.userId === createdby) ?
                        <StudentList students={enrolledStudents} />
                        : <h4 style={{ color: "white" }}>You are not authorized to see this content. </h4>
                    }
                </CustomTabPanel>
            </Box>
        </div>
    );
}
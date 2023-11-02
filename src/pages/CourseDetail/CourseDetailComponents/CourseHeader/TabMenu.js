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
import './TabMenu.css';
import CourseAccordion from './CourseAccordion';

Dialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool,
    children: PropTypes.node,
};

function CustomAccordion(props) {
    const { title, pdfLink, assignmentLink, details, AssignmentTitle, pdfTitle, content, posts } = props;

    return (
        <Accordion style={{ margin: '10px 0' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="primary">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <h5>{details}</h5>
                </div>
                <div>
                    {content.map((course, index) => (
                        <CourseAccordion
                            key={index}
                            content={course}
                            pdfTitle={pdfTitle[index]} 
                            AssignmentTitle={AssignmentTitle[index]} 
                            pdfLink={pdfLink[index]} 
                            assignmentLink={assignmentLink[index]} 
                        />
                    ))}
                </div>
                {posts}
            </AccordionDetails>
        </Accordion>
    );
}

CustomAccordion.propTypes = {
    title: PropTypes.string.isRequired,
    pdfLink: PropTypes.string.isRequired,
    assignmentLink: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    pdfTitle: PropTypes.arrayOf(PropTypes.string), 
    AssignmentTitle: PropTypes.arrayOf(PropTypes.string), 
    content: PropTypes.arrayOf(PropTypes.string), 
    posts: PropTypes.node,
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
                            pdfLink={["link-to-pdf-1","link-to-pdf-2"]}
                            pdfTitle={["Matrial-1", "Matrial-2"]} 
                            assignmentLink={["link-to-assignment-1", "link-to-assignment-2"]} 
                            AssignmentTitle={["Assignment 1", "Assignment 2"]} 
                            details="This is the details for Week 1."
                            content={[
                                'Course content goes here 1.1',
                                'Course content goes here 1.2',
                            ]}
                        />
                        <CustomAccordion
                            title="Week 2"
                            pdfLink={["link-to-pdf-1","link-to-pdf-2","link-to-pdf-3"]}
                            pdfTitle={["Matrial-1", "Matrial-2","Matrial-3"]} 
                            assignmentLink={["link-to-assignment-1", "link-to-assignment-2" , "link-to-assignment-3"]} 
                            AssignmentTitle={["Assignment 1", "Assignment 2","Assignment 3"]} 
                            details="This is the details for Week 2."
                            content={[
                                'Course content goes here 2.1',
                                'Course content goes here 2.2',
                                'Course content goes here 2.3',
                            ]}
                        />
                        <CustomAccordion
                            title="Week 3"
                            pdfLink={["link-to-pdf-1"]}
                            pdfTitle={["Matrial-1"]} 
                            assignmentLink={["link-to-assignment-1"]} 
                            AssignmentTitle={["Assignment 1"]} 
                            details="This is the details for Week 3."
                            content={[
                                'Course content goes here 3.1'
                            ]}
                        />
                        <CustomAccordion
                            title="Week 4"
                            pdfLink={["link-to-pdf-1","link-to-pdf-2","link-to-pdf-3","link-to-pdf-4"]}
                            pdfTitle={["Matrial-1", "Matrial-2","Matrial-3","Matrial-4"]} // Example array of pdf titles
                            assignmentLink={["link-to-assignment-1", "link-to-assignment-2" , "link-to-assignment-3","link-to-assignment-4"]} // Example array of assignment links
                            AssignmentTitle={["Assignment 1", "Assignment 2","Assignment 3","Assignment 4"]} // Example array of assignment titles
                            details="This is the details for Week 4."
                            content={[
                                'Course content goes here 4.1',
                                'Course content goes here 4.2',
                                'Course content goes here 4.3',
                                'Course content goes here 4.4',
                            ]}  
                        />
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

import * as React from 'react';
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
import './TabMenu.css';

function CustomAccordion(props) {
    const { title, pdfLink, assignmentLink, details } = props;

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
                        <IconButton>
                            <PictureAsPdfIcon style={{fontSize:"25px"}} />
                        </IconButton>
                        <a href={pdfLink}>PDF Material</a>
                    </li>
                    <li>
                        <IconButton>
                            <AssignmentIcon style={{fontSize:"25px"}} />
                        </IconButton>
                        <a href={assignmentLink}>Assignment</a>
                    </li>
                </ul>
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
                    <Typography color={"gray"}>
                        <CustomAccordion
                            title="Week 1"
                            pdfLink="link-to-pdf-1"
                            assignmentLink="link-to-assignment-1"
                            details="This is the details for Week 1."
                        />
                        <CustomAccordion
                            title="Week 2"
                            pdfLink="link-to-pdf-2"
                            assignmentLink="link-to-assignment-2"
                            details="This is the details for Week 2."
                        />
                        <CustomAccordion
                            title="Week 3"
                            pdfLink="link-to-pdf-3"
                            assignmentLink="link-to-assignment-3"
                            details="This is the details for Week 3."
                        />
                        {/* Add more accordions here */}
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
    const [value, setValue] = React.useState(0);

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

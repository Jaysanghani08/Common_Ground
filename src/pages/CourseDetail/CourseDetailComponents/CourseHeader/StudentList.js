import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';

function StudentList(props) {
    const { students } = props;
  
    if (!students || students.length === 0) {
      return <p>No students available.</p>;
    }
  
    return (
      <List >
        {students.map((student, index) => (
          <ListItem key={index} button  style={{ backgroundColor: 'white' }}>
            <ListItemIcon>
            <PersonIcon style={{ fontSize: '30px' }} />
            </ListItemIcon>
            <ListItemText primary={student.name} secondary={`ID: ${student.id}`} style={{ fontSize: '30px' }}  />
          </ListItem>
        ))}
      </List>
    );
  }
  
StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StudentList;

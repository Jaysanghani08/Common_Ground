import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import { PersonRemove } from '@mui/icons-material';
import { removeStudent } from '../../../../services/Apis';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function StudentList(props) {

    const { students } = props;
    const {courseId} = useParams();

    if (!students || students.length === 0) {
        return <p>No students enrolled.</p>;
    }

    const handleRemoveStudent = async (studentId) => {
        const removed = await removeStudent({courseId, studentId});
        console.log(removed)

        if(removed?.status === 200){
            toast.success("Student removed successfully");
            window.location.reload();
        }
        else{
            toast.error("Error removing student");
        }
    }

    return (
        <List style={{ fontSize: '30px' }}>
            {students.map((student, index) => (
                <ListItem key={index} button style={{ backgroundColor: 'white' }}>
                    <ListItemIcon>
                        <PersonIcon style={{ fontSize: '30px' }} />
                    </ListItemIcon>
                    <ListItemText primary={student.username} secondary={`ID: ${student._id}`} style={{ fontSize: '30px' }} />
                    <PersonRemove style={{ fontSize: '30px' }} onClick={() => handleRemoveStudent(student._id)} />
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

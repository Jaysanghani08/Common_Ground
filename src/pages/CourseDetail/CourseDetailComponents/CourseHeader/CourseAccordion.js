import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ForumIcon from '@mui/icons-material/Forum'; // Icon for Course Posts
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function CourseContent(props) {
    const { content } = props;
    return (
        <div>
            {/* Render course content here */}
            <Typography variant="h5">Course Content</Typography>
            <h5>{content}</h5>
        </div>
    );
}

CourseContent.propTypes = {
    content: PropTypes.node,
};

export function CourseAccordion(props) {
    const { content, posts } = props;
    const [expanded, setExpanded] = useState(false);
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const toggleContent = () => {
        setExpanded(!expanded);
    };

    const togglePostDialog = (post) => {
        setSelectedPost(post);
        setOpenPostDialog(!openPostDialog);
    };

    return (
        <div>
            <IconButton onClick={toggleContent} style={{ color: 'blue' }}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {expanded ? 'Hide Content' : 'Show Content'}
            </IconButton>
            {expanded && (
                <div>
                    <CourseContent content={content} />
                    {posts.map((post, index) => (
                        <div key={index}>
                            <IconButton onClick={() => togglePostDialog(post)} style={{ color: 'blue' }}>
                                {/* <ForumIcon /> */}
                                {`Show Post ${index + 1}`}
                            </IconButton>
                        </div>
                    ))}
                </div>
            )}
            {openPostDialog && selectedPost && (
                <Dialog open={openPostDialog} onClose={togglePostDialog} fullWidth maxWidth="md">
                    <DialogTitle>Course Post</DialogTitle>
                    <DialogContent>
                        {/* Render the selected post here */}
                        <Typography variant="body1">{selectedPost}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={togglePostDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}

CourseAccordion.propTypes = {
    content: PropTypes.node,
    posts: PropTypes.arrayOf(PropTypes.node),
}

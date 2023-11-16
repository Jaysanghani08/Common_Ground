import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./DicussionForm";
import "./DicussionForum.css";
import {
    getComments,
    createComment,
    updateComment,
    deleteComment,
} from "./ComentsApi"; // Import the API functions

const Comments = ({ currentUserId }) => {
    const [comments, setComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);

    const createNewComment = (text) => {
        createComment(text, currentUserId, "Ankur")
            .then((newComment) => {
                setComments([newComment, ...comments]);
            })
            .catch((error) => {
                console.error("Error creating comment: ", error);
            });
    };

    const updateCommentText = (text, commentId) => {
        updateComment(text, commentId)
            .then((updatedComment) => {
                setComments((prevComments) => {
                    const updatedComments = prevComments.map((comment) =>
                        comment.id === updatedComment.id ? updatedComment : comment
                    );
                    // Move the updated comment to the front
                    return [updatedComment, ...updatedComments.filter((comment) => comment.id !== updatedComment.id)];
                });
                setActiveComment(null);
            })
            .catch((error) => {
                console.error("Error updating comment: ", error);
            });
    };

    const deleteCommentById = (commentId) => {
        if (window.confirm("Are you sure you want to remove this comment?")) {
            deleteComment(commentId)
                .then(() => {
                    setComments((prevComments) =>
                        prevComments.filter((comment) => comment.id !== commentId).reverse()
                    );
                    setActiveComment(null);
                })
                .catch((error) => {
                    console.error("Error deleting comment: ", error);
                });
        }
    };

    useEffect(() => {
        getComments()
            .then((data) => {
                setComments(data.reverse()); // Reverse to display newest comments first
            })
            .catch((error) => {
                console.error("Error fetching comments: ", error);
            });
    }, []);

    return (
        <div className="comments">
            <h3 className="comments-title">Discussion Forum</h3>
            <CommentForm submitLabel="Write" handleSubmit={createNewComment} />
            <div className="comments-container">
                {comments
                    .filter((comment) => !comment.parentId)
                    .map((rootComment) => (
                        <Comment
                            key={rootComment.id}
                            comment={rootComment}
                            setActiveComment={setActiveComment}
                            activeComment={activeComment}
                            updateComment={updateCommentText}
                            deleteComment={deleteCommentById}
                            currentUserId={currentUserId}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Comments;

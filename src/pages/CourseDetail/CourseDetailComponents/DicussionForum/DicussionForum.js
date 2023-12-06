import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./DicussionForm";
import "./DicussionForum.css";
import { useParams } from "react-router-dom";
import {
    createComment,
    updateComment,
    deleteComment,
} from "./ComentsApi"; // Import the API functions
import { toast } from "react-toastify";

const DicussionForum = ({ data,  usertype, createdby, isEnrolled }) => {
    const [comments, setComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);

    const {courseId} = useParams()

    const createNewComment = async (text) => {
        const data = {
            message: text,
        };

        const cc = await createComment(courseId, usertype, data);
        //console.log(cc);
        if(cc?.status === 201){
            toast.success("Comment created successfully")
            window.location.reload()
        }
        else{
            toast.error("Error in creating comment")
        }
    };

    const updateCommentText = (text, commentId) => {
        updateComment(courseId, text, commentId)
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
            deleteComment(courseId, commentId)
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

    return (
        <div className="comments" >
            <div className="comments-container">
                <h3 className="comments-title">Discussion Forum</h3>
                {data?.map((rootComment) => (
                        <Comment
                        key={rootComment._id}
                        comment={rootComment}
                        setActiveComment={setActiveComment}
                        activeComment={activeComment}
                        currentUserId={rootComment.createdByEducator?._id || rootComment.createdByStudent?._id}
                        usertype={usertype}
                        createdby={createdby}
                        isEnrolled={isEnrolled}
                    />
                    ))}
                     
                <CommentForm submitLabel="Write" handleSubmit={createNewComment} />
            </div>
        </div>
    );
};

export default DicussionForum;

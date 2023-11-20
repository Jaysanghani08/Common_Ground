import { FaUser } from "react-icons/fa";
import CommentForm from "./DicussionForm";
import "./DicussionForum.css";

// Update Comment component
const Comment = ({
    comment,
    setActiveComment,
    activeComment,
    updateComment,
    deleteComment,
    currentUserId,
    userType,
    courseId,
}) => {
    const isEditing =
        activeComment &&
        activeComment.id === comment._id &&
        activeComment.type === "editing";
    const canDelete = currentUserId === comment.createdByStudent || currentUserId === comment.createdByEducator;
    const canEdit = currentUserId === comment.createdByStudent || currentUserId === comment.createdByEducator;

    return (
        <div key={comment._id} className="comment">
            <div className="comment-image-container">
                <FaUser />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.createdByStudent || comment.createdByEducator}</div>
                    <div>{new Date(comment.dateCreated).toLocaleDateString()}</div>
                </div>
                {!isEditing && <div className="comment-text">{comment.message}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.message}
                        handleSubmit={(text) => updateComment(courseId, text, comment._id)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}
                <div className="comment-actions edit">
                    {canEdit && !isEditing && (
                        <div
                            className="comment-action"
                            onClick={() =>
                                setActiveComment({ id: comment._id, type: "editing" })
                            }
                        >
                            Edit
                        </div>
                    )}
                    {canDelete && (
                        <div
                            className="comment-action"
                            onClick={() => deleteComment(courseId, comment._id)}
                        >
                            Delete
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;

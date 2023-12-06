import { FaUser } from "react-icons/fa";
import CommentForm from "./DicussionForm";
import "./DicussionForum.css";
import { toast } from "react-toastify";
import { updateComment, deleteComment } from "./ComentsApi"; // Import the API functions
import { useParams } from "react-router-dom";
import getToken from '../../../../services/getToken'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@mui/material";
const Comment = ({ comment, setActiveComment, activeComment, currentUserId, usertype, createdby, isEnrolled }) => {

    // console.log(currentUserId)
    // console.log(usertype)
    // console.log(createdby)
    // console.log(isEnrolled)

    const isEditing =
        activeComment &&
        activeComment.id === comment._id &&
        activeComment.type === "editing";
    const canDelete = ((usertype === 'educator' && getToken('educator')?.userId === comment.createdByEducator?._id) || (usertype === 'student' && isEnrolled && getToken('student')?.userId === comment.createdByStudent?._id))
    const canEdit = ((usertype === 'educator' && getToken('educator')?.userId === comment.createdByEducator?._id) || (usertype === 'student' && isEnrolled && getToken('student')?.userId === comment.createdByStudent?._id))
    const { courseId } = useParams()

    const handleUpdate = async (text, commentid) => {
        const data = {
            message: text,
        };
        const updated = await updateComment(courseId, commentid, usertype, data);

        if (updated?.status === 200) {
            toast.success("Comment updated successfully")
            window.location.reload()
        }
        else {
            toast.error("Error in updating comment")
        }
    }

    const handleDelete = async (commentId) => {
        const updated = await deleteComment(courseId, commentId, usertype);

        if (updated?.status === 200) {
            toast.success("Comment deleted successfully")
            window.location.reload()
        }
        else {
            toast.error("Error in updating comment")
        }
    }

    return (
        <div key={comment._id} className="comment">
            <div className="comment-image-container">
                <FaUser />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div style={{display:'flex'}}>
                    <div className="comment-author">{
                        comment.createdByStudent ?
                            `${comment.createdByStudent?.lname} ${comment.createdByStudent?.fname}`
                            : `${comment.createdByEducator?.fname} ${comment.createdByEducator?.lname}`
                    }
                    </div>
                    <div className="comment-date">{new Date(comment.dateCreated).toLocaleDateString()}</div>
                    </div>
                    
                    <div className="comment-actions edit">
                    {canEdit && !isEditing && (
                        <div
                            className="comment-action"
                            onClick={() =>
                                setActiveComment({ id: comment._id, type: "editing" })
                            }
                        >
                            <Button  >
                            <FontAwesomeIcon icon={faEdit} style={{fontSize:'15px'}} />
                         </Button>
                            
                        </div>
                    )}
                    {canDelete && (
                        <div
                            className="comment-action"
                            onClick={() => handleDelete(comment._id)}
                        >
                            <Button  >
                            <FontAwesomeIcon icon={faTrash} style={{fontSize:'15px'}} />
                         </Button>
                            
                           
                        </div>
                    )}
                </div>
                </div>
                {!isEditing && <div className="comment-text">{comment.message}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.message}
                        handleSubmit={(text) => handleUpdate(text, comment._id)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}
                
            </div>
        </div>
    );
};

export default Comment;

// CommentForm.js

import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faPaperPlane, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@mui/material";
const DicussionForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
}) => {
    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0;

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="div-button">
            <textarea
                className="comment-form-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write Comment here"
                style={{backgroundolor: '#4a6a93b2'}}
            />
            <Button type="submit" disabled={isTextareaDisabled}>
            {submitLabel === 'Submit' ? (
                <>
                <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '20px' }} />
                </>
            ) : (
                <>
                <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '20px' }} />
                </>
            )}
            </Button>

            </div>
            {hasCancelButton && (
                <Button
                    
                    onClick={handleCancel}
                >
                    <FontAwesomeIcon icon={faTimes} style={{fontSize:'20px'}} />
                </Button>
            )}
        </form>
    );
};

export default DicussionForm;

import React, { FC, FocusEventHandler, ChangeEventHandler, useState } from 'react';

const NoteItem: FC<Note> = props => {
    const { text } = props;
    const [newText, setNewText] = useState(text);

    const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setNewText(e.target.value);
    };

    const onBlur: FocusEventHandler<HTMLDivElement> = (event) => {
        console.log('Update note!!')
    }

    return (
        <div className="noteItem" onBlur={onBlur} >
            <textarea className="noteEditor" value={newText} onChange={onTextChange}/> 
        </div>
    );
};

export default NoteItem;
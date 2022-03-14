import React, { FC, FocusEventHandler, ChangeEventHandler, useState, useLayoutEffect, useRef } from 'react';
import { noteColors } from '../const';

const NoteItem: FC<Note> = props => {
    const { text, color = 'yellow' } = props;
    const [newText, setNewText] = useState(text);
    let noteItemRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const noteItem = noteItemRef.current;

        if (!noteItem) return;

        const { backgroundColor, borderColor } = noteColors[color];

        noteItem.style.backgroundColor = backgroundColor;
        noteItem.style.borderColor = borderColor;
    }, []);

    const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setNewText(e.target.value);
    };

    const onBlur: FocusEventHandler<HTMLDivElement> = (event) => {
        console.log('Update note!!')
    }

    return (
        <div className="noteItem" onBlur={onBlur} ref={noteItemRef}>
            <textarea className="noteEditor" value={newText} onChange={onTextChange}/> 
        </div>
    );
};

export default NoteItem;
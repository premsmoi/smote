import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, FocusEventHandler, ChangeEventHandler, useState, useLayoutEffect, useRef } from 'react';
import { noteColors } from '../../const';

interface Props extends Note {
    onDelete: (noteId:string) => void
}

const NoteItem: FC<Props> = props => {
    const { noteId, text, color = 'yellow', onDelete } = props;
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

    const handleDeleteNote = () => {
        onDelete(noteId);
    }

    return (
        <div className="noteItem" onBlur={onBlur} ref={noteItemRef}>
            <div className="header">
                <FontAwesomeIcon className="deleteNoteButton" icon={faXmark} onClick={handleDeleteNote} /></div>
            <textarea className="noteEditor" value={newText} onChange={onTextChange}/> 
        </div>
    );
};

export default NoteItem;
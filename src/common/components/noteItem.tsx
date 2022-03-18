import React, { FC, FocusEventHandler, ChangeEventHandler, useState, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { noteColors } from '../../const';

interface Props {
    note: Note;
    onDelete: (noteId: string) => void;
    onUpdate: (note: Note) => void;
}

const NoteItem: FC<Props> = props => {
    const { note, onDelete, onUpdate } = props;
    const { noteId, text, color = 'yellow' } = note;
    const [newText, setNewText] = useState(text);
    let noteItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const noteItem = noteItemRef.current;

        if (!noteItem) return;

        const { backgroundColor, borderColor } = noteColors[color];

        noteItem.style.backgroundColor = backgroundColor;
        noteItem.style.borderColor = borderColor;
    }, []);

    const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setNewText(e.target.value);
    };

    const onBlur: FocusEventHandler<HTMLDivElement> = () => {
        note.text = newText;
        onUpdate(note);
    }

    const handleDeleteNote = () => {
        onDelete(noteId);
    }

    return (
        <div className="noteItem" onBlur={onBlur} ref={noteItemRef}>
            <div className="header">
                <IconButton className="deleteNoteButton" onClick={handleDeleteNote}>
                    <CloseIcon />
                </IconButton>
            </div>
            <textarea className="noteEditor" value={newText} onChange={onTextChange}/> 
        </div>
    );
};

export default NoteItem;
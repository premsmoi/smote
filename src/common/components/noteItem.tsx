import React, { FC, FocusEventHandler, ChangeEventHandler, useState, useRef, useLayoutEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { noteColors } from '../../const';
import { DragEventHandler } from 'react';

const NOTE_WIDTH = 200;
const NOTE_HEIGHT = 200;

interface Props {
    note: Note;
    isActive?: boolean;
    onDelete: (noteId: string) => void;
    onUpdate: (note: Note) => void;
};

const NoteItem: FC<Props> = props => {
    const { note, isActive, onDelete, onUpdate } = props;
    const { noteId, text, x, y, color = 'yellow' } = note;
    const [newText, setNewText] = useState(text);
    const [isDragging, setIsDragging] = useState(false);
    let noteItemRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const noteItem = noteItemRef.current;

        if (!noteItem) return;

        const { backgroundColor, borderColor } = noteColors[color];

        noteItem.style.backgroundColor = backgroundColor;
        noteItem.style.borderColor = borderColor;
    }, []);

    const handleUpdateNote = (note: Note) => {
        note.updatedTime = Date.now();
        onUpdate(note);
    };

    const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setNewText(e.target.value);
    };

    const onBlur: FocusEventHandler<HTMLDivElement> = () => {
        if (note.text === newText) return;

        note.text = newText;
        handleUpdateNote(note);
    };

    const handleDeleteNote = () => {
        onDelete(noteId);
    };

    const onDragStart: DragEventHandler = (e) => {
        const dragNoteData: DragNoteData = {
            noteId,
            offsetX: e.clientX - x,
            offsetY: e.clientY - y
        };

        const noteItem = noteItemRef.current;

        if (!noteItem) return;

        noteItem.classList.add('hide');

        e.dataTransfer.setData('dragNoteData', JSON.stringify(dragNoteData));
    };

    const onDragEnd: DragEventHandler = (e) => {
        setIsDragging(false);

        const noteItem = noteItemRef.current;

        if (!noteItem) return;

        noteItem.classList.remove('hide');
    };

    const onClick = () => {
        if (isActive) return;

        handleUpdateNote(note);
    };

    return (
        <div
            className="noteItem"
            ref={noteItemRef}
            style={{ width: NOTE_WIDTH, height: NOTE_HEIGHT, top: y, left: x}}
            onDragStart={onDragStart}
            onBlur={onBlur}
            onDragEnd={onDragEnd}
            onClick={onClick}
            draggable={isDragging}
        >
            <div className="header">
                <div className="moveNoteArea" onMouseDown={() => setIsDragging(true)}></div>
                <IconButton className="deleteNoteButton" onClick={handleDeleteNote}>
                    <CloseIcon />
                </IconButton>
            </div>
            <textarea className="noteEditor" value={newText} onChange={onTextChange}/> 
        </div>
    );
};

export default NoteItem;
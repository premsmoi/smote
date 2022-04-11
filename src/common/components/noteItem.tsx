import React, { FC, FocusEventHandler, ChangeEventHandler, useState, useRef, useLayoutEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { noteColors } from '../../const';
import { DragEventHandler } from 'react';

const NOTE_WIDTH = 200;
const NOTE_HEIGHT = 200;

interface Props {
    note: Note;
    isActive?: boolean;
    onDelete: (noteId: string) => void;
    onUpdate: (note: Note) => Promise<any>;
};

const NoteItem: FC<Props> = props => {
    const { note, isActive, onDelete, onUpdate } = props;
    const { noteId, text, x, y } = note;
    const [newText, setNewText] = useState(text);
    const [color, setColor] = useState(note.color || 'yellow');
    const [isDragging, setIsDragging] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    let noteItemRef = useRef<HTMLDivElement>(null);
    let colorPickerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const noteItem = noteItemRef.current;

        if (!noteItem) return;

        const { backgroundColor, borderColor } = noteColors[color];

        noteItem.style.backgroundColor = backgroundColor;
        noteItem.style.borderColor = borderColor;
    }, [color]);

    const handleUpdateNote = (note: Note) => {
        note.updatedTime = Date.now();
        return onUpdate(note);
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

    const onColorSelected = (color: string) => {
        toggleColorPicker();
        note.color = color;
        handleUpdateNote(note).then(() => setColor(color));
    }

    const toggleColorPicker = () => {
        const colorPicker = colorPickerRef.current;

        if (!colorPicker) return;

        if (showColorPicker) {
            setShowColorPicker(false);
        } else {
            setShowColorPicker(true);
        }

        console.log({ colorPickerStyle: colorPicker.style })

        if (!colorPicker.style.maxHeight) {
            colorPicker.style.maxHeight = `${colorPicker.scrollHeight}px`;
            colorPicker.style.borderWidth = '1px';
        } else {
            colorPicker.style.maxHeight = '';
            colorPicker.style.borderWidth = '0px';
        }
    };

    const renderColorPicker = () => {
        return (
            <div ref={colorPickerRef} className="colorPicker">
                {Object.entries(noteColors).map(([color, noteColor]) => {
                    const { backgroundColor, borderColor } = noteColor;
                    return (
                        <div key={color} className="color" style={{ backgroundColor, borderColor }} onClick={() => onColorSelected(color)} >
                        </div>
                    )
                })}
            </div>
        );
    };

    return (
        <div
            className="noteItem"
            ref={noteItemRef}
            style={{ width: NOTE_WIDTH, height: NOTE_HEIGHT, top: y, left: x }}
            onDragStart={onDragStart}
            onBlur={onBlur}
            onDragEnd={onDragEnd}
            onClick={onClick}
            draggable={isDragging}
        >
            <div className="header">
                <IconButton className="toggleColorPickerButton" onClick={toggleColorPicker} >
                    { showColorPicker ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
                </IconButton>
                <div className="moveNoteArea" onMouseDown={() => setIsDragging(true)}></div>
                <IconButton className="deleteNoteButton" onClick={handleDeleteNote}>
                    <CloseIcon />
                </IconButton>
                {renderColorPicker()}
            </div>
            <textarea className="noteEditor" value={newText} onChange={onTextChange} />
        </div>
    );
};

export default NoteItem;
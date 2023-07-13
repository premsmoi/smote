import React, { FC, FocusEventHandler, ChangeEventHandler, useState, useRef, useLayoutEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { noteColors } from '../../const';
import { DragEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import { confirmationDialog } from '../../atoms/confirmationDialog';
import { Paper } from '@mui/material';

const NOTE_WIDTH = 200;
const NOTE_HEIGHT = 200;

interface Props {
    note: Note;
    isActive?: boolean;
    onDelete: (noteId: string) => Promise<any>;
    onUpdate: (note: Note) => Promise<any>;
};

const NoteItem: FC<Props> = props => {
    const { note, isActive, onDelete, onUpdate } = props;
    const { noteId, text, x, y } = note;
    const [newText, setNewText] = useState(text);
    const [color, setColor] = useState(note.color || 'yellow');
    const [isDragging, setIsDragging] = useState(false);
    const [isShowColorPicker, setIsShowColorPicker] = useState(false);
    const [confirmationDialogData, setConfirmationDialogData] = useRecoilState(confirmationDialog);
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
        return onDelete(noteId);
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
        hideColorPicker();
        note.color = color;
        setColor(color);
        handleUpdateNote(note);
    }

    const showColorPicker = () => {
        const colorPicker = colorPickerRef.current;

        if (!colorPicker) return;

        setIsShowColorPicker(true); 

        colorPicker.style.maxHeight = `${colorPicker.scrollHeight}px`;
        colorPicker.style.borderWidth = '1px';
        colorPicker.tabIndex = -1;
        colorPicker.focus();
    };

    const hideColorPicker = () => {
        const colorPicker = colorPickerRef.current;

        if (!colorPicker) return;

        setIsShowColorPicker(false);

        colorPicker.style.maxHeight = '';
        colorPicker.style.borderWidth = '0px';
        colorPicker.tabIndex = 0;
    };

    const renderColorPicker = () => {
        return (
            <div ref={colorPickerRef} className="colorPicker" onBlur={hideColorPicker}>
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

    const openDeleteNoteConfirmationDialog = () => {
        setConfirmationDialogData({
            title: "Delete Note Confirmation",
            message: "Are you sure to delete the note?",
            isShow: true,
            onConfirm: handleDeleteNote,
        });
    };

    return (
        <Paper
            className="noteItem"
            ref={noteItemRef}
            style={{ width: NOTE_WIDTH, height: NOTE_HEIGHT, top: y, left: x }}
            onDragStart={onDragStart}
            onBlur={onBlur}
            onDragEnd={onDragEnd}
            onClick={onClick}
            draggable={isDragging}
            elevation={6}
        >
            <div className="header">
                <IconButton className="toggleColorPickerButton" onClick={showColorPicker} >
                    { isShowColorPicker ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
                </IconButton>
                <div className="moveNoteArea" onMouseDown={() => setIsDragging(true)}></div>
                <IconButton className="deleteNoteButton" onClick={openDeleteNoteConfirmationDialog}>
                    <CloseIcon />
                </IconButton>
                {renderColorPicker()}
            </div>
            <textarea className="noteEditor" value={newText} onChange={onTextChange} />
        </Paper>
    );
};

export default NoteItem;
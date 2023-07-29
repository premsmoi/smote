import React, {
  FC,
  FocusEventHandler,
  ChangeEventHandler,
  useState,
  useRef,
  useLayoutEffect,
  TouchEvent,
  useEffect
} from 'react';
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
  onDelete: (noteId: string) => Promise<void>;
  onUpdate: (note: Note) => Promise<void>;
  boardRef: React.RefObject<HTMLDivElement>;
}

const NoteItem: FC<Props> = (props) => {
  const { note, isActive, boardRef, onDelete, onUpdate } = props;
  const { noteId, text, x, y } = note;
  const [newText, setNewText] = useState(text);
  const [color, setColor] = useState(note.color || 'yellow');
  const [isDragging, setIsDragging] = useState(false);
  const [isShowColorPicker, setIsShowColorPicker] = useState(false);
  const [, setConfirmationDialogData] = useRecoilState(confirmationDialog);
  const noteItemRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

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

    const noteElement = noteItemRef.current;

    if (!noteElement) return;

    noteElement.classList.add('hide');

    e.dataTransfer.setData('dragNoteData', JSON.stringify(dragNoteData));
  };

  const onDragEnd: DragEventHandler = () => {
    setIsDragging(false);

    const noteElement = noteItemRef.current;

    if (!noteElement) return;

    noteElement.classList.remove('hide');
  };

  const onClick = () => {
    if (isActive) return;

    handleUpdateNote(note);
  };

  const onColorSelected = (color: string) => {
    toggleColorPicker();
    note.color = color;
    setColor(color);
    handleUpdateNote(note);
  };

  const toggleColorPicker = () => {
    setIsShowColorPicker(!isShowColorPicker);
  };

  const renderColorPicker = () => {
    if (!isShowColorPicker) return null;

    return (
      <div
        ref={colorPickerRef}
        className="colorPicker"
        onBlur={toggleColorPicker}
        data-testid="color-picker"
        tabIndex={0}
      >
        {Object.entries(noteColors).map(([color, noteColor]) => {
          const { backgroundColor, borderColor } = noteColor;
          return (
            <div
              key={color}
              className="color"
              style={{ backgroundColor, borderColor }}
              onClick={() => onColorSelected(color)}
              data-testid={`color-${color}`}
            ></div>
          );
        })}
      </div>
    );
  };

  const openDeleteNoteConfirmationDialog = () => {
    setConfirmationDialogData({
      title: 'Delete Note Confirmation',
      message: 'Are you sure to delete the note?',
      isShow: true,
      onConfirm: handleDeleteNote
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    // grab the location of touch
    const touchLocation = e.targetTouches[0];
    const noteElement = noteItemRef.current;
    const boardElement = boardRef.current;

    if (!noteElement || !boardElement) return;

    noteElement.style.left =
      boardElement.scrollLeft + touchLocation.pageX - NOTE_WIDTH / 2 + 'px';
    noteElement.style.top =
      boardElement.scrollTop +
      touchLocation.pageY -
      NOTE_HEIGHT / 2 +
      25 +
      'px';
    noteElement.style.zIndex = '2';
  };

  const handleTouchEnd = () => {
    const noteElement = noteItemRef.current;

    if (!noteElement) return;

    noteElement.style.zIndex = '';

    handleUpdateNote({
      ...note,
      x: noteElement.offsetLeft,
      y: noteElement.offsetTop
    });
  };

  useEffect(() => {
    if (colorPickerRef.current) {
      colorPickerRef.current.focus();
    }
  }, [isShowColorPicker]);

  return (
    <Paper
      className="note-item"
      id={`note-item-${noteId}`}
      ref={noteItemRef}
      style={{ width: NOTE_WIDTH, height: NOTE_HEIGHT, top: y, left: x }}
      onDragStart={onDragStart}
      onBlur={onBlur}
      onDragEnd={onDragEnd}
      onClick={onClick}
      draggable={isDragging}
      elevation={6}
      data-testid={`note-item-${noteId}`}
    >
      <div className="header">
        <IconButton
          className="toggleColorPickerButton"
          onClick={(e) => {
            e.stopPropagation();
            toggleColorPicker();
          }}
          data-testid="toggle-color-picker-button"
        >
          {isShowColorPicker ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </IconButton>
        <div
          className="move-note-area"
          onMouseDown={() => setIsDragging(true)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          data-testid="move-note-area"
        ></div>
        <IconButton
          className="delete-note-button"
          onClick={openDeleteNoteConfirmationDialog}
          data-testid="delete-note-button"
        >
          <CloseIcon />
        </IconButton>
        {renderColorPicker()}
      </div>
      <textarea
        className="noteEditor"
        data-testid="note-editor"
        value={newText}
        placeholder="Write your idea here.."
        onChange={onTextChange}
      />
    </Paper>
  );
};

export default NoteItem;

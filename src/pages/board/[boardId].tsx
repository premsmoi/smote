import React, {
  useEffect,
  useState,
  DragEventHandler,
  useRef,
  MouseEvent as ReactMouseEvent
} from 'react';
import { createUseStyles } from 'react-jss';
import { useRouter } from 'next/router';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {
  Button,
  Dialog,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { request } from '@src/utils/request';
import NoteItem from '@src/components/note-item/note-item';
import { API_PATH, HEADER_HIGHT, NOTE_HEIGHT, NOTE_WIDTH } from '@src/const';
import { sortNotesByUpdatedTime } from '@src/services/noteService';
import { confirmationDialog } from '@src/atoms/confirmation-dialog';
import { useRecoilState } from 'recoil';
import useBoard from '@src/hooks/useBoard';

const useStyles = createUseStyles({
  board: {
    position: 'relative',
    height: `calc(100vh - ${HEADER_HIGHT}px - 1px)`
  },
  editBoardDialog: {
    '& .content': {
      display: 'grid',
      rowGap: '10px'
    }
  },
  toolbar: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    height: '45px',
    zIndex: 2,
    top: '12px',
    left: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    borderRadius: '8px'
  },
  boardName: {
    fontSize: '30px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '250px'
  },
  buttonContainer: {
    '& .add-button': {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      zIndex: 2,
      backgroundColor: '#1976d2',
      color: 'white',
      boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
    },

    '& button': {
      marginLeft: '10px'
    },

    '& svg': {
      cursor: 'pointer'
    }
  },
  boardContainer: {
    overflow: 'scroll',
    height: `calc(100vh - ${HEADER_HIGHT}px - 1px)`,

    /* Hide scrollbar for Chrome, Safari, and Opera */
    '&::-webkit-scrollbar': {
      display: 'none'
    },

    '-ms-overflow-style': 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,

    '& .board-area': {
      width: '2560px',
      height: '1440px',
      position: 'relative'
    }
  }
});

interface Props {}

const Board: React.FC<Props> = () => {
  const classes = useStyles();
  const router = useRouter();
  const boardRef = useRef<HTMLDivElement>(null);
  const boardId = router.query.boardId as string;
  const { board, setBoard } = useBoard(boardId);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [isShowEditBoardDialog, setIsShowEditBoardDialog] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [, setConfirmationDialogData] = useRecoilState(confirmationDialog);
  let x: number, y: number;

  useEffect(() => {
    if (!boardId) return;

    request<SmoteResponse<Note[]>>(`${API_PATH.NOTES}?boardId=${boardId}`)
      .then((res) => {
        const notes: Note[] = res.data;

        sortNotesByUpdatedTime(notes);
        setNotes(notes);
      })
      .catch(() => router.replace('/'));
  }, [boardId, router]);

  useEffect(() => {
    if (!board) return;

    setNewBoardName(board.boardName);
  }, [board]);

  const updateBoard = () => {
    if (!board) return;

    const updatedBoard: Board = {
      ...board,
      boardName: newBoardName,
      isPublic
    };

    request<SmoteResponse<Board>>(API_PATH.BOARDS, {
      method: 'PUT',
      body: JSON.stringify(updatedBoard)
    }).then((res) => {
      if (res.data) {
        hideEditBoardDialog();
        setBoard(updatedBoard);
      }
    });
  };

  const handleAddNote = () => {
    if (!boardRef.current) return;

    request<SmoteResponse<Note>>(API_PATH.NOTES, {
      method: 'POST',
      body: JSON.stringify({
        boardId,
        x:
          boardRef.current.scrollLeft +
          (boardRef.current.clientWidth - NOTE_WIDTH) / 2,
        y:
          boardRef.current.scrollTop +
          (boardRef.current.clientHeight - NOTE_HEIGHT) / 2,
        updatedTime: Date.now()
      })
    }).then((res) => {
      const newNote = res.data;
      const newNoteList = [...notes, newNote];

      sortNotesByUpdatedTime(newNoteList);
      setNotes(newNoteList);
    });
  };

  const handleUpdateNote = (updatedNote: Note): Promise<void> => {
    updatedNote.updatedTime = Date.now();

    const index = notes.findIndex((note) => note.noteId === updatedNote.noteId);

    notes[index] = updatedNote;

    sortNotesByUpdatedTime(notes);
    setNotes([...notes]);

    return request(
      API_PATH.NOTES,
      {
        method: 'PUT',
        body: JSON.stringify(updatedNote)
      },
      false
    );
  };

  const handleDeleteNote = (noteId: string) => {
    return request(`${API_PATH.NOTES}/${noteId}`, {
      method: 'DELETE'
    }).then(() => {
      const newNotes = notes.filter((note) => note.noteId !== noteId);
      setNotes(newNotes);
    });
  };

  const handleDeleteBoard = () => {
    return request(`${API_PATH.BOARDS}/${boardId}`, {
      method: 'DELETE'
    }).then(() => {
      router.replace('/');
    });
  };

  const showEditBoardDialog = () => {
    setIsShowEditBoardDialog(true);
  };

  const hideEditBoardDialog = () => {
    setIsShowEditBoardDialog(false);
  };

  const openDeleteBoardConfirmationDialog = () => {
    setConfirmationDialogData({
      title: 'Delete Board Confirmation',
      message: 'Are you sure to delete the board?',
      isShow: true,
      onConfirm: handleDeleteBoard
    });
  };

  const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const dragNoteData = JSON.parse(
      e.dataTransfer.getData('dragNoteData')
    ) as DragNoteData;
    const { noteId, offsetX, offsetY } = dragNoteData;

    const targetNote = notes.find((note) => note.noteId === noteId);

    if (!targetNote) return;

    targetNote.x = e.clientX - offsetX;
    targetNote.y = e.clientY - offsetY;

    handleUpdateNote(targetNote);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const boardElement = boardRef.current;

    if (!boardElement) return;

    const offsetX = x - e.clientX;
    const offsetY = y - e.clientY;

    boardElement.scrollLeft += offsetX;
    boardElement.scrollTop += offsetY;

    x = e.clientX;
    y = e.clientY;
  };

  const handleMouseDown = (e: ReactMouseEvent) => {
    const target = e.target as HTMLDivElement;

    if (target.className !== 'board-area') return;

    target.style.cursor = 'grab';

    x = e.clientX;
    y = e.clientY;

    const boardElement = boardRef.current;

    if (boardElement) {
      boardElement.onmousemove = handleMouseMove;
    }
  };

  const handleMouseUp = (e: ReactMouseEvent) => {
    const target = e.target as HTMLDivElement;

    const boardElement = boardRef.current;

    if (boardElement) {
      boardElement.onmousemove = null;
    }

    target.style.cursor = 'unset';
  };

  const handleToggleIsPublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  const renderEditBoardDialog = () => {
    const deletable = notes.length === 0;
    return (
      <Dialog className={classes.editBoardDialog} open={isShowEditBoardDialog}>
        <DialogTitle>Edit Board</DialogTitle>
        <div className="content">
          <TextField
            id="outlined-basic"
            label="Board Name"
            variant="outlined"
            size="small"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
          <FormGroup>
            <FormControlLabel
              label="Public"
              control={
                <Switch checked={isPublic} onChange={handleToggleIsPublic} />
              }
            />
          </FormGroup>
          <Button variant="contained" onClick={updateBoard}>
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={openDeleteBoardConfirmationDialog}
            disabled={!deletable}
          >
            Delete
          </Button>
          <Button variant="outlined" onClick={hideEditBoardDialog}>
            Cancle
          </Button>
        </div>
      </Dialog>
    );
  };

  return (
    <div className={classes.board}>
      {board && (
        <div className="body">
          <div className={classes.toolbar}>
            <div className={classes.boardName}>{board?.boardName}</div>
            <div className={classes.buttonContainer}>
              <IconButton
                className="add-button"
                size="large"
                onClick={handleAddNote}
              >
                <AddIcon sx={{ fontSize: 48 }} />
              </IconButton>
              <IconButton size="large" onClick={showEditBoardDialog}>
                <SettingsIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </div>
          </div>
          <div className={classes.boardContainer} ref={boardRef}>
            <div
              className="board-area"
              onDragOver={onDragOver}
              onDrop={onDrop}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {notes.map((note, index) => (
                <NoteItem
                  key={note.noteId}
                  note={note}
                  onUpdate={handleUpdateNote}
                  onDelete={handleDeleteNote}
                  isActive={index === notes.length - 1}
                  boardRef={boardRef}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {renderEditBoardDialog()}
    </div>
  );
};

export default Board;

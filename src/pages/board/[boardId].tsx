import React, { useEffect, useState, DragEventHandler } from 'react';
import { useRouter } from 'next/router'
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Button, Dialog } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { request } from '../../utils/request';
import NoteItem from '../../common/components/noteItem';
import { API_PATH } from '../../const';
import { sortNotesByUpdatedTime } from '../../utils/notes';
import { confirmationDialog } from '../../atoms/confirmationDialog';
import { useRecoilState } from 'recoil';

interface Props {
}

const Board: React.FC<Props> = props => {
    const [board, setBoard] = useState<Board>();
    const [notes, setNotes] = useState<Note[]>([]);
    const [isShowEditBoardDialog, setIsShowEditBoardDialog] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');
    const [confirmationDialogData, setConfirmationDialogData] = useRecoilState(confirmationDialog);
    const router = useRouter();
    const boardId = router.query.boardId as string;

    useEffect(() => {
        if (!boardId) return;

        request(`${API_PATH.BOARDS}/${boardId}`).then(data => {
            const board: Board = data.board;

            sortNotesByUpdatedTime(board.notes);
            setNotes(board.notes);
            setBoard(board)
            setNewBoardName(board.boardName)
        });
    }, [boardId]);

    const updateBoard = () => {
        if (!board) return;

        const updatedBoard: Board = {
            ...board,
            boardName: newBoardName
        };

        request(API_PATH.BOARDS, {
          method: 'PUT',
          body: JSON.stringify({ board: updatedBoard })
        }).then(result => {
            if (result.success) {
                hideEditBoardDialog();
                setBoard(updatedBoard);
            }
        });
    };

    const handleAddNote = () => {
        request(API_PATH.NOTES, {
          method: 'POST',
          body: JSON.stringify({
              text: 'New Note...',
              boardId: parseInt(boardId, 10),
              x: 30,
              y: 30,
              updatedTime: Date.now(),
        })
        }).then(data => {
            const newNote = data.note as Note;
            const newNoteList = [ ...notes, newNote];

            sortNotesByUpdatedTime(newNoteList);
            setNotes(newNoteList);
          });
    };

    const handleUpdateNote = (updatedNote: Note) => {
        updatedNote.updatedTime = Date.now();

        sortNotesByUpdatedTime(notes);
        setNotes([...notes]);

        return request(API_PATH.NOTES, {
          method: 'PUT',
          body: JSON.stringify({ note: updatedNote, })
        }, false);
    }

    const handleDeleteNote = (noteId: number) => {
        return request(`${API_PATH.NOTES}/${noteId}`, {
          method: 'DELETE',
        }).then(() => {
            const newNotes = notes.filter(note => note.noteId !== noteId);
            setNotes(newNotes);
          });
    };

    const handleDeleteBoard = () => {
        return request(`${API_PATH.BOARDS}/${boardId}`, {
            method: 'DELETE',
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
            title: "Delete Board Confirmation",
            message: "Are you sure to delete the board?",
            isShow: true,
            onConfirm: handleDeleteBoard,
        });
    };

    const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    };

    const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();

        const dragNoteData = JSON.parse(e.dataTransfer.getData('dragNoteData')) as DragNoteData;
        const { noteId, offsetX, offsetY } = dragNoteData;

        const targetNote = notes.find(note => note.noteId === noteId);

        if (!targetNote) return;

        targetNote.x = e.clientX - offsetX;
        targetNote.y = e.clientY - offsetY;

        handleUpdateNote(targetNote);
    };

    const renderEditBoardDialog = () => {
        const deletable = notes.length === 0;
        return (
            <Dialog className="editBoardDialog" open={isShowEditBoardDialog}>
                <DialogTitle>Edit Board</DialogTitle>
                <div className="content">
                <TextField id="outlined-basic" label="Board Name" variant="outlined" size="small" value={newBoardName} onChange={e => setNewBoardName(e.target.value)} />
                <Button variant="contained" onClick={updateBoard}>
                    Save
                </Button>
                <Button variant="outlined" color="error" onClick={openDeleteBoardConfirmationDialog} disabled={!deletable}>
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
        <div className="board">
            {board && <div className="body">
                <div className="toolbar">
                    <div className='boardName'>
                        {board?.boardName}
                    </div>
                    <div className="buttonsContainer">
                        <Button variant="contained" startIcon={<AddIcon />} size="large" onClick={handleAddNote}>
                            New Note
                        </Button>
                        <Button variant="contained" startIcon={<EditIcon />} size="large" onClick={showEditBoardDialog}>
                            Edit
                        </Button>
                    </div>
                </div>
                <div className="boardContainer">
                    <div className="boardArea" onDragOver={onDragOver} onDrop={onDrop}>
                    {
                        notes.map((note, index) => (
                            <NoteItem
                                key={note.noteId}
                                note={note}
                                onUpdate={handleUpdateNote}
                                onDelete={handleDeleteNote}
                                isActive={index === notes.length - 1}
                            />
                        ))
                    }
                    </div>
                </div>
            </div>}
            {renderEditBoardDialog()}
        </div>
    );
};

export default Board;
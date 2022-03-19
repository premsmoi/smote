import React, { useEffect, useState, DragEventHandler } from 'react';
import { useRouter } from 'next/router'
import Header from '../../common/components/header';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { request } from '../../utils/request';
import NoteItem from '../../common/components/noteItem';
import { API_PATH } from '../../const';
import { Button } from '@mui/material';
import { sortNotesByUpdatedTime } from '../../utils/notes';

interface Props {
}

const Board: React.FC<Props> = props => {
    const [notes, setNotes] = useState<Note[]>([]);
    const router = useRouter();
    const boardId = router.query.boardId as string;

    useEffect(() => {
        if (!boardId) return;

        request(`${API_PATH.BOARDS}/${boardId}`).then(data => {
            const notes: Note[] = data.board.notes;

            sortNotesByUpdatedTime(notes);
            setNotes(notes);
        });
    }, [boardId]);

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

        request(API_PATH.NOTES, {
          method: 'PUT',
          body: JSON.stringify({ note: updatedNote, })
        });
    }

    const handleDeleteNote = (noteId: string) => {
        request(`${API_PATH.NOTES}/${noteId}`, {
          method: 'DELETE',
        }).then(() => {
            const newNotes = notes.filter(note => note.noteId !== noteId);
            setNotes(newNotes);
          });
    };

    const handleDeleteBoard = () => {
        request(`${API_PATH.BOARDS}/${boardId}`, {
            method: 'DELETE',
          }).then(() => {
              router.replace('/');
            });
    };

    const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    };

    const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();

        const dragNoteData = JSON.parse(e.dataTransfer.getData('dragNoteData')) as DragNoteData;
        const { noteId, offsetX, offsetY } = dragNoteData;
        console.log('Drop', { dragNoteData })

        const targetNote = notes.find(note => note.noteId === noteId);

        if (!targetNote) return;

        targetNote.x = e.clientX - offsetX;
        targetNote.y = e.clientY - offsetY;

        handleUpdateNote(targetNote);
    };

    if (!boardId) return null;

    return (
        <div className="board">
            <Header />
            <div className="buttonsContainer">
                <Button variant="contained" startIcon={<AddIcon />} size="large" onClick={handleAddNote}>
                    New Note
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} size="large" onClick={handleDeleteBoard}>
                    Delete Board
                </Button>
            </div>
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
    );
};

export default Board;
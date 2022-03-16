import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Header from '../../common/components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { request } from '../../utils/request';
import NoteItem from '../../common/components/noteItem';
import { API_PATH } from '../../const';

interface Props {
}

const Board: React.FC<Props> = props => {
    const [notes, setNotes] = useState<Note[]>([]);
    const router = useRouter();
    const boardId = router.query.boardId as string;

    useEffect(() => {
        if (!boardId) return;

        request(`${API_PATH.BOARDS}/${boardId}`).then(data => setNotes(data.board.notes));
    }, [boardId]);

    const handleAddNote = () => {
        request(API_PATH.NOTES, {
          method: 'POST',
          body: JSON.stringify({ text: 'New Note...', boardId: parseInt(boardId, 10) })
        }).then(data => {
            const newNote = data.note as Note;
            setNotes([ ...notes, newNote]);
          });
    };

    const handleUpdateNote = (updatedNote: Note) => {
        request(API_PATH.NOTES, {
          method: 'PUT',
          body: JSON.stringify({ note: updatedNote })
        }).then(() => {
            let targetNote = notes.find(note => note.noteId === updatedNote.noteId);

            if (!targetNote) return;

            targetNote = updatedNote;
            setNotes(notes);
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

    if (!boardId) return null;

    return (
        <div className="board">
            <Header />
            <FontAwesomeIcon className="addNoteIcon" icon={faPlus} size="2x" onClick={handleAddNote} />
            <div className="noteList">
            {
                notes.map(({ noteId, text, color }) => (<NoteItem key={noteId} noteId={noteId} text={text} color={color} onDelete={handleDeleteNote} />))
            }
        </div>
        </div>
    );
};

export default Board;
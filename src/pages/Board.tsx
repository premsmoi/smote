import React, { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router'
import NoteList from '../common/components/noteList';
import Header from '../common/components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
}

const Board: React.FC<Props> = props => {
    const [notes, setNotes] = useState([]);
    const router = useRouter()
    const { boardId } = router.query;

    useLayoutEffect(() => {
        fetch('/api/notes').then(res => res.json().then(data => setNotes(data)));
    }, [])

    const handleAddNote = () => {
        fetch('/api/notes', {
          method: 'POST',
          body: JSON.stringify({ text: 'New Note...' })
        })
    };

    if (!boardId) return null;

    return (
        <div className="board">
            <Header />
            <FontAwesomeIcon className="addNoteIcon" icon={faPlus} size="2x" onClick={handleAddNote} />
            <NoteList notes={notes} />
        </div>
    );
};

export default Board;
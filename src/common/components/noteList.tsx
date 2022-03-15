import React from 'react';
import NoteItem from './noteItem';

interface Props {
    notes: Note[]
}

const NoteList: React.FC<Props> = props => {

    return (
        <div className="noteList">
            {
                props.notes.map(({ noteId, text, color }) => (<NoteItem key={noteId} noteId={noteId} text={text} color={color} />))
            }
        </div>
    );
};

export default NoteList;
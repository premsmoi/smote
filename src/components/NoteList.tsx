import React from 'react';
import NoteItem from './NoteItem';

interface Props {
    notes: Note[]
}

const NoteList: React.FC<Props> = props => {

    return (
        <div id="noteList">
            {
                props.notes.map(({ noteId, text }) => (<NoteItem key={noteId} noteId={noteId} text={text} />))
            }
        </div>
    );
};

export default NoteList;
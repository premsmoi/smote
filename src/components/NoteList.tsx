import React from 'react';
import NoteItem from './NoteItem';

interface Props {
    notes: Note[]
}

const NoteList: React.FC<Props> = props => {

    return (
        <div id="noteList">
            {
                props.notes.map((note) => (<NoteItem noteId={note.noteId} text={note.text} />))
            }
        </div>
    );
};

export default NoteList;
import React from 'react';
import NoteItem from './NoteItem';

interface Props {
    notes: Note[]
}

const NoteList: React.FC<Props> = props => {

    return (
        <div id="noteList">
            {
                props.notes.map(({ noteId, text, color }) => (<NoteItem key={noteId} noteId={noteId} text={text} color={color} />))
            }
        </div>
    );
};

export default NoteList;
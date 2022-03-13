import React from 'react';

const NoteItem: React.FC<Note> = props => {
    const { text } = props;

    return (
        <div className="noteItem">
            {text}
        </div>
    );
};

export default NoteItem;
import React from 'react';
import NoteList from '../components/NoteList';

interface Props {
    board: Board | undefined;
    onClick: (board: Board) => void;
}

const Board: React.FC<Props> = props => {
    const { board } = props;

    if (!board) return null;

    return (
        <div id="board">
            <NoteList notes={board.notes} />
        </div>
    );
};

export default Board;
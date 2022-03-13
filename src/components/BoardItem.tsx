import React from 'react';

interface Props {
    board: Board;
    onClick: (board: Board) => void;
}

const BoardItem: React.FC<Props> = props => {
    const { board, onClick } = props;

    const handleClick = () => {
        onClick(board);
    }

    return (
        <div className="boardItem" onClick={handleClick} >
            {board.boardName}
        </div>
    );
};

export default BoardItem;
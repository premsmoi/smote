import Link from 'next/link';
import React from 'react';

interface Props {
    board: Board;
}

const BoardItem: React.FC<Props> = props => {
    const { board } = props;

    return (
        <Link href={{ pathname: '/board', query: { boardId: board.boardId } }}>
            <div className="boardItem">
                {board.boardName}
            </div>
        </Link>
    );
};

export default BoardItem;
import Link from 'next/link';
import React from 'react';

interface Props {
    board: Board;
}

const BoardItem: React.FC<Props> = props => {
    const { board } = props;

    return (
        <Link href={{ pathname: `/board/${board.boardId}` }}>
            <div className="boardItem">
                <div className="text">
                    {board.boardName}
                </div>
            </div>
        </Link>
    );
};

export default BoardItem;
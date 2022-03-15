import React from 'react';
import MockData from '../../mockData.json';
import BoardItem from './boardItem';

interface Props {
}

const BoardList: React.FC<Props> = props => {

    return (
        <div className="boardList">
            {
                MockData.map((board: Board) => <BoardItem key={board.boardId} board={board}/>)
            }
        </div>
    );
};

export default BoardList;
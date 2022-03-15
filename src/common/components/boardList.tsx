import React, { useLayoutEffect } from 'react';
import { useState } from 'react';
import MockData from '../../mockData.json';
import BoardItem from './boardItem';

interface Props {
}

const BoardList: React.FC<Props> = props => {
    const [boards, setBoards] = useState([]);

    useLayoutEffect(() => {
        fetch('/api/boards').then(res => res.json().then(data => setBoards(data)));
      }, [])

    return (
        <div className="boardList">
            {
                boards.map((board: Board) => <BoardItem key={board.boardId} board={board}/>)
            }
        </div>
    );
};

export default BoardList;
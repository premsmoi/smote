import React, { useEffect, useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BoardList from '../common/components/boardList';
import Header from '../common/components/header';
import { request } from '../utils/request';
import BoardItem from '../common/components/boardItem';

const Home = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    request('/api/boards').then(data => setBoards(data.boards));
  }, []);

  const handleAddBoard = () => {
    request('/api/boards', {
      method: 'POST',
      body: JSON.stringify({ boardName: 'New Board' })
    }).then(data => setBoards([ ...boards, data.board]))
  };

  return (
    <div className="home">
      <Header />
      <FontAwesomeIcon className="addBoardIcon" icon={faPlus} size="2x" onClick={handleAddBoard} />
      <div className="boardList">
        {
            boards.map((board: Board) => <BoardItem key={board.boardId} board={board}/>)
        }
        </div>
    </div>
  );
};

export default Home;

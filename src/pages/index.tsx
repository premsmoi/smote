import React, { useEffect, useState } from 'react';
import Header from '../common/components/header';
import { request } from '../utils/request';
import BoardItem from '../common/components/boardItem';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
      <div className="buttonsContainer">
        <Button variant="contained" startIcon={<AddIcon />} size="large" onClick={handleAddBoard}>
          New Board
        </Button>
      </div>
      <div className="boardList">
        {
            boards.map((board: Board) => <BoardItem key={board.boardId} board={board}/>)
        }
        </div>
    </div>
  );
};

export default Home;

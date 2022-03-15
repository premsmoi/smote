import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import BoardList from '../common/components/boardList';
import Header from '../common/components/header';

function App() {

  const handleAddBoard = () => {
    fetch('/api/boards', {
      method: 'POST',
      body: JSON.stringify({ boardName: 'New Board' })
    })
  };

  return (
    <div className="home">
      <Header />
      <FontAwesomeIcon className="addBoardIcon" icon={faPlus} size="2x" onClick={handleAddBoard} />
      <BoardList />
    </div>
  );
}

export default App;

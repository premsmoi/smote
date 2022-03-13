import React, { useState } from 'react';
import './app.scss';
import { Page } from './const';
import Board from './pages/Board';
import Home from './pages/Home';

function App() {
  const [page, setPage] = useState<Page>(Page.home);
  const [currentBoard, setCurrentBoard] = useState<Board>();

  const goToBoard = (board: Board) => {
    setCurrentBoard(board);
    setPage(Page.board);
  };

  const renderPage = () => {
    switch (page) {
      case Page.home:
        return <Home goToBoard={goToBoard} />;
      case Page.board:
        return <Board onClick={goToBoard} board={currentBoard} />;
    }
  };

  return (
    <div id="app">
      <header>
        Smote
      </header>
      <div id="body">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;

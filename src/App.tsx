import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Page } from './const';
import Board from './pages/Board';
import Home from './pages/Home';
import './app.scss';

function App() {
  const [page, setPage] = useState<Page>(Page.home);
  const [currentBoard, setCurrentBoard] = useState<Board>();

  const goToBoard = (board: Board) => {
    setCurrentBoard(board);
    setPage(Page.board);
  };

  const goToHome = () => {
    setCurrentBoard(undefined);
    setPage(Page.home);
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
        <div className="homeButtonContainer">
          <FontAwesomeIcon className="homeButton" icon={faHome} size="xs" onClick={goToHome} />
        </div>
        Smote
      </header>
      <div id="body">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;

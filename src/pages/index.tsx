import React, { useState } from 'react';
import BoardList from '../common/components/boardList';
import Header from '../common/components/header';

function App() {

  return (
    <div className="home">
      <Header />
      <BoardList />
    </div>
  );
}

export default App;

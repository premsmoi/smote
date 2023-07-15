import React, { useEffect, useState } from 'react';
import { Button, Dialog, TextField, DialogTitle, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { request } from '../utils/request';
import BoardItem from '../common/components/boardItem';
import { API_PATH } from '../const';

const Home = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isShowCreateBoardDialog, setIsShowCreateBoardDialog] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  useEffect(() => {
    request<Response<Board[]>>(API_PATH.BOARDS).then((res) => setBoards(res.data));
  }, []);

  const handleAddBoard = () => {
    request<Response<Board>>(API_PATH.BOARDS, {
      method: 'POST',
      body: JSON.stringify({ boardName: newBoardName || 'New Board' })
    }).then(res => {
      closeCreateBoardDialog();
      resetNewBoardName();
      setBoards([ ...boards, res.data]);
    })
  };

  const openCreateBoardDialog = () => {
    setIsShowCreateBoardDialog(true);
  };

  const closeCreateBoardDialog = () => {
    resetNewBoardName();
    setIsShowCreateBoardDialog(false);
  };

  const resetNewBoardName = () => {
    setNewBoardName('');
  }

  return (
    <div className="home">
      <div className="button-container">
        <Button variant="contained" startIcon={<AddIcon />} size="large" onClick={openCreateBoardDialog}>
          Create Board
        </Button>
      </div>
      <Grid container spacing={2} className='boardList' padding={2}>
        {
          boards.map((board: Board) => {
            return (
              <Grid xs={6} sm={4} md={3} xl={2} item key={board.boardId}>
                  <BoardItem board={board}/>
              </Grid>
            )
          })
        }
      </Grid>
      <Dialog className="createBoardDialog" open={isShowCreateBoardDialog}>
        <DialogTitle>Create Board</DialogTitle>
        <div className="content">
          <TextField id="outlined-basic" label="Board Name" variant="outlined" size="small" value={newBoardName} onChange={e => setNewBoardName(e.target.value)} />
          <Button variant="contained" onClick={handleAddBoard}>
            Create
          </Button>
          <Button variant="outlined" onClick={closeCreateBoardDialog}>
            Cancle
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Home;

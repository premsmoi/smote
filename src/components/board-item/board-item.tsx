import { Paper, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useBoardItemStyles } from './board-item.style';

interface Props {
  board: Board;
}

const BoardItem: React.FC<Props> = (props) => {
  const classes = useBoardItemStyles();
  const { board } = props;

  return (
    <Paper className={classes.boardItem} elevation={3}>
      <Link href={{ pathname: `/board/${board.boardId}` }}>
        <Typography>{board.boardName}</Typography>
      </Link>
    </Paper>
  );
};

export default BoardItem;

import { Paper, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import Link from 'next/link';
import React from 'react';

const useStyles = createUseStyles({
  boardItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '50px',
    padding: '16px',
    textAlign: 'center',
    cursor: 'pointer',

    '& a': {
      textDecoration: 'none',
      color: 'black'
    }
  }
});

interface Props {
  board: Board;
}

const BoardItem: React.FC<Props> = (props) => {
  const classes = useStyles();
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

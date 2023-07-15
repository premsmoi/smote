import { Paper, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useRecoilState } from 'recoil';
import { boardAtom } from '../../atoms/board';

interface Props {
    board: Board;
}

const BoardItem: React.FC<Props> = props => {
    const { board } = props;
    const [, setBoard] = useRecoilState(boardAtom);

    return (
        <Paper className='boardItem' elevation={3}>
            <Link onClick={() => setBoard(board)} href={{ pathname: `/board/${board.boardId}` }}>
                <Typography>{board.boardName}</Typography>
            </Link>
        </Paper>
    );
};

export default BoardItem;
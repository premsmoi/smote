import React from 'react';
import { useRouter } from 'next/router'
import NoteList from '../common/components/noteList';
import MockData from '../mockData.json';
import Header from '../common/components/header';

interface Props {
}

const Board: React.FC<Props> = props => {
    const router = useRouter()
    const { boardId } = router.query;

    if (!boardId) return null;

    const board = MockData.find(board => board.boardId === boardId);

    if (!board) return null;

    return (
        <div className="board">
            <Header />
            <NoteList notes={board.notes} />
        </div>
    );
};

export default Board;
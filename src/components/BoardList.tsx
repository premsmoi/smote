import React from 'react';
import MockData from '../mockData.json';
import BoardItem from './BoardItem';

interface Props {
    goToBoard: (board: Board) => void
}

const BoardList: React.FC<Props> = props => {

    const onClickBoardItem = (board: Board) => {
        props.goToBoard(board);
    }

    return (
        <div id="boardList">
            {
                MockData.map((board: Board) => {
                    return <BoardItem board={board} onClick={onClickBoardItem} />
                })
            }
        </div>
    );
};

export default BoardList;
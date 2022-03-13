import React from 'react';
import BoardList from '../components/BoardList';
import { Page } from '../const';

interface Props {
    goToBoard: (board: Board) => void
}

const Home: React.FC<Props> = props => {

    return (
        <div id="home">
            <BoardList goToBoard={props.goToBoard} />
        </div>
    );
};

export default Home;
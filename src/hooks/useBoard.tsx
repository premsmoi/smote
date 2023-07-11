import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { boardAtom } from '../atoms/board';
import { request } from '../utils/request';
import { API_PATH } from '../const';

const useBoard = (boardId: string) => {
    const [board, setBoard] = useRecoilState(boardAtom);

    useEffect(()=> {
        if (!boardId) return;

        if (board?.boardId !== boardId) {
            request<Response<Board>>(`${API_PATH.BOARDS}/${boardId}`).then(res => {
                const board: Board = res.data;
                setBoard(board);
            })
        }
    }, [boardId])

    return { board, setBoard }
};

export default useBoard;

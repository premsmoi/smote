import React from 'react';
import Board from '@src/components/board/board';
import { useRouter } from 'next/router';

const BoardPage = () => {
  const router = useRouter();
  const boardId = router.query.boardId as string;

  if (!boardId) return null;

  return <Board boardId={boardId} />;
};

export default BoardPage;

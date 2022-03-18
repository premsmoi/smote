export enum Page {
  home = 'home',
  board = 'board'
}

export const noteColors: Record<string, NoteColor> = {
  yellow: {
    backgroundColor: '#fff6a1',
    borderColor: '#ffef54'
  },
  green: {
    backgroundColor: '#9aff96',
    borderColor: '#6cff66'
  },
  pink: {
    backgroundColor: '#ffb0fb',
    borderColor: '#ff8af9'
  },
};

export const API_PATH = {
  BOARDS: '/api/boards',
  NOTES: '/api/notes',
};

export const COLLECTION = {
  BOARDS: 'boards',
  NOTES: 'notes',
  COUTERS: 'counters',
}
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
    backgroundColor: '#ffbafd',
    borderColor: '#ffb0fb'
  },
  blue: {
    backgroundColor: '#9efdff',
    borderColor: '#8ddfe0'
  }
};

export const API_PATH = {
  BOARDS: '/api/boards',
  NOTES: '/api/notes',
};

export const USER_TYPE = {
  GUEST: 'guest',
};

export const NOTE_WIDTH = 200;
export const NOTE_HEIGHT = 200;

export const HEADER_HIGHT = 54;

export const hostname = 'https://smote-service-yq7g2xs3nq-as.a.run.app';
// export const hostname = 'http://localhost:8080'
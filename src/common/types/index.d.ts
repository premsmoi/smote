interface Board {
    boardId: string;
    boardName: string;
    notes: Note[];
}

interface Note {
    noteId: string;
    text: string;
    color?: string;
}

interface NoteColor {
    backgroundColor: string;
    borderColor: string;
}
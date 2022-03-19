interface Board {
    boardId: string;
    boardName: string;
    notes: Note[];
}

interface Note {
    noteId: string;
    text: string;
    color?: string;
    x: number;
    y: number;
}

interface NoteColor {
    backgroundColor: string;
    borderColor: string;
}

interface DragNoteData {
    noteId: string;
    offsetX: number;
    offsetY: number;
}
interface Board {
    boardId: string;
    boardName: string;
    notes: Note[];
    members: Member[];
}

interface Member {
    uid: string;
    permissions: Permission[];
}

type Permission = 'read' | 'write'

interface Note {
    noteId: string;
    text: string;
    color?: string;
    x: number;
    y: number;
    updatedTime: number;
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

interface UserProfile {
    uid: string;
    provider: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}
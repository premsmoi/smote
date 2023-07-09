import { type DefaultSession } from 'next-auth';

declare global {
    interface Board {
        boardId: string;
        boardName: string;
        notes: Note[];
        members: Member[];
        isPublic: boolean;
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

    interface ConfirmationDialog {
        title: string;
        message: string;
        isShow: boolean;
        onConfirm: () => Promise<any>;
        onClose?: () => Promise<any>;
    }

    interface Response<T> {
        data: T
    }

    type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
}


declare module 'next-auth' {
    interface Session extends DefaultSession {
        accessToken: string;
        user?: {
            uid?: string;
        } & DefaultSession['user'];
    }
}
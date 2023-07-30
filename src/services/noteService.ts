export const sortNotesByUpdatedTime = (notes: Note[]) => {
    if (!notes) return;

    notes.sort((a, b) => a.updatedTime - b.updatedTime);
};
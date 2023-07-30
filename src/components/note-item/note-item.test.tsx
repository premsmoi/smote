import React from 'react';
import { act, fireEvent, queryByTestId, screen } from '@testing-library/react';
import NoteItem from './note-item';
import { renderApp } from '@src/app.test';

const note: Note = {
  noteId: '1',
  boardId: '1',
  text: 'test',
  x: 0,
  y: 0,
  color: 'yellow',
  updatedTime: Date.now()
};

const onDelete = jest.fn().mockResolvedValue(null);
const onUpdate = jest.fn().mockResolvedValue(null);

const boardRef: React.RefObject<HTMLDivElement> = {
  current: document.createElement('div')
};

const renderNoteItem = (note: Note) => {
  return renderApp(
    <NoteItem
      note={note}
      onDelete={onDelete}
      onUpdate={onUpdate}
      boardRef={boardRef}
    />
  );
};

describe('NoteItem', () => {
  it('should render text correctly', () => {
    const { getByTestId } = renderNoteItem(note);
    const noteEditor = getByTestId('note-editor');

    expect(noteEditor).toBeInTheDocument();
    expect(noteEditor.textContent).toEqual('test');
  });

  it('should update text correctly', () => {
    const { getByTestId } = renderNoteItem(note);
    const noteEditor = getByTestId('note-editor');

    expect(noteEditor.textContent).toEqual('test');

    act(() => {
      fireEvent.change(noteEditor, { target: { value: '123' } });
    });

    expect(noteEditor.textContent).toEqual('123');

    act(() => {
      fireEvent.blur(noteEditor);
    });

    expect(note.text).toEqual('123');

    act(() => {
      fireEvent.change(noteEditor, { target: { value: '123' } });
    });

    expect(noteEditor.textContent).toEqual('123');

    act(() => {
      fireEvent.blur(noteEditor);
    });

    expect(note.text).toEqual('123');
  });

  it('should render placeholder correctly', () => {
    renderNoteItem({ ...note, text: '' });
    const placeholder = screen.getByPlaceholderText('Write your idea here..');

    expect(placeholder).toBeInTheDocument();
  });

  it('should render color picker correctly', () => {
    const { container } = renderNoteItem(note);
    const toggleColorPickerButton = screen.getByTestId(
      'toggle-color-picker-button'
    );

    expect(queryByTestId(container, 'color-picker')).not.toBeInTheDocument();

    act(() => {
      toggleColorPickerButton.click();
    });

    expect(queryByTestId(container, 'color-picker')).toBeInTheDocument();

    act(() => {
      toggleColorPickerButton.click();
    });

    expect(queryByTestId(container, 'color-picker')).not.toBeInTheDocument();
  });

  it('should change color correctly', () => {
    const { getByTestId } = renderNoteItem(note);
    const toggleColorPickerButton = getByTestId('toggle-color-picker-button');
    const noteItem = getByTestId('note-item-1');

    expect(noteItem).toBeInTheDocument();
    expect(noteItem.style.backgroundColor).toEqual('rgb(255, 246, 161)');

    act(() => {
      toggleColorPickerButton.click();
    });

    const greenColorButton = getByTestId('color-green');

    expect(greenColorButton).toBeInTheDocument();

    act(() => {
      greenColorButton.click();
    });

    expect(noteItem.style.backgroundColor).toEqual('rgb(154, 255, 150)');
  });

  it('should delete note correctly', async () => {
    const { getByTestId, getByText } = renderNoteItem(note);
    const deleteNoteButton = getByTestId('delete-note-button');

    expect(deleteNoteButton).toBeInTheDocument();

    act(() => {
      deleteNoteButton.click();
    });

    expect(getByText('Delete Note Confirmation')).toBeInTheDocument();

    const confirmButton = getByTestId('confirmation-ok');

    await act(async () => {
      confirmButton.click();
    });

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('should start dragging correctly', () => {
    const { getByTestId } = renderNoteItem(note);
    const noteItem = getByTestId('note-item-1');
    const moveNoteArea = getByTestId('move-note-area');

    expect(moveNoteArea).toBeInTheDocument();

    act(() => {
      fireEvent.mouseDown(moveNoteArea);
    });

    expect(noteItem.draggable).toEqual(true);

    const e = {
      dataTransfer: { setData: jest.fn() }
    };

    act(() => {
      fireEvent.dragStart(noteItem, e);
    });

    expect(e.dataTransfer.setData).toHaveBeenCalledTimes(1);
  });

  it('should end dragging correctly', () => {
    const { getByTestId } = renderNoteItem(note);
    const noteItem = getByTestId('note-item-1');
    const moveNoteArea = getByTestId('move-note-area');

    act(() => {
      fireEvent.mouseDown(moveNoteArea);
    });

    act(() => {
      fireEvent.dragStart(noteItem, { dataTransfer: { setData: jest.fn() } });
    });

    act(() => {
      fireEvent.dragEnd(noteItem);
    });

    expect(noteItem.draggable).toEqual(false);
  });
});

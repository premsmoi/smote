import { act, queryByTestId, screen } from '@testing-library/react';
import NoteItem from '../src/common/components/noteItem';
import { renderApp } from './app.test';

const note: Note = {
  noteId: '1',
  boardId: '1',
  text: 'test',
  x: 0,
  y: 0,
  color: 'yellow',
  updatedTime: Date.now()
};

const renderNoteItem = (note: Note) => {
  return renderApp(
    <NoteItem
      note={note}
      onDelete={() => Promise.resolve()}
      onUpdate={() => Promise.resolve()}
    />
  );
};

describe('NoteItem', () => {
  it('should render text correctly', () => {
    renderNoteItem(note);
    const text = screen.getByText('test');

    expect(text).toBeInTheDocument();
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

  it('should show delete note confirmation dialog correctly', () => {
    const { getByTestId, getByText } = renderNoteItem(note);
    const deleteNoteButton = getByTestId('delete-note-button');

    expect(deleteNoteButton).toBeInTheDocument();

    act(() => {
      deleteNoteButton.click();
    });

    expect(getByText('Delete Note Confirmation')).toBeInTheDocument();
  });
});

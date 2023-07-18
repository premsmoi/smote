import { act, queryByTestId, render, screen } from '@testing-library/react';
import NoteItem from '../src/common/components/noteItem';
import { RecoilRoot } from 'recoil';

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
  return render(
    <RecoilRoot>
      <NoteItem
        note={note}
        onDelete={Promise.resolve}
        onUpdate={Promise.resolve}
      />
    </RecoilRoot>
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
});

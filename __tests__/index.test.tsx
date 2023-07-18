import { render, screen } from '@testing-library/react';
import NoteItem from '../src/common/components/noteItem';
import { RecoilRoot } from 'recoil';

describe('NoteItem', () => {
  it('renders a text', () => {
    render(
      <RecoilRoot>
        <NoteItem
          note={{
            noteId: '1',
            boardId: '1',
            text: 'test',
            x: 0,
            y: 0,
            color: 'yellow',
            updatedTime: Date.now()
          }}
          onDelete={() => Promise.resolve()}
          onUpdate={() => Promise.resolve()}
        />
      </RecoilRoot>
    );

    const text = screen.getByText('test');

    expect(text).toBeInTheDocument();
  });
});

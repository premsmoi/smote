import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import ConfirmationDialog from '@src/components/dialogs/confirmation';
import { ReactNode } from 'react';

export const renderApp = (chidren: ReactNode) => {
  return render(
    <RecoilRoot>
      {chidren}
      <ConfirmationDialog />
    </RecoilRoot>
  );
};

describe('App', () => {
  it('should render correctly', () => {
    renderApp(<div>TEST</div>);
    const text = screen.getByText('TEST');

    expect(text).toBeInTheDocument();
  });
});

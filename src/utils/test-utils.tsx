import React from 'react';
import { render } from '@testing-library/react';
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

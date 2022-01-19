import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from '@metromile-ebs/ebs-tui';

// how to wrap all tests in the ThemeProvider.
// https://testing-library.com/docs/react-testing-library/setup
const ProviderWrapper = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: ProviderWrapper, ...options });

// resovles issue with document.createRange called by Base when
// creating popovers. Answer found here https://stackoverflow.com/a/60616862
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

import React from 'react';
import { render, screen, } from '@testing-library/react';
import App from './App';

describe("<App />", () => {
  it("Renders <App /> name", async () => {
    render(<App />);
    const linkElement = screen.getByText(/News Articles/i);
    expect(linkElement).toBeInTheDocument();
  });
});
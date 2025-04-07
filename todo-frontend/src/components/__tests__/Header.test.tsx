import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header Component', () => {
  it('renders the logo image', () => {
    render(<Header />);
    const logo = screen.getByAltText('Todo-Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'https://cdn-icons-png.flaticon.com/128/4472/4472515.png');
  });

  it('renders the app title', () => {
    render(<Header />);
    const title = screen.getByText('To-Do App');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-2xl');
  });

  it('has correct styling classes', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('bg-blue-600');
    expect(headerElement).toHaveClass('text-white');
    expect(headerElement).toHaveClass('flex');
  });
});

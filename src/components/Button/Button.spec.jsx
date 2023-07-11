import { render, screen } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';

describe('<Button />', () => {
  it('should render the button with the text "Load More"', () => {
    render(<Button text="Load More" />);

    expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load More" onCLick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });
    userEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('should be disabled when disabled is true', () => {
    render(<Button text="Load More" disabled={true} />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeDisabled();
  });

  it('should enabled when disabled is false', () => {
    render(<Button text="Load More" disabled={false} />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeEnabled();
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Load More" onCLick={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

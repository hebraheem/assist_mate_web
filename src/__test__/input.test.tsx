import { render, fireEvent, screen } from '@testing-library/react';

import Input from 'src/components/forms/Input';
import { act } from 'react';

describe('Input Component', () => {
  const baseProps = {
    id: 'testInput',
    label: 'Test Input',
    required: true,
    onChange: jest.fn(),
    placeholder: 'Enter your text',
  };

  test('renders Input component', () => {
    render(<Input {...baseProps} value="" />);
    expect(screen.getByText(/test input/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your text')).toBeInTheDocument();
  });

  test('shows error message when required field is empty and blurred', () => {
    render(<Input {...baseProps} value="" />);

    const input = screen.getByTestId(/testInput/i);

    act(() => {
      fireEvent.blur(input);
    });
    expect(screen.getByText('Test Input is required')).toBeInTheDocument();
  });

  test('does not show error when field is not required and blurred', () => {
    render(<Input {...baseProps} value="" required={false} />);

    const input = screen.getByTestId(/testInput/i);
    act(() => {
      fireEvent.blur(input);
    });

    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
  });

  test('calls onChange when user types in input', () => {
    render(<Input {...baseProps} value="" />);

    const input = screen.getByTestId(/testInput/i);

    act(() => {
      fireEvent.change(input, { target: { value: 'New value' } });
    });

    expect(baseProps.onChange).toHaveBeenCalledWith(expect.anything());
  });

  test('renders password field with toggle', () => {
    render(<Input {...baseProps} value="" type="password" />);

    const input = screen.getByTestId(/testInput/i);
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(input).toHaveAttribute('type', 'text');

    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(input).toHaveAttribute('type', 'password');
  });

  test('displays pattern validation error', () => {
    const pattern = '^[A-Za-z]+$'; // Pattern to accept only alphabets

    render(<Input {...baseProps} value="12345" pattern={pattern} />);

    const input = screen.getByTestId(/testInput/i);
    act(() => {
      fireEvent.blur(input);
    });
    expect(screen.getByText('Test Input does not match specified pattern')).toBeInTheDocument();
  });

  test('validates and displays no errors when input is correct and pattern is satisfied', () => {
    const pattern = '^[A-Za-z]+$'; // Pattern to accept only alphabets

    render(<Input {...baseProps} value="ValidInput" pattern={pattern} />);

    const input = screen.getByTestId(/testInput/i);
    act(() => {
      fireEvent.blur(input);
    });
    expect(screen.queryByText('Test Input is required')).not.toBeInTheDocument();
    expect(screen.queryByText(/does not match specified pattern/)).not.toBeInTheDocument();
  });

  test('renders endAdornment if provided', () => {
    const EndAdornment = () => <span data-testid="endAdornment">END</span>;

    render(<Input {...baseProps} value="" endAdornment={EndAdornment} />);

    expect(screen.getByTestId('endAdornment')).toBeInTheDocument();
  });
});

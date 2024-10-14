import { render, fireEvent, screen } from '@testing-library/react';
import Textarea from 'src/components/forms/Textarea';
import { separateAndCapitalize } from 'src/utils/methods/helpers';

describe('Textarea Component', () => {
  const baseProps = {
    id: 'textareaTest',
    label: 'Enter description',
    onChange: jest.fn(),
    value: '',
    placeholder: 'Type something...',
    required: true,
  };

  test('renders the textarea component with a label', () => {
    render(<Textarea {...baseProps} />);

    const label = screen.getByText(baseProps.label);
    const textarea = screen.getByPlaceholderText(baseProps.placeholder);

    expect(label).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
  });

  test('calls onChange when text is entered', () => {
    render(<Textarea {...baseProps} />);

    const textarea: HTMLInputElement = screen.getByPlaceholderText(baseProps.placeholder);
    fireEvent.change(textarea, { target: { value: 'Test input' } });

    expect(baseProps.onChange).toHaveBeenCalledTimes(1);
  });

  test('shows validation error when required and value is empty', () => {
    render(<Textarea {...baseProps} />);

    const textarea = screen.getByPlaceholderText(baseProps.placeholder);
    fireEvent.focus(textarea);
    fireEvent.blur(textarea); // Trigger blur event to validate

    const errorMessage = screen.getByText(`${separateAndCapitalize(baseProps.id)} is required`);
    expect(errorMessage).toBeInTheDocument();
  });

  test('does not show validation error when a valid value is entered', () => {
    const updatedProps = { ...baseProps, value: 'Valid input' };
    render(<Textarea {...updatedProps} />);

    const textarea = screen.getByPlaceholderText(baseProps.placeholder);
    fireEvent.blur(textarea); // Trigger blur event

    const errorMessage = screen.queryByText(`${baseProps.label} is required`);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('handles focus and blur events correctly', () => {
    const focusEvent = jest.fn();
    const blurEvent = jest.fn();

    const updatedProps = { ...baseProps, focusedEvent: focusEvent, blurEvent: blurEvent };
    render(<Textarea {...updatedProps} />);

    const textarea = screen.getByPlaceholderText(baseProps.placeholder);

    fireEvent.focus(textarea);
    expect(focusEvent).toHaveBeenCalledTimes(1);

    fireEvent.blur(textarea);
    expect(blurEvent).toHaveBeenCalledTimes(1);
  });

  test('renders with additional class names', () => {
    const updatedProps = { ...baseProps, className: 'custom-class', wrapperClass: 'wrapper-class' };
    const { container } = render(<Textarea {...updatedProps} />);

    const textareaWrapper = container.querySelector('.wrapper-class');
    const textarea = container.querySelector('.custom-class');

    expect(textareaWrapper).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
  });

  test('updates isTouched when textarea receives focus', () => {
    render(<Textarea {...baseProps} />);

    const textarea = screen.getByPlaceholderText(baseProps.placeholder);
    fireEvent.focus(textarea);

    const errorMessage = screen.queryByText(`${baseProps.label} is required`);
    expect(errorMessage).not.toBeInTheDocument(); // Should not show error on focus
  });
});

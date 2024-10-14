import { render, fireEvent, screen } from '@testing-library/react';
import Select from 'src/components/forms/Select';
import { separateAndCapitalize } from 'src/utils/methods/helpers';

describe('Select Component', () => {
  const baseProps = {
    id: 'selectTest',
    label: 'Select a value',
    onChange: jest.fn(),
    required: true,
    placeholder: 'Select a value',
    value: '',
    renderOptions: () => (
      <>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </>
    ),
  };

  test('renders the select component with a label', () => {
    render(<Select {...baseProps} />);

    const label = screen.getByText(baseProps.label);
    const select = screen.getByTestId(baseProps.id);

    expect(label).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });

  test('renders options passed via renderOptions', () => {
    render(<Select {...baseProps} />);

    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  test('calls onChange when an option is selected', () => {
    render(<Select {...baseProps} />);

    const select = screen.getByTestId(baseProps.id);
    fireEvent.change(select, { target: { value: 'option1' } });

    expect(baseProps.onChange).toHaveBeenCalledTimes(1);
    // @ts-ignore
    expect(select.value).toBe('option1');
  });

  test('shows validation error when required and no value is selected', () => {
    render(<Select {...baseProps} />);

    const select = screen.getByTestId(baseProps.id);
    fireEvent.blur(select); // Trigger blur event

    const errorMessage = screen.queryByText(`${separateAndCapitalize(baseProps.id)} is required`);
    expect(errorMessage).toBeInTheDocument();
  });

  test('does not show error when a valid option is selected', () => {
    const updatedProps = { ...baseProps, value: 'option1' };
    render(<Select {...updatedProps} />);

    const select = screen.getByTestId(baseProps.id);
    fireEvent.blur(select); // Trigger blur event

    const errorMessage = screen.queryByText(`${baseProps.label} is required`);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('displays a blank option when showEmpty is true', () => {
    const updatedProps = { ...baseProps, showEmpty: true };
    render(<Select {...updatedProps} />);

    const emptyOption = screen.getByRole('option', { name: '' });
    expect(emptyOption).toBeInTheDocument();
  });

  test('sets isTouched when the select receives focus', () => {
    render(<Select {...baseProps} />);

    const select = screen.getByTestId(baseProps.id);
    fireEvent.focus(select);

    // After focus, we expect the validation to not trigger (as it hasn't blurred yet)
    const errorMessage = screen.queryByText(`${baseProps.label} is required`);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('handles focus and blur events correctly', () => {
    const focusEvent = jest.fn();
    const blurEvent = jest.fn();

    render(<Select {...baseProps} focusedEvent={focusEvent} blurEvent={blurEvent} />);

    const select = screen.getByTestId(baseProps.id);

    fireEvent.focus(select);
    expect(focusEvent).toHaveBeenCalledTimes(1);

    fireEvent.blur(select);
    expect(blurEvent).toHaveBeenCalledTimes(1);
  });
});

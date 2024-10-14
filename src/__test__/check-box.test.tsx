import { render, fireEvent, screen } from '@testing-library/react';
import CheckBox from 'src/components/forms/check-box';
import { separateAndCapitalize } from 'src/utils/methods/helpers';

describe('CheckBox Component', () => {
  const baseProps = {
    id: 'agreeToTerms',
    label: 'Agree to terms and conditions',
    onChange: jest.fn(),
    required: true,
    checked: false,
  };

  test('renders checkbox with correct label', () => {
    render(<CheckBox {...baseProps} />);

    const checkbox = screen.getByLabelText(baseProps.label);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  test('renders with the correct checked state', () => {
    const { rerender } = render(<CheckBox {...baseProps} checked={false} />);
    let checkbox = screen.getByLabelText(baseProps.label);
    expect(checkbox).not.toBeChecked();

    rerender(<CheckBox {...baseProps} checked={true} />);
    checkbox = screen.getByLabelText(baseProps.label);
    expect(checkbox).toBeChecked();
  });

  test('calls onChange handler when clicked', () => {
    render(<CheckBox {...baseProps} />);

    const checkbox = screen.getByLabelText(baseProps.label);

    fireEvent.click(checkbox);

    expect(baseProps.onChange).toHaveBeenCalledTimes(1);
  });

  test('does not show error when checkbox is checked', () => {
    const updatedProps = { ...baseProps, checked: true };
    render(<CheckBox {...updatedProps} />);

    const checkbox = screen.getByLabelText(baseProps.label);
    fireEvent.click(checkbox); // Check the checkbox

    const errorMessage = screen.queryByText(`${baseProps.label} is required`);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('validation error appears only after interaction (isDirty)', () => {
    render(<CheckBox {...baseProps} />);

    // Before interaction
    let errorMessage = screen.queryByText(`${baseProps.label} is required`);
    expect(errorMessage).not.toBeInTheDocument();

    // Simulate checkbox interaction
    const checkbox = screen.getByLabelText(baseProps.label);
    fireEvent.click(checkbox);
    fireEvent.blur(checkbox);

    // After interaction
    errorMessage = screen.queryByText(`${separateAndCapitalize(baseProps.id)} is required`);
    expect(errorMessage).toBeInTheDocument();
  });

  test('label is associated with the checkbox input', () => {
    render(<CheckBox {...baseProps} />);

    const label = screen.getByText(baseProps.label);
    const checkbox = screen.getByLabelText(baseProps.label);

    expect(label).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('id', baseProps.id);
  });
});

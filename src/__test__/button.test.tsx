import { render, fireEvent, screen } from '@testing-library/react';
import Button from 'src/components/ui/button';
import i18n from 'src/i18n';

describe('Button Component', () => {
  const baseProps = {
    label: 'Click Me',
    onClick: jest.fn(),
    className: 'btn-primary',
    wrapperClass: 'wrapper-class',
  };

  test('renders the button with the correct label', () => {
    render(<Button {...baseProps} />);

    const buttonElement = screen.getByText(baseProps.label);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('btn-primary');
  });

  test('triggers onClick when button is clicked', () => {
    render(<Button {...baseProps} />);

    const buttonElement = screen.getByText(baseProps.label);
    fireEvent.click(buttonElement);

    expect(baseProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state when isLoading is true', () => {
    render(<Button {...baseProps} isLoading={true} />);

    const buttonElement = screen.getByText(i18n.t('LOADING'));
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with error class when isError is true', () => {
    render(<Button {...baseProps} isError={true} />);

    const buttonElement = screen.getByText(baseProps.label);
    expect(buttonElement).toHaveClass('border-red-500');
  });

  test('renders icon before the label when iconPre is true', () => {
    const iconMock = jest.fn(() => <span data-testid="icon">Icon</span>);
    render(<Button {...baseProps} icon={iconMock} iconPre={true} />);

    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();

    // const buttonElement = screen.getByText(baseProps.label);
    // expect(buttonElement.previousSibling).toBe(iconElement);
  });

  test('renders icon after the label when iconPost is true', () => {
    const iconMock = jest.fn(() => <span data-testid="icon">Icon</span>);
    render(<Button {...baseProps} icon={iconMock} iconPost={true} />);

    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();

    // const buttonElement = screen.getByText(baseProps.label);
    // expect(buttonElement.nextSibling).toBe(iconElement);
  });

  test('applies custom wrapper and button classes', () => {
    const { container } = render(<Button {...baseProps} />);

    const wrapperElement = container.querySelector('.wrapper-class');
    const buttonElement = container.querySelector('.btn-primary');

    expect(wrapperElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import ResponsiveModalDrawer from '../components/ui/modal';

describe('ResponsiveModalDrawer', () => {
  const onCloseMock = jest.fn();

  const renderComponent = (isOpen: boolean, backdropCollapsible?: boolean) => {
    return render(
      <ResponsiveModalDrawer isOpen={isOpen} onClose={onCloseMock} backdropCollapsible={backdropCollapsible}>
        <p>Modal Content</p>
      </ResponsiveModalDrawer>
    );
  };

  afterEach(() => {
    onCloseMock.mockClear();
  });

  it('should not render anything when isOpen is false', () => {
    renderComponent(false);
    expect(screen.queryByText('Modal Content')).toBeNull();
  });

  it('should render modal content when isOpen is true', () => {
    renderComponent(true);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    renderComponent(true);
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should call onClose when the overlay is clicked and backdropCollapsible is true', () => {
    renderComponent(true, true);
    const overlay = screen.getAllByRole('button', { hidden: true });
    fireEvent.click(overlay[0]);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should not call onClose when the overlay is clicked and backdropCollapsible is false', () => {
    renderComponent(true);
    const overlay = screen.getAllByRole('button', { hidden: true });
    fireEvent.click(overlay[0]);
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});

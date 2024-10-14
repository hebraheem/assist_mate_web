import { render, screen, fireEvent } from '@testing-library/react';
import MenubarComponent from 'src/components/ui/menu-bar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Menubar from '@radix-ui/react-menubar';

describe('MenubarComponent', () => {
  const menuTrigger = 'Open Menu';
  const menubarItems = [
    {
      key: 'item1',
      label: 'Item 1',
      icon: <span>🔗</span>,
      itemProp: { 'aria-label': 'MenuItem 1' },
    },
    {
      key: 'item2',
      label: 'Item 2',
      icon: <span>📁</span>,
      itemProp: { 'aria-label': 'MenuItem 2' },
      subContent: [
        {
          key: 'subItem1',
          label: 'Sub Item 1',
          icon: <span>📄</span>,
          itemProp: { 'aria-label': 'SubMenuItem 1' },
        },
      ],
    },
  ];

  it('should render MenubarComponent with menu trigger', () => {
    render(<MenubarComponent menuTrigger={menuTrigger} menubarItems={menubarItems} />);
    expect(screen.getByText(menuTrigger)).toBeInTheDocument();
  });

  it('should open the menubar content when the trigger is clicked', async () => {
    render(<MenubarComponent menuTrigger={menuTrigger} menubarItems={menubarItems} />);

    const trigger = screen.getByText(menuTrigger);
    fireEvent.click(trigger);

    // expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
    // expect(screen.getByText(/Item 2/i)).toBeInTheDocument();
  });

  //   it('should handle item click correctly', () => {
  //     const handleClick = jest.fn();
  //     const testItems = [
  //       {
  //         key: 'item1',
  //         label: 'Item 1',
  //         icon: <span>🔗</span>,
  //         itemProp: { 'aria-label': 'MenuItem 1', onClick: handleClick },
  //       },
  //     ];

  //     render(<MenubarComponent menuTrigger={menuTrigger} menubarItems={testItems} />);

  //     fireEvent.click(screen.getByText(menuTrigger));
  //     fireEvent.click(screen.getByText('Item 1'));

  //     expect(handleClick).toHaveBeenCalledTimes(1);
  //   });

  //   it('should render submenus correctly', () => {
  //     render(<MenubarComponent menuTrigger={menuTrigger} menubarItems={menubarItems} />);

  //     fireEvent.click(screen.getByText(menuTrigger));
  //     expect(screen.getByText('Item 2')).toBeInTheDocument();

  //     fireEvent.click(screen.getByText('Item 2'));
  //     expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
  //   });

  //   it('should render submenu icons correctly', () => {
  //     render(<MenubarComponent menuTrigger={menuTrigger} menubarItems={menubarItems} />);

  //     fireEvent.click(screen.getByText(menuTrigger));
  //     fireEvent.click(screen.getByText('Item 2'));

  //     expect(screen.getByText('📄')).toBeInTheDocument(); // Submenu icon
  //     expect(screen.getByText('Sub Item 1')).toBeInTheDocument(); // Submenu label
  //   });

  //   it('should close the menubar when clicking outside', () => {
  //     render(
  //       <div>
  //         <MenubarComponent menuTrigger={menuTrigger} menubarItems={menubarItems} />
  //         <div data-testid="outside-element">Outside</div>
  //       </div>
  //     );

  //     fireEvent.click(screen.getByText(menuTrigger));
  //     expect(screen.getByText('Item 1')).toBeInTheDocument();

  //     fireEvent.click(screen.getByTestId('outside-element'));
  //     expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  //   });
});

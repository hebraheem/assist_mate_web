import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from '../components/ui/tab';

const tabsData = [
  { label: 'Tab 1', content: 'Content for Tab 1' },
  { label: 'Tab 2', content: 'Content for Tab 2' },
  { label: 'Tab 3', content: 'Content for Tab 3' },
];

describe('Tabs Component', () => {
  it('renders the tabs correctly', () => {
    render(<Tabs tabs={tabsData} />);

    // Check if all tabs are rendered
    tabsData.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });

    // Initially, the first tab's content should be visible
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
  });

  it('switches content on tab click', () => {
    render(<Tabs tabs={tabsData} />);

    // Click on "Tab 2"
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument(); // Tab 1 content should not be there

    // Click on "Tab 3"
    fireEvent.click(screen.getByText('Tab 3'));
    expect(screen.getByText('Content for Tab 3')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument(); // Tab 2 content should not be there
  });

  it('supports keyboard navigation', () => {
    render(<Tabs tabs={tabsData} />);

    const firstTab = screen.getByText('Tab 1');
    const secondTab = screen.getByText('Tab 2');

    // Focus on the first tab
    firstTab.focus();
    expect(firstTab).toHaveFocus();

    // Simulate "ArrowRight" key to move to the second tab
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
    expect(secondTab).toHaveFocus();

    // Simulate "Enter" key to activate the second tab
    fireEvent.keyDown(secondTab, { key: 'Enter' });
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
  });

  it('wraps around keyboard navigation', () => {
    render(<Tabs tabs={tabsData} />);

    const firstTab = screen.getByText('Tab 1');
    const lastTab = screen.getByText('Tab 3');

    // Focus on the first tab
    firstTab.focus();
    expect(firstTab).toHaveFocus();

    // Simulate "ArrowLeft" key to wrap around to the last tab
    fireEvent.keyDown(firstTab, { key: 'ArrowLeft' });
    expect(lastTab).toHaveFocus();
  });
});

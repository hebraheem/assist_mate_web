import { render, screen, fireEvent } from '@testing-library/react';
import { Option } from 'src/@types/form-fields';
import MultiSelect from '../components/forms/multi-select';

describe('MultiSelect Component', () => {
  const options: Option[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  const onChangeMock = jest.fn();

  test('renders MultiSelect with placeholder', () => {
    render(
      <MultiSelect
        id="multi_select"
        options={options}
        values={[]}
        onChange={onChangeMock}
        placeholder="Select items"
        label="MultiSelect Dropdown"
      />
    );

    // Check if placeholder text is displayed
    expect(screen.getByText('Select items')).toBeInTheDocument();
  });

  test('opens dropdown when clicked', () => {
    render(
      <MultiSelect
        values={[]}
        label="multi"
        id="multi_select"
        options={options}
        onChange={onChangeMock}
        placeholder="Select items"
      />
    );

    // Check if the dropdown opens when clicking the button
    const dropdownToggle = screen.getByText('Select items');
    fireEvent.click(dropdownToggle);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('selects and deselects an option', () => {
    render(
      <MultiSelect
        label="multi"
        id="multi_select_2"
        values={[]}
        options={options}
        onChange={onChangeMock}
        placeholder="Select items"
      />
    );

    // Open the dropdown
    const dropdownToggle = screen.getByText('Select items');
    fireEvent.click(dropdownToggle);

    // Select the first option
    const option1 = screen.getByLabelText('Option 1');
    fireEvent.click(option1);
    expect(onChangeMock).toHaveBeenCalledWith([{ label: 'Option 1', value: '1' }]);

    // Check if selected item appears as a badge
    expect(screen.getByTestId('Option 1')).toBeInTheDocument();

    // Deselect the first option
    fireEvent.click(option1);
    expect(onChangeMock).toHaveBeenCalledWith([]);
  });

  test('filters options based on search input', () => {
    render(
      <MultiSelect
        values={[]}
        label="multi"
        id="multi_select"
        options={options}
        onChange={onChangeMock}
        placeholder="Select items"
      />
    );

    // Open the dropdown
    const dropdownToggle = screen.getByText('Select items');
    fireEvent.click(dropdownToggle);

    // Type in the search input to filter options
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Option 2' } });

    // Check if only the filtered option is displayed
    expect(screen.queryByLabelText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Option 3')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  test('values are prefilled when available', () => {
    render(
      <MultiSelect
        values={['1', '3']}
        label="multi"
        id="multi_select"
        options={options}
        onChange={onChangeMock}
        placeholder="Select items"
      />
    );

    // check if available are selected
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });
});

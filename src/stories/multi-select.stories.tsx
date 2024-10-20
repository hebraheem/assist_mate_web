// MultiSelect.stories.tsx
import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import MultiSelect from '../components/forms/multi-select';
import { MultiSelectProps, Option } from '../@types/form-fields';

export default {
  title: 'Form/MultiSelect',
  component: MultiSelect,
} as Meta;

const Template: StoryFn<MultiSelectProps> = (args: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleSelectionChange = (newSelected: Option[]) => {
    setSelectedOptions(newSelected);
  };

  return (
    <MultiSelect
      {...args}
      onChange={handleSelectionChange}
      options={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
        { label: 'Option 4', value: '4' },
        { label: 'Option 5', value: '5' },
      ]}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select items',
  label: 'MultiSelect Dropdown',
  required: true,
};

export const WithPreSelectedItems = Template.bind({});
WithPreSelectedItems.args = {
  placeholder: 'Select items',
  label: 'MultiSelect Dropdown',
  values: ['1', '3'],
  required: true,
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
};

export const WithRequiredFalse = Template.bind({});
WithRequiredFalse.args = {
  placeholder: 'Select items',
  label: 'MultiSelect not required',
  required: false,
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
};

export const WithRequired = Template.bind({});
WithRequired.args = {
  placeholder: 'Select items',
  label: 'MultiSelect required',
  required: true,
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
};

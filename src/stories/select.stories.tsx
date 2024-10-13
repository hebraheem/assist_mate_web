import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Select from '../components/forms/Select';
import { ISelectProps } from '../@types/form-fields';

// Default export setting up the metadata for Storybook
export default {
  title: 'Form/Select', // Folder and name in the Storybook sidebar
  component: Select,
  argTypes: {
    onChange: { action: 'changed' },
    label: { control: 'text' },
    value: { control: 'text' },
    required: { control: 'boolean' },
    showEmpty: { control: 'boolean' },
  },
} as Meta<typeof Select>;

// Template to create instances of the Select component
const Template: StoryFn<ISelectProps & JSX.IntrinsicElements['select']> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <Select
      {...args}
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
      renderOptions={() => (
        <>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </>
      )}
    />
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  label: 'Select Option',
  showEmpty: true,
  required: true,
};

// Story with preset value
export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Select Option',
  value: 'option2',
  required: true,
  showEmpty: false,
};

// Story without the required field
export const NotRequired = Template.bind({});
NotRequired.args = {
  label: 'Select Option',
  required: false,
  showEmpty: true,
};

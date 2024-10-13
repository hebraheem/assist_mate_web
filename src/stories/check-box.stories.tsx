import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ICheckInputProps } from '../@types/form-fields';
import CheckBox from '../components/forms/check-box';

// Meta configuration for Storybook
export default {
  title: 'Components/CheckBox',
  component: CheckBox,
  argTypes: {
    label: { control: 'text', defaultValue: 'Accept Terms and Conditions' },
    checked: { control: 'boolean', defaultValue: false },
    required: { control: 'boolean', defaultValue: false },
    className: { control: 'text' },
    wrapperClass: { control: 'text' },
    id: { control: 'text', defaultValue: 'checkbox' },
  },
} as Meta<typeof CheckBox>;

// Template to create instances of the CheckBox component
const Template: StoryFn<ICheckInputProps & JSX.IntrinsicElements['input']> = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);

  return <CheckBox {...args} checked={checked} onChange={(e: any) => setChecked(e.target.checked)} />;
};

// Default story for the CheckBox component
export const Default = Template.bind({});
Default.args = {
  label: 'Accept Terms and Conditions',
  checked: false,
  required: true,
  className: '',
  wrapperClass: '',
};

// Story for the checked state of the CheckBox
export const Checked = Template.bind({});
Checked.args = {
  label: 'I Agree',
  checked: true,
  required: false,
  className: '',
  wrapperClass: '',
};

// Story for the required validation
export const Required = Template.bind({});
Required.args = {
  label: 'I Agree (Required)',
  checked: false,
  required: true,
  className: '',
  wrapperClass: '',
};

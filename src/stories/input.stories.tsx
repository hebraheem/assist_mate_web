import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Input from '../components/forms/Input';

export default {
  title: 'Form/Input', // Folder and name in the Storybook sidebar
  component: Input,
  argTypes: {
    onChange: { action: 'changed' }, // Adding actions for the events
    placeholder: { control: 'text' },
    label: { control: 'text' },
    type: { control: 'text' },
    value: { control: 'text' },
    required: { control: 'boolean' },
    pattern: { control: 'text' },
  },
} as Meta<typeof Input>;

// Template to create instances of the component
const Template: StoryFn<typeof Input> = (args: any) => {
  const [value, setValue] = useState(args.value || '');

  return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

// Default example of the Input component
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text',
  label: 'Username',
  type: 'text',
};

// Password input example
export const PasswordInput = Template.bind({});
PasswordInput.args = {
  placeholder: 'Enter password',
  label: 'Password',
  type: 'password',
  required: true,
};

// Input with validation pattern (e.g., email)
export const EmailInput = Template.bind({});
EmailInput.args = {
  placeholder: 'Enter email',
  label: 'Email',
  type: 'email',
  required: true,
  pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
};

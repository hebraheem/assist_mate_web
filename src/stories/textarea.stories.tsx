import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ITextareaProps } from '../@types/form-fields';
import Textarea from '../components/forms/Textarea';

// Default export that defines the component for Storybook
export default {
  title: 'Form/Textarea', // Folder and name in the Storybook sidebar
  component: Textarea,
  argTypes: {
    onChange: { action: 'changed' }, // Captures onChange events in Storybook actions
    placeholder: { control: 'text' }, // Allows changing the placeholder through the Storybook UI
    label: { control: 'text' }, // Allows changing the label through the Storybook UI
    required: { control: 'boolean' }, // Toggles required field on/off
    value: { control: 'text' }, // Initial value for the textarea
  },
} as Meta<typeof Textarea>;

// Template to create different versions of the Textarea component
const Template: StoryFn<ITextareaProps & JSX.IntrinsicElements['textarea']> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

// Default story for the Textarea component
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter your text here...',
  label: 'Description',
  required: true,
};

// Story with a preset value
export const WithValue = Template.bind({});
WithValue.args = {
  placeholder: 'Enter your text here...',
  label: 'Description',
  value: 'This is some pre-filled text.',
  required: true,
};

// Story with no required validation
export const NotRequired = Template.bind({});
NotRequired.args = {
  placeholder: 'Optional text here...',
  label: 'Notes',
  required: false,
};

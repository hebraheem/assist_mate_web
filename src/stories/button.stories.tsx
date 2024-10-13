import { Meta, StoryFn } from '@storybook/react';
import { IButtonProps } from '../@types/form-fields';
import Button from '../components/ui/button';

// Default export defines metadata for Storybook
export default {
  title: 'Form/Button', // Location of the component in the Storybook sidebar
  component: Button,
  argTypes: {
    label: { control: 'text' }, // Allows modifying the label in the Storybook UI
    onClick: { action: 'clicked' }, // Logs the button click event in Storybook actions
    isError: { control: 'boolean' }, // Toggles error state
    isLoading: { control: 'boolean' }, // Toggles loading state
    iconPre: { control: 'boolean' }, // Toggles showing an icon before the label
    iconPost: { control: 'boolean' }, // Toggles showing an icon after the label
  },
} as Meta<typeof Button>;

// Template to create instances of the Button component
const Template: StoryFn<IButtonProps & JSX.IntrinsicElements['button']> = (args) => <Button {...args} />;

// Default story for the Button component
export const Default = Template.bind({});
Default.args = {
  label: 'Submit',
  isError: false,
  isLoading: false,
  iconPre: false,
  iconPost: false,
};

// Story with error state
export const Error = Template.bind({});
Error.args = {
  label: 'Submit',
  isError: true,
  isLoading: false,
};

// Story with loading state
export const Loading = Template.bind({});
Loading.args = {
  label: 'Submit',
  isLoading: true,
  isError: false,
};

// Story with an icon before the label
export const WithIconPre = Template.bind({});
WithIconPre.args = {
  label: 'Save',
  iconPre: true,
  isLoading: false,
  isError: false,
  icon: () => <span className="material-symbols-outlined">save</span>, // Example icon
};

// Story with an icon after the label
export const WithIconPost = Template.bind({});
WithIconPost.args = {
  label: 'Next',
  iconPost: true,
  isLoading: false,
  isError: false,
  icon: () => <span className="material-symbols-outlined">arrow_forward</span>, // Example icon
};

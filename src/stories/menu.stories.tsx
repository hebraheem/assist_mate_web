import { Meta, StoryFn } from '@storybook/react';
import { ISMenu } from 'src/@types/shadcn';
import { HomeIcon, UserIcon, SettingsIcon } from 'lucide-react'; // Sample icons
import MenubarComponent from '../components/ui/menu-bar';

export default {
  title: 'Components/MenubarComponent', // This defines where the component appears in the Storybook UI
  component: MenubarComponent,
  argTypes: {
    menuTrigger: { control: 'text', defaultValue: 'Menu' },
    menubarItems: { control: 'array' },
    rootClassName: { control: 'text' },
    triggerClass: { control: 'text' },
    contentClass: { control: 'text' },
    itemClass: { control: 'text' },
    iconLabelClass: { control: 'text' },
  },
} as Meta<typeof MenubarComponent> | unknown;

// Template to create instances of the MenubarComponent component
const Template: StoryFn<ISMenu> = (args: any) => <MenubarComponent {...args} />;

// Default story for the MenubarComponent component
export const Default = Template.bind({});
Default.args = {
  menuTrigger: 'Menu',
  menubarItems: [
    {
      key: 'home',
      label: 'Home',
      icon: <HomeIcon />,
      itemProp: {},
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserIcon />,
      itemProp: {},
      subContent: [
        {
          key: 'profile-settings',
          label: 'Settings',
          icon: <SettingsIcon />,
          itemProp: {},
        },
        {
          key: 'profile-logout',
          label: 'Logout',
          icon: <SettingsIcon />,
          itemProp: {},
        },
      ],
    },
  ],
  rootClassName: 'w-48',
  triggerClass: 'bg-gray-100',
  contentClass: '',
  itemClass: '',
  iconLabelClass: 'text-gray-700',
};

// Story with a customized menu
export const Customized = Template.bind({});
Customized.args = {
  menuTrigger: 'Options',
  menubarItems: [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <HomeIcon />,
      itemProp: {},
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      itemProp: {},
      subContent: [
        {
          key: 'account-settings',
          label: 'Account Settings',
          icon: <SettingsIcon />,
          itemProp: {},
        },
        {
          key: 'privacy-settings',
          label: 'Privacy Settings',
          icon: <SettingsIcon />,
          itemProp: {},
        },
      ],
    },
  ],
  rootClassName: 'w-64',
  triggerClass: 'bg-blue-100',
  contentClass: '',
  itemClass: '',
  iconLabelClass: 'text-blue-700',
};

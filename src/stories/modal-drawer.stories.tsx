import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ResponsiveModalDrawer from '../components/ui/modal';

export default {
  title: 'Components/ResponsiveModalDrawer',
  component: ResponsiveModalDrawer,
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    onClose: { action: 'closed' },
    children: { control: 'text' },
  },
} as Meta<typeof ResponsiveModalDrawer>;

const Template: StoryFn<typeof ResponsiveModalDrawer> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    args.onClose();
  };

  return (
    <>
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleOpen}>
        Open {window.innerWidth >= 768 ? 'Modal' : 'Drawer'}
      </button>

      <ResponsiveModalDrawer {...args} isOpen={isOpen} onClose={handleClose}>
        <div className="text-center">
          <h2 className="text-lg font-bold">Hello from the {window.innerWidth >= 768 ? 'Modal' : 'Drawer'}!</h2>
          <p className="mt-4">This is the content inside the {window.innerWidth >= 768 ? 'Modal' : 'Drawer'}.</p>
        </div>
      </ResponsiveModalDrawer>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
  children: 'This is some modal/drawer content!',
};

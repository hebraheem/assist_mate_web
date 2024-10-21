import { Meta, StoryFn } from '@storybook/react';
import Tabs, { TabsProps } from '../components/ui/tab';

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as Meta;

const Template: StoryFn<TabsProps> = (args: any) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { label: 'Tab 1', content: <div>This is content for Tab 1</div> },
    { label: 'Tab 2', content: <div>This is content for Tab 2</div> },
    { label: 'Tab 3', content: <div>This is content for Tab 3</div> },
  ],
};

export const WithLongContent = Template.bind({});
WithLongContent.args = {
  tabs: [
    { label: 'Tab A', content: <div>This is a long content section for Tab A. Add more text here...</div> },
    { label: 'Tab B', content: <div>Another tab with some other long content for Tab B. Keep adding text.</div> },
  ],
};

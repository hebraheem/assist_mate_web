import React, { RefAttributes } from 'react';
import * as Menubar from '@radix-ui/react-menubar';

export interface ISMenu {
  menu?: Menubar.MenubarMenuProps;
  rootClassName?: classname;
  triggerClass?: classname;
  contentClass?: classname;
  itemClass?: classname;
  iconLabelClass?: classname;
  menuTrigger:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal;
  root?: Menubar.MenubarProps & RefAttributes<HTMLDivElement>;
  trigger?: Menubar.MenubarTriggerProps & RefAttributes<HTMLButtonElement>;
  contentProp?: Menubar.MenubarContentProps & RefAttributes<HTMLDivElement>;
  menubarItems: {
    label: string;
    key: string;
    icon?: any;
    itemProp?: Menubar.MenubarItemProps & RefAttributes<HTMLDivElement>;
    itemClass?: classname;
    subContent?: {
      label: string;
      key: string;
      icon?: any;
      subItemClass?: classname;
      itemProp?: Menubar.MenubarSubContentProps & RefAttributes<HTMLDivElement>;
    }[];
  }[];
}

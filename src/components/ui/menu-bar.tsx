import * as Menubar from '@radix-ui/react-menubar';
import { ChevronRightIcon } from 'lucide-react';
import React from 'react';
import { ISMenu } from 'src/@types/shadcn';

const MenubarDemo = ({
  menu,
  rootClassName,
  root,
  triggerClass,
  menuTrigger,
  trigger,
  contentClass,
  contentProp = { align: 'end', alignOffset: 2 },
  itemClass,
  menubarItems,
  iconLabelClass,
}: ISMenu) => {
  return (
    <Menubar.Root {...root} className={`${rootClassName ?? ''}`}>
      <Menubar.Menu {...menu}>
        <Menubar.Trigger
          {...trigger}
          className={`flex items-center justify-between gap-0.5 px-3 py-2 font-medium leading-none outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4 ${triggerClass ?? ''}`}
        >
          {menuTrigger}
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            {...contentProp}
            className={`min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] ${contentClass ?? ''}`}
          >
            {menubarItems.map((item) => {
              return (
                <React.Fragment key={item.key}>
                  {!item?.subContent?.length && (
                    <Menubar.Item
                      {...item?.itemProp}
                      role="button"
                      className={`group relative outline-none rounded p-2 hover:bg-slate-50 ${itemClass ?? ''} ${item?.itemClass ?? ''}`}
                    >
                      <div className={`flex justify-start gap-3 items-center ${iconLabelClass ?? ''}`}>
                        {item?.icon} {item.label}
                      </div>
                    </Menubar.Item>
                  )}
                  {item?.subContent?.length &&
                    item.subContent.map((subItem) => {
                      return (
                        <Menubar.Sub key={subItem.key}>
                          <Menubar.SubTrigger
                            role="button"
                            className={`flex outline-none items-center justify-between p-2 font-medium hover:bg-slate-50 ${triggerClass ?? ''}`}
                          >
                            <div className={`flex gap-3 justify-start items-center ${iconLabelClass ?? ''}`}>
                              {item?.icon} {item.label}
                            </div>
                            <ChevronRightIcon />
                          </Menubar.SubTrigger>
                          <Menubar.Portal>
                            <Menubar.SubContent
                              {...subItem?.itemProp}
                              className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                              alignOffset={-5}
                            >
                              <Menubar.Item
                                className={`group outline-none relative rounded p-2 hover:bg-slate-50 flex gap-3 justify-start items-center ${iconLabelClass ?? ''} ${itemClass ?? ''} ${subItem?.subItemClass ?? ''}`}
                              >
                                {subItem?.icon} {subItem.label}
                              </Menubar.Item>
                            </Menubar.SubContent>
                          </Menubar.Portal>
                        </Menubar.Sub>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default MenubarDemo;

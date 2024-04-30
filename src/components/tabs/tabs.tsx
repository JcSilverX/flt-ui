import React from "react";
import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import TabsContext from "@/context/tabs-context-provider";
import useTabsContext from "@/lib/hooks/use-tabs-context";
import useControllableState from "@/lib/hooks/use-controllable-state";

const TabsProvider = TabsContext.Provider;

type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement> | undefined;
  orientation?: "horizontal" | "vertical" | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: React.Dispatch<React.SetStateAction<string>> | undefined;
  activationMode?: "automatic" | "manual" | undefined;
};

export default function Tabs({
  value: valueProp,
  onValueChange,
  defaultValue,
  className,
  ...props
}: TabsProps) {
  const { reference: ref } = props;

  // state
  const baseId = React.useId();

  // derived state

  // event handlers/actions
  const [value, setValue] = useControllableState({
    prop: valueProp,
    onChange: onValueChange as React.Dispatch<React.SetStateAction<string>>,
    defaultProp: defaultValue as string,
  });

  return (
    <TabsProvider value={{ baseId, value, setValue }}>
      <div ref={ref} className={cn("", className, {})} {...props} />
    </TabsProvider>
  );
}

type TabsListProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement> | undefined;
};

export function TabsList({ className, ...props }: TabsListProps) {
  const { reference: ref } = props;

  return (
    <div
      ref={ref}
      role="tablist"
      className={cn("", className, {})}
      {...props}
    />
  );
}

type TabsTriggerProps = ButtonProps & {
  value?: string | undefined;
};

export function TabsTrigger({ value, className, ...props }: TabsTriggerProps) {
  const { baseId, value: contextValue, setValue } = useTabsContext();

  // state
  const validValue: string = typeof value === "string" ? value : "";
  const triggerId: string = makeTriggerId(baseId, validValue);
  const contentId: string = makeContentId(baseId, validValue);
  const isSelected: boolean = value === contextValue;

  // event handlers / actions
  const handleClick = (): void => setValue(validValue);

  return (
    <Button
      id={`jsx-${triggerId}`}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`jsx-${contentId}`}
      tabIndex={-1}
      onClick={handleClick}
      {...props}
    />
  );
}

type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement> | undefined;
  value?: string | undefined;
};

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { reference: ref } = props;
  const { baseId, value: contextValue } = useTabsContext();

  // state
  const validValue: string = typeof value === "string" ? value : "";
  const triggerId: string = makeTriggerId(baseId, validValue);
  const contentId: string = makeContentId(baseId, validValue);
  const isSelected: boolean = value === contextValue;

  return (
    <div
      ref={ref}
      id={`jsx-${contentId}`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`jsx-${triggerId}`}
      className={cn("", className, {})}
      hidden={!isSelected}
      {...props}
    />
  );
}

const makeTriggerId = (baseId: string, value: string) => {
  return `${baseId}-trigger-${value}`;
};

const makeContentId = (baseId: string, value: string) => {
  return `${baseId}-content-${value}`;
};

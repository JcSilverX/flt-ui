import cn from "@/lib/utils/cn";
import { ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import Dropdown, {
  DropdownMenu,
  DropdownMenuItem,
  DropdownTrigger,
} from "../dropdown/dropdown";

export function BreadcrumbExample1() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Dropdown>
            <DropdownTrigger
              variant={"ghost"}
              className="flex items-center gap-1"
            >
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownTrigger>

            <DropdownMenu>
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenu>
          </Dropdown>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>Breadcrumb</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

type BreadcrumbProps = React.HTMLAttributes<HTMLElement> & {
  reference?: React.RefObject<HTMLElement>;
};

export default function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  const { reference: ref } = props;

  return (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn("", className, {})}
      {...props}
    />
  );
}

type BreadcrumbItemProps = React.HTMLAttributes<HTMLLIElement> & {
  reference?: React.RefObject<HTMLLIElement>;
};

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  const { reference: ref } = props;

  return (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className, {})}
      {...props}
    />
  );
}

type BreadcrumbListProps = React.HTMLAttributes<HTMLOListElement> & {
  reference?: React.RefObject<HTMLOListElement>;
};

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  const { reference: ref } = props;

  return (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-900 sm:gap-2.5",
        className,
        {}
      )}
      {...props}
    />
  );
}

type BreadcrumbLinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  reference?: React.RefObject<HTMLAnchorElement>;
};

export function BreadcrumbLink({ className, ...props }: BreadcrumbLinkProps) {
  const { reference: ref } = props;

  return (
    <a
      ref={ref}
      className={cn("transition-colors hover:text-gray-950", className, {})}
      {...props}
    />
  );
}

type BreadcrumbPageProps = React.HTMLAttributes<HTMLSpanElement> & {
  reference?: React.RefObject<HTMLSpanElement>;
};

export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  const { reference: ref } = props;

  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-gray-950", className, {})}
      {...props}
    />
  );
}

type BreadcrumbSeparatorProps = React.HTMLAttributes<HTMLLIElement> & {
  reference?: React.RefObject<HTMLLIElement>;
};

export function BreadcrumbSeparator({
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  const { children, reference: ref } = props;

  return (
    <li ref={ref} className={cn("[&>svg]:size-3.5", className, {})} {...props}>
      {children ?? <ChevronRightIcon />}
    </li>
  );
}

type BreadcrumbEllipsisProps = React.HTMLAttributes<HTMLSpanElement> & {
  reference?: React.RefObject<HTMLSpanElement>;
};

export function BreadcrumbEllipsis({
  className,
  ...props
}: BreadcrumbEllipsisProps) {
  const { reference: ref } = props;
  return (
    <span
      ref={ref}
      role="presentation"
      aria-hidden={true}
      className={cn("flex h-9 w-9 items-center justify-center", className, {})}
      {...props}
    >
      <DotsHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

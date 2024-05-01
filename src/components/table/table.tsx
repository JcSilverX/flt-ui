import cn from "@/lib/utils/cn";
import React from "react";

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  reference?: React.RefObject<HTMLTableElement>;
};

export default function Table({ className, ...props }: TableProps) {
  const { reference: ref } = props;

  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className, {})}
        {...props}
      />
    </div>
  );
}

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  reference?: React.RefObject<HTMLTableSectionElement>;
};

export function TableHeader({ className, ...props }: TableHeaderProps) {
  const { reference: ref } = props;

  return (
    <thead
      ref={ref}
      className={cn("[&_tr]:border-b", className, {})}
      {...props}
    />
  );
}

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  reference?: React.RefObject<HTMLTableSectionElement>;
};

export function TableBody({ className, ...props }: TableBodyProps) {
  const { reference: ref } = props;

  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className, {})}
      {...props}
    />
  );
}

type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  reference?: React.RefObject<HTMLTableSectionElement>;
};

export function TableFooter({ className, ...props }: TableFooterProps) {
  const { reference: ref } = props;

  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-black/50 font-medium [&>tr]:last:border-b-0",
        className,
        {}
      )}
      {...props}
    />
  );
}

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  reference?: React.RefObject<HTMLTableCellElement>;
};

export function TableHead({ className, ...props }: TableHeadProps) {
  const { reference: ref } = props;

  return (
    <th
      ref={ref}
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-black/50 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
        {}
      )}
      {...props}
    />
  );
}

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  reference?: React.RefObject<HTMLTableRowElement>;
};

export function TableRow({ className, ...props }: TableRowProps) {
  const { reference: ref } = props;

  return (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-black/50 data-jsx-[state=selected]:",
        className,
        {}
      )}
      {...props}
    />
  );
}

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  reference?: React.RefObject<HTMLTableCellElement>;
};

export function TableCell({ className, ...props }: TableCellProps) {
  const { reference: ref } = props;

  return (
    <td
      ref={ref}
      className={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
        {}
      )}
      {...props}
    />
  );
}

type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement> & {
  reference?: React.RefObject<HTMLTableCaptionElement>;
};

export function TableCaption({ className, ...props }: TableCaptionProps) {
  const { reference: ref } = props;

  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-black/50", className, {})}
      {...props}
    />
  );
}

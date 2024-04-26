import cn from "@/lib/utils/cn";
import React from "react";

export function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export default function Card({ className, ...props }: CardProps) {
  const { reference: ref } = props;

  return (
    <div
      ref={ref}
      className={cn("border rounded-xl shadow", className, {})}
      {...props}
    />
  );
}

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CardHeader({ className, ...props }: CardHeaderProps) {
  const { reference: ref } = props;

  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className, {})}
      {...props}
    />
  );
}

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  reference?: React.RefObject<HTMLHeadingElement>;
};

export function CardTitle({ className, ...props }: CardTitleProps) {
  const { reference: ref } = props;

  return (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className, {})}
      {...props}
    />
  );
}

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  reference?: React.RefObject<HTMLParagraphElement>;
};

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  const { reference: ref } = props;

  return (
    <p
      ref={ref}
      className={cn("text-sm text-gray-900", className, {})}
      {...props}
    />
  );
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CardContent({ className, ...props }: CardContentProps) {
  const { reference: ref } = props;

  return <div ref={ref} className={cn("p-6 pt-0", className, {})} {...props} />;
}

type CardFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CardFooter({ className, ...props }: CardFooterProps) {
  const { reference: ref } = props;

  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className, {})}
      {...props}
    />
  );
}

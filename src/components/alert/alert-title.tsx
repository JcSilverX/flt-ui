import cn from "@/lib/utils/cn";

type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  reference?: React.RefObject<HTMLHeadingElement>;
};

export default function AlertTitle({ className, ...props }: AlertTitleProps) {
  const { reference: ref } = props;

  return (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  );
}

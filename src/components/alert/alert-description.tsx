type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  reference?: React.RefObject<HTMLParagraphElement>;
};

export default function AlertDescription({
  children,
  className,
  ...props
}: AlertDescriptionProps) {
  const { reference: ref } = props;

  return (
    <p ref={ref} className="text-sm leading-relaxed" {...props}>
      {children}
    </p>
  );
}
import cn from "@/lib/utils/cn";

type AlertLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  reference?: React.RefObject<HTMLAnchorElement>;
};

export default function AlertLink({
  href,
  className,
  ...props
}: AlertLinkProps) {
  const { reference: ref } = props;

  return <a ref={ref} href={href} className={cn(className)} {...props} />;
}

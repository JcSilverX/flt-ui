type DialogFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-[calc(1rem_-_.5rem_*_.5)] bg-inherit rounded-b-full border-t">
      {children}
    </div>
  );
}

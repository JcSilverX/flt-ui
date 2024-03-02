type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DialogContent({ children }: DialogContentProps) {
  return (
    <div className="relative flex flex-col w-full text-inherit pointer-events-auto bg-white border border-gray-950/90 rounded-lg shadow outline-[0]">
      {children}
    </div>
  );
}

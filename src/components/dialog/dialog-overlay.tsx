type DialogOverlayProps = {
  children: React.ReactNode;
};

export default function DialogOverlay({ children }: DialogOverlayProps) {
  return (
    <div className='fixed top-0 left-0 z-[1050] w-dvw h-dvh bg-slate-950/50'>
      {children}
    </div>
  );
}

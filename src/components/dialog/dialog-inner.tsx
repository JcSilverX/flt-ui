type DialogInnerProps = {
  children: React.ReactNode;
};

export default function DialogInner({ children }: DialogInnerProps) {
  return (
    <div className='relative w-auto m-2 sm:m-7 pointer-events-none'>
      {children}
    </div>
  );
}

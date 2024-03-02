type DialogBodyProps = {
  children: React.ReactNode;
};

export default function DialogBody({ children }: DialogBodyProps) {
  return (
    <div className='relative flex-auto p-4'>
      {children}
    </div>
  );
}
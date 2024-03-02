type DialogHeaderProps = {
  children: React.ReactNode;
};

export default function DialogHeader({ children }: DialogHeaderProps) {
  return (
    <div className='flex flex-shrink-0 items-center justify-between p-4 rounded-t-full border-b'>
      {children}
    </div>
  );
}

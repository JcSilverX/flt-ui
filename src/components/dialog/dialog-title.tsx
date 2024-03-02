type DialogTitleProps = {
  children: React.ReactNode;
};

export default function DialogTitle({ children }: DialogTitleProps) {
  return (
    <div className='mb-0 leading-tight'>
      {children}
    </div>
  );
}

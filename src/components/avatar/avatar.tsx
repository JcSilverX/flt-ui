import cn from '@/lib/utils/cn';
import Image from 'next/image';
import React from 'react';

export function Example4() {
  return (
    <Avatar>
      <AvatarImage src='https://www.jcsilverx.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg.106d5bfe.jpg&w=384&q=95' alt='' />
    </Avatar>
  );
}

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {};

export default function Avatar({ children, className, ...props }: AvatarProps) {
  return (
    <div className={cn('relative flex h-8 w-8 flex-shrink-0 overflow-hidden rounded-full', className)} {...props}>{children}</div>
  );
}

type AvatarImageProps = React.HTMLAttributes<HTMLImageElement> & {
  reference?: React.RefObject<HTMLImageElement>;
  src: string;
  alt: string;
};

export function AvatarImage({ src, alt, ...props }: AvatarImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={cn('aspect-square object-cover w-full h-full')} {...props} />;
}
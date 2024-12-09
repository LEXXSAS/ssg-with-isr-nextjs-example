import { ButtonHTMLAttributes, ReactNode } from 'react';

type size = 'default' | 'lg' | 'sm' | 'icon';
type variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: size;
  variant: variant;
}

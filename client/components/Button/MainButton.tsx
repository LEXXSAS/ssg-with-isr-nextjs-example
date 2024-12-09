import { Button } from '../ui/button';
import { ButtonProps } from './MainButton.props';

export default function MainButton({ children, className, variant, size, ...props }: ButtonProps): JSX.Element {
  return (
    <div>
      <Button
        className={className}
        variant={variant}
        size={size}
        {...props}
      >
        <span className="text-base">
          {children}
        </span>
      </Button>
    </div>
  );
}

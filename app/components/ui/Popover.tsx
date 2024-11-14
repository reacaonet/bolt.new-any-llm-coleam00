import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={[
      'z-50',
      'w-auto',
      'rounded-md',
      'border border-bolt-elements-borderColor',
      'bg-bolt-elements-background-depth-2', // Using depth-2 for better contrast
      'p-4',
      'text-bolt-elements-textPrimary',
      'shadow-md',
      'outline-none',
      // Focus and ring states could use your theme colors
      //   'focus-visible:(outline-none ring-2 ring-bolt-elements-item-contentAccent ring-offset-2 ring-offset-bolt-elements-background-depth-1)',
      // Transitions
      'transition-all duration-800',
      'transform-gpu',
      // State animations
      'data-[state=open]:(opacity-100 scale-100)',
      'data-[state=closed]:(opacity-0 scale-95)',
      // Position animations
      'data-[side=bottom]:translate-y-2',
      'data-[side=left]:translate-x-2',
      'data-[side=right]:-translate-x-2',
      'data-[side=top]:-translate-y-2',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };

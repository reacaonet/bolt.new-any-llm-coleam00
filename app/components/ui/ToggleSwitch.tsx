import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

const ToggleSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={[
      'peer',
      'inline-flex',
      'h-4',
      'w-9',
      'shrink-0',
      'cursor-pointer',
      'items-center',
      'rounded-full',
      'border-2',
      'border-transparent',
      'transition-colors duration-200 bolt-ease-cubic-bezier',
      // Focus styles
      'focus-visible:(outline-none ring-1)',
      // Disabled styles
      'disabled:(cursor-not-allowed opacity-50)',
      // State styles
      'data-[state=checked]:bg-bolt-elements-item-contentAccent',
      'data-[state=unchecked]:bg-bolt-elements-button-secondary-background',
      'hover:data-[state=unchecked]:bg-bolt-elements-button-secondary-backgroundHover',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={[
        'pointer-events-none',
        'block',
        'h-3',
        'w-3',
        'rounded-full',
        'bg-bolt-elements-textPrimary',
        'shadow-lg',
        'ring-0',
        'transition-transform duration-200 bolt-ease-cubic-bezier',
        'data-[state=checked]:translate-x-5',
        'data-[state=unchecked]:translate-x-0',
      ].join(' ')}
    />
  </SwitchPrimitives.Root>
));
ToggleSwitch.displayName = SwitchPrimitives.Root.displayName;

export { ToggleSwitch };

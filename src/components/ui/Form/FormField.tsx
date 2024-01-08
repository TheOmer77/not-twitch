import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { FormLabel } from './FormLabel';
import { FormDescription } from './FormDescription';

export type FormFieldProps = ComponentPropsWithoutRef<'div'> & {
  id: string;
  label: string;
  description?: string;
  error?: boolean;
};

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ id, label, description: description, error, children, ...props }, ref) => (
    <div {...props} ref={ref}>
      {label && (
        <FormLabel htmlFor={id} error={error}>
          {label}
        </FormLabel>
      )}
      <Slot id={id} aria-invalid={!!error}>
        {children}
      </Slot>
      {description && (
        <FormDescription error={error}>{description}</FormDescription>
      )}
    </div>
  )
);
FormField.displayName = 'FormField';

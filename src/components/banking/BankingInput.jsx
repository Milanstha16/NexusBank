import React from 'react';
import { cn } from '../../lib/utils';

export const BankingInput = React.forwardRef(
  ({ className, label, error, icon, type = "text", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {/* Label */}
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            type={type}
            ref={ref}
            className={cn(
              "flex h-12 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-all duration-200 ease-out placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              error && "border-destructive focus:ring-destructive",
              className
            )}
            {...props}
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-destructive animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);

BankingInput.displayName = 'BankingInput';

import React from 'react';
import { cn } from '../../lib/utils';

export const BankingCard = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
}) => {
  const variants = {
    default: 'bg-card border border-border shadow-card',
    elevated: 'bg-card shadow-medium',
    glass: 'glass-card',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        "rounded-xl",
        variants[variant],
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export const BankingCardHeader = ({ children, className }) => {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
};

export const BankingCardTitle = ({ children, className }) => {
  return (
    <h3 className={cn("text-lg font-semibold text-foreground", className)}>
      {children}
    </h3>
  );
};

export const BankingCardDescription = ({ children, className }) => {
  return (
    <p className={cn("text-sm text-muted-foreground mt-1", className)}>
      {children}
    </p>
  );
};

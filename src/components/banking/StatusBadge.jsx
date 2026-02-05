import React from 'react';
import { cn } from '../../lib/utils';

const STATUS_STYLES = {
  completed: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
  active: 'bg-success/10 text-success border-success/20',
  frozen: 'bg-info/10 text-info border-info/20',
  closed: 'bg-muted text-muted-foreground border-border',
};

const STATUS_LABELS = {
  completed: 'Completed',
  pending: 'Pending',
  failed: 'Failed',
  active: 'Active',
  frozen: 'Frozen',
  closed: 'Closed',
};

const STATUS_DOT_COLORS = {
  completed: 'bg-success',
  active: 'bg-success',
  pending: 'bg-warning',
  failed: 'bg-destructive',
  frozen: 'bg-info',
  closed: 'bg-muted-foreground',
};

export const StatusBadge = ({ status, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        STATUS_STYLES[status],
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full mr-1.5",
          STATUS_DOT_COLORS[status]
        )}
      />
      {STATUS_LABELS[status]}
    </span>
  );
};

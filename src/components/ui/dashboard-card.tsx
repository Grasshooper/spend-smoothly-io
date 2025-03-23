
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  isGlass?: boolean;
  isLoading?: boolean;
  actionIcon?: React.ReactNode;
  onActionClick?: () => void;
}

export const DashboardCard = ({
  title,
  subtitle,
  icon,
  children,
  className,
  contentClassName,
  isGlass = false,
  isLoading = false,
  actionIcon,
  onActionClick,
  ...props
}: DashboardCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl shadow-card overflow-hidden transition-all duration-300",
        isGlass ? "glass-card" : "bg-white",
        className
      )}
      {...props}
    >
      {(title || icon || subtitle) && (
        <div className="flex items-center justify-between p-4 border-b border-divider">
          <div className="flex items-center gap-3">
            {icon && <div className="text-primary">{icon}</div>}
            <div>
              {title && <h3 className="font-semibold text-textPrimary">{title}</h3>}
              {subtitle && <p className="text-sm text-textSecondary">{subtitle}</p>}
            </div>
          </div>
          {actionIcon && (
            <button 
              onClick={onActionClick} 
              className="text-textSecondary hover:text-primary transition-colors"
            >
              {actionIcon}
            </button>
          )}
        </div>
      )}
      <div className={cn("p-4", contentClassName)}>
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-divider rounded w-3/4"></div>
            <div className="h-4 bg-divider rounded w-1/2"></div>
            <div className="h-10 bg-divider rounded"></div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

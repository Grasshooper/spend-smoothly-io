
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  valueColor?: string;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  valueColor = "text-textPrimary",
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-4 h-full transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-textSecondary">{title}</span>
        {icon && <div className="text-textSecondary">{icon}</div>}
      </div>
      <div className="flex flex-col">
        <span className={cn("text-2xl font-bold", valueColor)}>{value}</span>
        {trend && (
          <div className="flex items-center mt-1">
            <div
              className={cn(
                "flex items-center text-xs font-medium rounded-full px-2 py-0.5",
                trend.isPositive
                  ? "text-green-600 bg-green-50"
                  : "text-danger bg-danger/10"
              )}
            >
              {trend.isPositive ? (
                <ArrowUp size={12} className="mr-1" />
              ) : (
                <ArrowDown size={12} className="mr-1" />
              )}
              {Math.abs(trend.value).toFixed(1)}%
            </div>
            <span className="text-xs text-textSecondary ml-2">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

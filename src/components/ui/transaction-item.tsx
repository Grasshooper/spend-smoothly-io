
import React from "react";
import { cn } from "@/lib/utils";
import { ShoppingBag, Coffee, Car, Home, CreditCard, Film, MoreHorizontal } from "lucide-react";

export type TransactionType = "expense" | "income";
export type TransactionCategory = "shopping" | "food" | "transport" | "housing" | "entertainment" | "other";

const categoryIcons = {
  shopping: <ShoppingBag size={20} />,
  food: <Coffee size={20} />,
  transport: <Car size={20} />,
  housing: <Home size={20} />,
  entertainment: <Film size={20} />,
  other: <CreditCard size={20} />,
};

const categoryColors = {
  shopping: "text-tertiary bg-tertiary/10",
  food: "text-secondary bg-secondary/10",
  transport: "text-primary bg-primary/10",
  housing: "text-orange-500 bg-orange-500/10",
  entertainment: "text-danger bg-danger/10",
  other: "text-gray-500 bg-gray-100",
};

export interface TransactionItemProps {
  id: string;
  title: string;
  amount: number;
  date: Date;
  type: TransactionType;
  category: TransactionCategory;
  note?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export const TransactionItem = ({
  id,
  title,
  amount,
  date,
  type,
  category,
  note,
  onSelect,
  className,
}: TransactionItemProps) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
  
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    <div
      className={cn(
        "transaction-card",
        type === "expense" ? "transaction-card-expense" : "transaction-card-income",
        "animate-fade-in",
        className
      )}
      onClick={() => onSelect?.(id)}
    >
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-full", categoryColors[category])}>
          {categoryIcons[category]}
        </div>
        <div>
          <h4 className="font-medium text-textPrimary">{title}</h4>
          <div className="flex items-center gap-2 text-xs text-textSecondary">
            <span>{formattedDate}</span>
            <span className="text-divider">•</span>
            <span>{formattedTime}</span>
          </div>
          {note && <p className="text-xs text-textSecondary mt-1">{note}</p>}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span 
          className={type === "expense" ? "transaction-amount-expense" : "transaction-amount-income"}
        >
          {type === "expense" ? "-" : "+"}{formattedAmount}
        </span>
        <button className="text-textSecondary p-1 rounded-full hover:bg-divider transition-colors mt-1">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

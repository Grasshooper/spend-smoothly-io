
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, BarChart3, CreditCard, User, Plus } from "lucide-react";

export const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      label: "Home",
      icon: <Home size={20} />,
      path: "/",
    },
    {
      label: "Transactions",
      icon: <CreditCard size={20} />,
      path: "/transactions",
    },
    {
      label: "Add",
      icon: <Plus size={24} />,
      path: "/add-transaction",
      isPrimary: true,
    },
    {
      label: "Statistics",
      icon: <BarChart3 size={20} />,
      path: "/statistics",
    },
    {
      label: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-divider shadow-md px-2 pb-1 pt-2">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "nav-item relative",
              item.isPrimary
                ? "text-white"
                : currentPath === item.path
                ? "nav-item-active"
                : ""
            )}
            aria-current={currentPath === item.path ? "page" : undefined}
          >
            {item.isPrimary ? (
              <div className="absolute -top-6 flex items-center justify-center bg-primary hover:bg-primary/90 transition-colors rounded-full w-12 h-12 shadow-lg">
                {item.icon}
              </div>
            ) : (
              <div className="mb-1">{item.icon}</div>
            )}
            <span className={cn("text-xs", item.isPrimary && "mt-6")}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

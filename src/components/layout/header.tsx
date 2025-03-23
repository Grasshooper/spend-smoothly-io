
import React, { useState, useEffect } from "react";
import { Bell, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showNotifications?: boolean;
  showMenu?: boolean;
  className?: string;
  onNotificationsClick?: () => void;
  onMenuClick?: () => void;
}

export const Header = ({
  title,
  showBackButton = false,
  showNotifications = true,
  showMenu = false,
  className,
  onNotificationsClick,
  onMenuClick,
}: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [pageTitle, setPageTitle] = useState(title);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update page title based on route if not provided
  useEffect(() => {
    if (title) return;
    
    const path = location.pathname;
    if (path === "/") setPageTitle("Dashboard");
    else if (path === "/transactions") setPageTitle("Transactions");
    else if (path === "/statistics") setPageTitle("Statistics");
    else if (path === "/profile") setPageTitle("Profile");
    else setPageTitle("FinTrack");
  }, [location.pathname, title]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 py-4 px-4 transition-all duration-300",
        scrolled ? "bg-white shadow-sm" : "bg-transparent",
        className
      )}
    >
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="p-2 rounded-full text-textPrimary hover:bg-divider transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}
          {!showBackButton && (
            <h1 className="text-xl font-semibold text-textPrimary animate-fade-in">
              {pageTitle}
            </h1>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showNotifications && (
            <button
              onClick={onNotificationsClick}
              className="p-2 rounded-full text-textPrimary hover:bg-divider transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </button>
          )}
          {showMenu && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-full text-textPrimary hover:bg-divider transition-colors"
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

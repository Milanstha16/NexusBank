import React from "react";
import { Menu, Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // ✅ updated path
import { cn } from "../../lib/utils";

export const Navbar = ({ onMenuClick, isSidebarCollapsed }) => {
  const { user } = useAuth();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-20 bg-background/80 backdrop-blur-lg border-b border-border transition-all duration-300",
        isSidebarCollapsed ? "left-20" : "left-64",
        "lg:left-auto lg:w-auto"
      )}
      style={{
        left: isSidebarCollapsed ? "5rem" : "16rem", // 20 or 64 in Tailwind
        right: 0,
      }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg w-64">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-foreground">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">Premium Account</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

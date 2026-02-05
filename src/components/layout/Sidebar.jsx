import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  History,
  Send,
  User,
  LogOut,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext"; // ✅ updated import path

export const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Wallet, label: "Accounts", path: "/accounts" },
    { icon: History, label: "Transactions", path: "/transactions" },
    { icon: Send, label: "Transfer", path: "/transfer" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-20 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-sidebar-foreground animate-fade-in">
              NexusBank
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  "hover:bg-sidebar-accent group",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                    "group-hover:scale-110"
                  )}
                />
                {!isCollapsed && (
                  <span className="font-medium animate-fade-in">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Section */}
        {isAuthenticated && (
          <div className="px-4 py-4 border-t border-sidebar-border">
            {!isCollapsed && user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-sidebar-foreground">
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </span>
                </div>
                <div className="animate-fade-in overflow-hidden">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={logout}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200",
                "text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10"
              )}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">Sign out</span>}
            </button>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className={cn(
            "absolute -right-3 top-24 w-6 h-6 rounded-full",
            "bg-sidebar-primary text-sidebar-primary-foreground",
            "flex items-center justify-center shadow-md",
            "hover:scale-110 transition-transform duration-200"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
};

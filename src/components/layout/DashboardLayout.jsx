import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ updated path
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { cn } from "../../lib/utils";

export const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Navbar */}
      <Navbar
        onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* Main content */}
      <main
        className={cn(
          "pt-20 min-h-screen transition-all duration-300",
          isSidebarCollapsed ? "pl-20" : "pl-64"
        )}
      >
        <div className="p-6 lg:p-8">
          <Outlet /> {/* Nested routes render here */}
        </div>
      </main>
    </div>
  );
};

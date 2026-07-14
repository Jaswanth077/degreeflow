import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../ui/Logo";
import SidebarItem from "./SidebarItem";
import UserProfile from "./UserProfile";
import { navigation } from "../../constants/navigation";

export default function Sidebar() {
  const location = useLocation();
  const { student, logout, isMockMode } = useAuth();

  // Match path to set active state
  const isItemActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="relative z-20 flex w-[295px] shrink-0 flex-col justify-between border-r border-white/5 bg-[var(--bg-panel)] p-6">
      {/* Top Logo */}
      <div className="py-2">
        <Logo size="default" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2 py-8">
        {navigation.map((item) => (
          <SidebarItem
            key={item.id}
            label={item.label}
            icon={<item.icon size={20} />}
            path={item.path}
            isActive={isItemActive(item.path)}
          />
        ))}
      </nav>

      {/* Bottom Profile Details (Presentational) */}
      <UserProfile
        student={student}
        onLogout={logout}
        isMockMode={isMockMode}
      />
    </aside>
  );
}

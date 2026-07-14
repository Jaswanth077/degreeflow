import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  Brain,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigation = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", path: "/courses", icon: BookOpen },
  { id: "results", label: "Results", path: "/results", icon: GraduationCap },
  { id: "backlogs", label: "Backlogs", path: "/backlogs", icon: AlertTriangle },
  { id: "advisor", label: "AI Academic Advisor", path: "/advisor", icon: Brain },
  { id: "analytics", label: "Analytics", path: "/analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", path: "/settings", icon: Settings },
];

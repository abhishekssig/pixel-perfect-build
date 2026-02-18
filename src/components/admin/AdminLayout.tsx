import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, Users, Package, HeadphonesIcon,
  Shield, Download, BarChart3, LogOut, ChevronLeft, ChevronRight, Menu,
  FileText, CalendarDays, Tag, Layers
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/Frame_5.png";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { label: "Users", icon: Users, path: "/admin/users" },
  { label: "Products", icon: Package, path: "/admin/products" },
  { label: "Coupons", icon: Tag, path: "/admin/coupons" },
  { label: "Blogs", icon: FileText, path: "/admin/blogs" },
  { label: "Events", icon: CalendarDays, path: "/admin/events" },
  { label: "Support", icon: HeadphonesIcon, path: "/admin/support" },
  { label: "Warranty", icon: Shield, path: "/admin/warranty" },
  { label: "Drivers", icon: Download, path: "/admin/drivers" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "CMS", icon: Layers, path: "/admin/cms" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-60"
        } bg-neutral-900 border-r border-white/10 flex flex-col transition-all duration-300 shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!collapsed && (
            <img src={logo} alt="Rebel Head" className="h-8 w-auto" />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors text-white/60"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-red-500/15 text-red-400 font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-white/10">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Menu className="w-5 h-5 shrink-0" />
            {!collapsed && <span>View Site</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

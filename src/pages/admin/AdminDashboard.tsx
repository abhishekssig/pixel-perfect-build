import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, Users, Package, HeadphonesIcon, Shield, Download, BarChart3 } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <div className="bg-neutral-900 border border-white/10 rounded-xl p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-white/50 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-white text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    orders: 0, users: 0, products: 0, tickets: 0, warranty: 0, drivers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [orders, profiles, products, tickets, warranty, drivers] = await Promise.all([
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("support_tickets").select("id", { count: "exact", head: true }),
        supabase.from("warranty_claims").select("id", { count: "exact", head: true }),
        supabase.from("drivers").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        orders: orders.count || 0,
        users: profiles.count || 0,
        products: products.count || 0,
        tickets: tickets.count || 0,
        warranty: warranty.count || 0,
        drivers: drivers.count || 0,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold mb-1">Admin Dashboard</h1>
      <p className="text-white/40 text-sm mb-8">Welcome back. Here's an overview of your store.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={ShoppingCart} label="Total Orders" value={String(stats.orders)} color="bg-red-500/20" />
        <StatCard icon={Users} label="Total Users" value={String(stats.users)} color="bg-blue-500/20" />
        <StatCard icon={Package} label="Products" value={String(stats.products)} color="bg-green-500/20" />
        <StatCard icon={HeadphonesIcon} label="Open Tickets" value={String(stats.tickets)} color="bg-yellow-500/20" />
        <StatCard icon={Shield} label="Warranty Claims" value={String(stats.warranty)} color="bg-purple-500/20" />
        <StatCard icon={Download} label="Driver Packages" value={String(stats.drivers)} color="bg-cyan-500/20" />
      </div>
    </div>
  );
};

export default AdminDashboard;

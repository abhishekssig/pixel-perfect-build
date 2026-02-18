import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      setUsers((data as Profile[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">Users</h1>
      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-white/40">No users yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-4">User ID</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Phone</th>
                <th className="text-left py-3 px-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs">{u.user_id.slice(0, 8)}...</td>
                  <td className="py-3 px-4">{u.full_name || "—"}</td>
                  <td className="py-3 px-4 text-white/60">{u.phone || "—"}</td>
                  <td className="py-3 px-4 text-white/60">{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

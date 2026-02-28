"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import RoleGuard from "@/app/components/RoleGuard";

type Role = "user" | "seller" | "admin";

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      // 1) user var mı?
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) return; // RoleGuard zaten /login'e atacak

      setEmail(user.email ?? null);

      // 2) rolü çek
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      const role = (profile?.role as Role) || "user";

      // 3) seller/admin dashboard’a giremesin -> kendi paneline
      if (role === "seller") {
        router.replace("/seller");
        return;
      }
      if (role === "admin") {
        router.replace("/admin");
        return;
      }
    };

    run();
  }, [router]);

  const handleLogout = async () => {
    setMsg(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMsg(error.message);
      return;
    }
    router.replace("/login");
  };

  return (
    <RoleGuard allow={["user"]} redirectTo="/login" forbiddenTo="/seller">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard ✅</h1>
                <p className="mt-1 text-sm text-gray-600">Giriş başarılı.</p>

                {email && (
                  <div className="mt-3 text-sm">
                    <span className="text-gray-500">Hesap:</span>{" "}
                    <span className="font-semibold text-gray-900">{email}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition"
              >
                Çıkış yap
              </button>
            </div>

            {msg && (
              <div className="mt-4 text-sm rounded-xl px-4 py-3 border bg-red-50 text-red-700 border-red-200">
                {msg}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <a
                href="/"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
              >
                Ana sayfa
              </a>

              <a
                href="/seller/register"
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
              >
                Satıcı ol
              </a>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
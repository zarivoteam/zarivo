"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type Role = "user" | "seller" | "admin";

type Props = {
  children: React.ReactNode;
  allow: Role[];                 // Bu sayfaya izin verilen roller
  redirectTo?: string;           // Giriş yoksa
  forbiddenTo?: string;          // Rol uymuyorsa
};

export default function RoleGuard({
  children,
  allow,
  redirectTo = "/login",
  forbiddenTo = "/dashboard",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);

      // 1) Kullanıcı var mı?
      const { data: userRes, error: userErr } = await supabase.auth.getUser();
      const user = userRes?.user;

      if (cancelled) return;

      if (userErr || !user) {
        router.replace(`${redirectTo}?next=${encodeURIComponent(pathname)}`);
        return;
      }

      // 2) Varsayılan rol: user
      let role: Role = "user";

      // 3) profiles'dan rol çekmeyi dene
      const { data: profile, error: profileErr } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle(); // single yerine daha güvenli

      if (cancelled) return;

      // RLS / yetki sorunu varsa burada error gelebilir.
      // Biz crash etmiyoruz; role yine "user" kalır.
      if (!profileErr && profile?.role) {
        role = profile.role as Role;
      }

      // 4) Rol izinli mi?
      if (!allow.includes(role)) {
        router.replace(forbiddenTo);
        return;
      }

      setLoading(false);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [allow, router, redirectTo, forbiddenTo, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
        Yükleniyor...
      </div>
    );
  }

  return <>{children}</>;
}
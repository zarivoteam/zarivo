"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type Role = "user" | "seller" | "admin";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Sadece site içi yönlendirme kabul et (güvenlik)
  const safeNext = (next: string | null) => {
    if (!next) return null;
    if (!next.startsWith("/")) return null;
    return next;
  };

  const getRole = async (userId: string): Promise<Role> => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    return (profile?.role as Role) || "user";
  };

  const roleHome = (role: Role) => {
    if (role === "seller") return "/seller";
    if (role === "admin") return "/admin";
    return "/dashboard";
  };

  // next paramına rol bazlı izin ver
  const roleAllowsNext = (role: Role, nextUrl: string) => {
    if (role === "admin") return true; // admin her yere
    if (role === "seller") return nextUrl.startsWith("/seller");
    // user
    return nextUrl.startsWith("/dashboard");
  };

  // Sayfa açılınca: zaten girişliyse role göre yönlendir
  useEffect(() => {
    let cancelled = false;

    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user || cancelled) return;

      const role = await getRole(user.id);
      if (cancelled) return;

      const next = safeNext(searchParams.get("next"));
      if (next && roleAllowsNext(role, next)) {
        router.replace(next);
      } else {
        router.replace(roleHome(role));
      }
    };

    checkUser();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  const canSubmit =
    email.trim().length > 0 && password.trim().length > 0 && !loading;

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault();
    if (!canSubmit) return;

    setMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Giriş başarılı ✅");

    const userId = data.user?.id;
    if (!userId) {
      router.replace("/dashboard");
      return;
    }

    const role = await getRole(userId);

    const next = safeNext(searchParams.get("next"));
    if (next && roleAllowsNext(role, next)) {
      router.replace(next);
    } else {
      router.replace(roleHome(role));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-extrabold tracking-wide text-blue-600"
          >
            ZARIVO
          </a>

          <div className="flex items-center gap-4">
            <a
              href="/register"
              className="text-sm text-gray-700 hover:underline"
            >
              Ro‘yxatdan o‘tish
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">Kirish</h1>
            <p className="mt-2 text-sm text-gray-600">
              Mahsulot egasi bilan bog‘lanish, izoh qoldirish va favorilar uchun
              tizimga kiring.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 caret-gray-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">
                  Parol
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 caret-gray-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              {msg && (
                <div
                  className={`text-sm rounded-xl px-4 py-3 border ${
                    msg.includes("✅")
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {msg}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full px-4 py-3 rounded-xl font-semibold transition ${
                  canSubmit
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-300 text-white cursor-not-allowed"
                }`}
              >
                {loading ? "Kirish..." : "Kirish"}
              </button>

              <div className="flex items-center justify-between text-sm">
                <a className="text-blue-600 hover:underline" href="/register">
                  Ro‘yxatdan o‘tish
                </a>
                <a
                  className="text-blue-600 hover:underline"
                  href="/forgot-password"
                >
                  Parolni unutdingizmi?
                </a>
              </div>

              <div className="text-xs text-gray-500 text-center">
                Davom etish orqali siz{" "}
                <a className="text-blue-600 hover:underline" href="#">
                  Qoidalar
                </a>{" "}
                va{" "}
                <a className="text-blue-600 hover:underline" href="#">
                  Maxfiylik
                </a>{" "}
                shartlariga rozilik bildirasiz.
              </div>
            </form>
          </div>

          {/* Right info */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold">Nega kirish kerak?</h2>

            <ul className="mt-4 space-y-3 text-white/90 text-sm">
              <li>✅ Mahsulot egasi bilan to‘g‘ridan-to‘g‘ri aloqa</li>
              <li>✅ Izoh qoldirish va baholash</li>
              <li>✅ Favorilar va aloqa tarixini ko‘rish</li>
            </ul>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/20">
              <div className="text-sm font-semibold">Eslatma</div>
              <div className="mt-1 text-sm text-white/90">
                Biz sizning WhatsApp/Telegram kontaktlaringizni olmaymiz. Faqat
                sotuvchining e’lonida ko‘rsatilgan aloqa havolasini chiqaramiz.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-500">
          ©️ {new Date().getFullYear()} Zarivo
        </div>
      </div>
    </div>
  );
}
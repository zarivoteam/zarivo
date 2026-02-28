"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const canSubmit =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length >= 6 &&
    !loading;

  const handleRegister = async () => {
    setMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Emailga tasdiqlash xati yuborildi. Pochtangizni tekshiring ✅");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <a href="/" className="text-xl font-extrabold tracking-wide text-blue-600">
            ZARIVO
          </a>

          <div className="flex items-center gap-4">
            <a href="/seller/register" className="text-sm text-gray-700 hover:underline">
              Sotuvchi bo‘lish
            </a>
            <a href="/login" className="text-sm text-blue-600 hover:underline">
              Kirish
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200">
              👤 A’zo bo‘lish (Mijoz)
            </div>

            <h1 className="mt-4 text-2xl font-bold text-gray-900">Ro‘yxatdan o‘ting</h1>
            <p className="mt-2 text-sm text-gray-600">
              Mahsulot egasi bilan bog‘lanish, izoh qoldirish va favorilar uchun ro‘yxatdan o‘ting.
              Email tasdiqlash majburiy.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900">Ism-familiya</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Masalan: Dilnoza Karimova"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 caret-gray-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 caret-gray-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Parol</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 caret-gray-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
                <div className="mt-2 text-xs text-gray-500">6+ belgi tavsiya etiladi.</div>
              </div>

              {/* Message */}
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
                type="button"
                onClick={handleRegister}
                disabled={!canSubmit}
                className={`w-full px-4 py-3 rounded-xl font-semibold transition
                  ${
                    canSubmit
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-300 text-white cursor-not-allowed"
                  }`}
              >
                {loading ? "Yuborilyapti..." : "Ro‘yxatdan o‘tish"}
              </button>

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
            </div>
          </div>

          {/* Right info */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold">A’zo bo‘lgach nimalar bo‘ladi?</h2>

            <ul className="mt-4 space-y-3 text-white/90 text-sm">
              <li>✅ Mahsulot egasi bilan to‘g‘ridan-to‘g‘ri aloqa</li>
              <li>✅ Mahsulotlarga izoh va baho berasiz</li>
              <li>✅ Favorilar va aloqa tarixini ko‘rish</li>
            </ul>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/20">
              <div className="text-sm font-semibold">Eslatma</div>
              <div className="mt-1 text-sm text-white/90">
                Biz sizning WhatsApp/Telegram kontaktlaringizni olmaymiz. Faqat sotuvchining e’lonida ko‘rsatilgan aloqa havolasini chiqaramiz.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-500">©️ {new Date().getFullYear()} Zarivo</div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function SellerRegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const canSubmit =
    fullName.trim() &&
    shopName.trim() &&
    email.trim() &&
    password.trim().length >= 6 &&
    !loading;

  const handleRegister = async () => {
    setMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          shop_name: shopName.trim(),
          role: "seller",
        },
      },
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    // Confirm email kapalıysa direkt giriş olur → dashboard/seller’a gönder.
    // Confirm email açıksa kullanıcı mail doğrulaması bekler (ama biz kapattık).
    setMsg("Satıcı kaydı başarılı ✅");
    router.replace("/seller/settings");
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Arka plan dekoru tıklamayı engellemesin */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* İçerik tıklanabilir olsun */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6">
          <a href="/" className="text-xl font-extrabold tracking-wide text-blue-600">
            ZARIVO
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-2">Sotuvchi ro‘yxatdan o‘tish</div>
            <h1 className="text-2xl font-bold text-gray-900">Do‘koningizni oching</h1>
            <p className="mt-2 text-sm text-gray-600">
              Komissiyasiz. To‘g‘ridan-to‘g‘ri aloqa. Mahsulot joylash uchun email tasdiqlash shart (prod’da).
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900">Ism-familiya</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  placeholder="Ismingiz"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Do‘kon nomi</label>
                <input
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  placeholder="Do‘kon nomi"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Parol</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  placeholder="••••••••"
                />
                <div className="mt-2 text-xs text-gray-500">6+ belgi, kamida 1 raqam tavsiya etiladi.</div>
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
                type="button"
                onClick={handleRegister}
                disabled={!canSubmit}
                className={`w-full px-4 py-3 rounded-xl font-semibold transition ${
                  canSubmit ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-300 text-white cursor-not-allowed"
                }`}
              >
                {loading ? "Kayd qilinyapti..." : "Sotuvchi sifatida ro‘yxatdan o‘tish"}
              </button>

              <div className="text-xs text-gray-500 text-center">
                Ro‘yxatdan o‘tgandan so‘ng email tasdiqlang. So‘ngra paneldan WhatsApp/Telegram qo‘shib mahsulot joylash
                mumkin.
              </div>
            </div>
          </div>

          {/* Sağ bilgi kartı */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold">A’zo bo‘lgach nimalar?</h2>
            <ul className="mt-4 space-y-3 text-white/90 text-sm">
              <li>✅ Mahsulot egasi bilan to‘g‘ridan-to‘g‘ri aloqa</li>
              <li>✅ Mahsulot joylash</li>
              <li>✅ Favorilar va aloqa tarixini ko‘rish</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-500">©️ {new Date().getFullYear()} Zarivo</div>
      </div>
    </div>
  );
}
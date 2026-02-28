"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function SellerSettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [shopName, setShopName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");

  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("shop_name, whatsapp, telegram")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        setShopName(profile.shop_name || "");
        setWhatsapp(profile.whatsapp || "");
        setTelegram(profile.telegram || "");
      }

      setLoading(false);
    };

    load();
  }, [router]);

  const handleSave = async () => {
    setMsg(null);
    setSaving(true);

    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        shop_name: shopName.trim(),
        whatsapp: whatsapp.trim(),
        telegram: telegram.trim(),
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Saqlandi ✅");

    const next = searchParams.get("next");
    if (next) router.replace(next);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-900">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Sotuvchi sozlamalari
          </h1>

          {searchParams.get("need_contact") === "1" && (
            <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-900">
              Mahsulot qo‘shish uchun WhatsApp yoki Telegram qo‘shishingiz kerak.
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-800">
                Do‘kon nomi
              </label>
              <input
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="Masalan: Deneme Store"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-800">
                WhatsApp
              </label>
              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+998..."
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-800">
                Telegram
              </label>
              <input
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@username"
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {msg && (
              <div className="text-sm mt-2 text-green-700">{msg}</div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-4 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
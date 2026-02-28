"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AddProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [shopName, setShopName] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);

      // 1) Kullanıcı var mı?
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes?.user;

      if (!user) {
        router.replace("/login?next=/seller/add-product");
        return;
      }

      // 2) WhatsApp / Telegram var mı?
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("shop_name, whatsapp, telegram")
        .eq("id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        // bir sorun olursa ayarlara gönderelim
        router.replace("/seller/settings");
        return;
      }

      const whatsapp = (profile?.whatsapp || "").trim();
      const telegram = (profile?.telegram || "").trim();

      // ikisi de yoksa -> settings’e zorla
      if (!whatsapp && !telegram) {
        router.replace(
          "/seller/settings?need_contact=1&next=/seller/add-product"
        );
        return;
      }

      setShopName(profile?.shop_name || "");
      setLoading(false);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const needContact = searchParams.get("need_contact") === "1";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {needContact && (
          <div className="mb-4 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            Ürün eklemek için önce WhatsApp veya Telegram eklemelisin.
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Ürün Ekle</h1>
          <p className="mt-2 text-sm text-gray-600">
            Mağaza: <span className="font-semibold">{shopName || "—"}</span>
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 p-5 text-sm text-gray-600">
            Şimdi kilit çalışıyor ✅<br />
            Bir sonraki adımda buraya gerçek ürün ekleme formu koyacağız.
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href="/seller/settings"
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
            >
              Ayarlar
            </a>
            <a
              href="/seller"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              Satıcı Paneli
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
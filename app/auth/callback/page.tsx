"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      // Mail linkinden gelen token/hash varsa session'a kaydeder
      // (Supabase mail linkleri bazen #access_token ile gelir)
      // supabase-js bunu burada yakalayabiliyor.
      try {
        // @ts-ignore (bazı sürümlerde tip görünmeyebiliyor)
        const { error } = await supabase.auth.getSessionFromUrl?.({ storeSession: true });
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      } finally {
        // session kurulunca login'e veya dashboard'a yönlendir
        router.replace("/login");
      }
    };

    run();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
      Hesabınız doğrulanıyor...
    </div>
  );
}
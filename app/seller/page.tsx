"use client";

import RoleGuard from "@/app/components/RoleGuard";
import Link from "next/link";

export default function SellerHomePage() {
  return (
    <RoleGuard allow={["seller", "admin"]} forbiddenTo="/dashboard" redirectTo="/login">
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Satıcı Paneli</h1>
          <p className="mt-2 text-sm text-gray-600">
            Bu sayfaya sadece <b>seller</b> (ve admin) rolü girebilir.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/seller/add-product"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Ürün Ekle
            </Link>

            <Link
              href="/seller/settings"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50"
            >
              Ayarlar
            </Link>

            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
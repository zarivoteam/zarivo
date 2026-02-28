const categories = [
  "Elektronika",
  "Kiyim-kechak",
  "Uy & Bog‘",
  "Go‘zallik",
  "Bolalar",
  "Avto",
  "Sport",
];

const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Mahsulot nomi ${i + 1}`,
  price: `${(i + 1) * 120_000}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so‘m",
  location: "Toshkent",
  badge: i % 3 === 0 ? "Sponsorlu" : null,
}));

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="text-2xl font-extrabold tracking-wide text-blue-600">
              ZARIVO
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-gray-500">
              UZ
            </span>
          </a>

          {/* Search */}
          <div className="flex-1">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-2xl px-3 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition">
              <span className="text-gray-600">🔎</span>
              <input
                className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                placeholder="Mahsulot, do‘kon yoki kategoriya qidiring..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Kirish -> /login */}
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition text-sm text-gray-900"
            >
              <span className="text-base">👤</span>
              <span className="hidden sm:inline">Kirish</span>
            </a>

            {/* Sotuvchi bo‘lish -> /seller/register */}
            <a
              href="/seller/register"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-semibold"
            >
              <span className="hidden sm:inline">Sotuvchi bo‘lish</span>
              <span className="sm:hidden">Sotuvchi</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-bold">
            To‘g‘ridan-to‘g‘ri. Xavfsiz. Oson.
          </h1>
          <p className="mt-3 text-white/90 max-w-2xl">
            Sotuvchi va xaridorni xavfsiz va to‘g‘ridan-to‘g‘ri bog‘laydigan
            zamonaviy platforma. Kontakt ma’lumotlarini ko‘rish uchun kirish
            talab qilinadi.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="#products"
              className="text-center px-5 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-50 transition shadow-sm"
            >
              Mahsulotlarni ko‘rish
            </a>

            <a
              href="#how-it-works"
              className="text-center px-5 py-3 rounded-xl bg-blue-500/20 border border-white/30 hover:bg-blue-500/30 transition"
            >
              Qanday ishlaydi?
            </a>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Kategoriyalar</h2>
            <button className="text-sm text-blue-600 hover:underline">
              Barchasi
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((c) => (
              <button
                key={c}
                className="bg-white border rounded-2xl px-3 py-3 text-sm hover:shadow-sm hover:border-gray-300 transition text-left"
              >
                <div className="text-gray-900 font-medium">{c}</div>
                <div className="text-xs text-gray-500 mt-1">Mahsulotlar</div>
              </button>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mt-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Qanday ishlaydi?
              </h2>
              <span className="text-xs text-gray-500">
                Komissiyasiz • P2P • WhatsApp/Telegram
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="text-sm font-semibold text-gray-900">
                  1) Mahsulotni tanlang
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Kategoriyalar orqali yoki qidiruvdan foydalanib mahsulot toping.
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="text-sm font-semibold text-gray-900">
                  2) Kirish qiling
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Kontakt ma’lumotlarini ko‘rish uchun a’zo bo‘ling va tizimga kiring.
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="text-sm font-semibold text-gray-900">
                  3) Sotuvchi bilan bog‘laning
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  WhatsApp yoki Telegram orqali to‘g‘ridan-to‘g‘ri yozing.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section id="products" className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Tavsiya etilgan mahsulotlar
            </h2>
            <div className="text-sm text-gray-500">Bugun yangilangan</div>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <article
                key={p.id}
                className="bg-white border rounded-2xl overflow-hidden hover:shadow-sm hover:border-gray-300 transition"
              >
                <div className="relative aspect-[4/3] bg-gray-200">
                  {p.badge && (
                    <div className="absolute top-3 left-3 text-xs font-semibold bg-yellow-300 text-gray-900 px-2 py-1 rounded-lg">
                      {p.badge}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between text-xs text-gray-700">
                    <span className="bg-white/90 px-2 py-1 rounded-lg">❤ 12</span>
                    <span className="bg-white/90 px-2 py-1 rounded-lg">💬 3</span>
                  </div>
                </div>

                <div className="p-3">
                  <div className="text-sm font-medium text-gray-900 line-clamp-2">
                    {p.title}
                  </div>
                  <div className="mt-2 text-blue-600 font-bold">{p.price}</div>
                  <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                    <span>{p.location}</span>
                    <span>Bugun</span>
                  </div>

                  <button className="mt-3 w-full px-3 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
                    Batafsil
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 py-8 text-sm text-gray-500">
          <div className="border-t pt-6 flex flex-col md:flex-row gap-3 justify-between">
            <div>© {new Date().getFullYear()} Zarivo</div>
            <div className="flex gap-4">
              <a className="hover:underline" href="#">
                Qoidalar
              </a>
              <a className="hover:underline" href="#">
                Maxfiylik
              </a>
              <a className="hover:underline" href="#">
                Aloqa
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
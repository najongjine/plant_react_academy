import React from "react";

/**
 * https://nuffjuice.com/
 * 
 * NuffJuice 스타일의 싱글 페이지 랜딩 (React + Tailwind)
 * - 헤더: 배경 이미지 가능, Home / AI / Wiki 메뉴
 * - 본문 섹션: Hero, 제품 그리드, 특징, 프로모션 배너, FAQ
 * - 푸터: 링크 & 저작권
 *
 * 사용법(요약)
 * 1) Vite로 프로젝트 생성:  npm create vite@latest myapp -- --template react-ts
 * 2) Tailwind 설치: https://tailwindcss.com/docs/guides/vite 참고
 * 3) src/App.tsx 내용을 이 파일로 교체 후 실행
 *
 * 참고: 외부 상업 사이트의 텍스트/이미지 저작물은 그대로 복제하지 마세요.
 *       아래 이미지는 Unsplash 샘플 URL(무상 핫링크)이며 적절히 교체하세요.
 */

const headerBg =
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop"; // 잎사귀 배경 예시

export default function App() {
  return (
    <div className="min-h-screen bg-emerald-50 text-slate-900">
      <SiteHeader />
      <Hero />
      <ProductShowcase />
      <Features />
      <PromoBanner />
      <FAQ />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-200/60 backdrop-blur">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${headerBg})` }}
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-3 py-1">Nature</span>
          <span className="text-lg md:text-xl">NuffJuice</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "Home", href: "#home" },
            { label: "AI", href: "#ai" },
            { label: "Wiki", href: "#wiki" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[15px] font-medium text-slate-700 hover:text-emerald-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#shop"
          className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
        >
          Buy Now
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-lime-300/30 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-emerald-900 md:text-6xl">
            Pure. Punchy. <span className="text-emerald-600">Juice.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            비주얼 임팩트가 강한 주스 브랜드 랜딩 페이지 스타일. 신선한 색감과 큰 타이포그래피,
            둥근 버튼과 카드 레이아웃으로 구성했습니다.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#shop"
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:translate-y-[-1px] hover:bg-emerald-700">
              Explore Flavors
            </a>
            <a
              href="#ai"
              className="rounded-2xl border border-emerald-400/60 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">
              Try AI Pairing
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
            <li className="flex items-center gap-2"><CheckIcon /> 100% Cold-Pressed</li>
            <li className="flex items-center gap-2"><CheckIcon /> No Sugar Added</li>
            <li className="flex items-center gap-2"><CheckIcon /> Recyclable</li>
          </ul>
        </div>

        {/* Hero Mock */}
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-24 w-24 rotate-12 rounded-3xl bg-white/80 shadow-2xl" />
          <img
            alt="juice-bottles"
            className="relative z-10 mx-auto w-full max-w-md rounded-3xl border border-emerald-200/60 bg-white shadow-2xl"
            src="https://images.unsplash.com/photo-1542442828-287217bfb87f?q=80&w=1200&auto=format&fit=crop" />
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const products = [
    {
      name: "Green Punch",
      desc: "케일 · 사과 · 레몬",
      price: "₩6,900",
      img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=900&auto=format&fit=crop",
      badge: "Best"
    },
    {
      name: "Citrus Pop",
      desc: "오렌지 · 자몽 · 라임",
      price: "₩6,500",
      img: "https://images.unsplash.com/photo-1561025427-24aa3f7b1c31?q=80&w=900&auto=format&fit=crop",
      badge: "New"
    },
    {
      name: "Berry Blast",
      desc: "딸기 · 블루베리 · 비트",
      price: "₩7,200",
      img: "https://images.unsplash.com/photo-1571075107081-7c24f3d5d0d6?q=80&w=900&auto=format&fit=crop",
      badge: "Hot"
    },
  ];

  return (
    <section id="shop" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-emerald-900 md:text-3xl">Signature Flavors</h2>
        <a href="#" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">View all →</a>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((p) => (
          <article key={p.name} className="group rounded-3xl border border-emerald-200/70 bg-white p-4 shadow-sm transition hover:shadow-xl">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={p.img} alt={p.name} className="h-56 w-full object-cover transition group-hover:scale-[1.03]" />
              <span className="absolute left-3 top-3 rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-bold text-white shadow-sm">{p.badge}</span>
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{p.desc}</p>
              </div>
              <span className="rounded-xl bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{p.price}</span>
            </div>
            <button className="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700">Add to Cart</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { title: "Cold Pressed", desc: "영양소 보존을 위한 저온 압착 공법", icon: <JuiceIcon /> },
    { title: "Eco Bottles", desc: "재활용 소재 · 친환경 잉크 라벨", icon: <LeafIcon /> },
    { title: "Same‑Day", desc: "오전 주문 → 당일 생산/발송", icon: <TruckIcon /> },
  ];
  return (
    <section className="bg-white/70 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-emerald-900 md:text-3xl">Why NuffJuice</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {feats.map((f) => (
            <div key={f.title} className="rounded-3xl border border-emerald-200/70 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section id="ai" className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-[110%] -translate-x-1/2 rounded-[80px] bg-gradient-to-r from-emerald-200 to-lime-200" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-emerald-300/70 bg-white/80 p-8 backdrop-blur">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-extrabold text-emerald-900">AI Pairing Assistant</h3>
              <p className="mt-2 text-slate-600">
                사진으로 보내주시면 오늘의 식단, 컨디션에 맞는 주스 조합을 추천해 드립니다.
              </p>
              <div className="mt-4 flex gap-3">
                <button className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700">Start Now</button>
                <a href="#wiki" className="rounded-2xl border border-emerald-400/60 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">How it works</a>
              </div>
            </div>
            <img
              alt="ai-preview"
              className="mx-auto w-full max-w-sm rounded-2xl border border-emerald-200/60 bg-white shadow"
              src="https://images.unsplash.com/photo-1611077854851-581019c4d5a6?q=80&w=1200&auto=format&fit=crop"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qas = [
    {
      q: "어떤 보관 방법이 가장 좋나요?",
      a: "수령 후 냉장 보관(0~4°C)을 권장합니다. 개봉 후에는 24시간 이내 섭취하세요.",
    },
    {
      q: "당일 배송이 가능한가요?",
      a: "서울 일부 지역은 당일 퀵 배송이 가능합니다. 결제 단계에서 옵션을 확인하세요.",
    },
    {
      q: "설탕이 들어가나요?",
      a: "NuffJuice는 설탕·첨가물 없이 원재료 그대로 착즙합니다.",
    },
  ];
  return (
    <section id="wiki" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-2xl font-extrabold tracking-tight text-emerald-900 md:text-3xl">FAQ</h2>
      <div className="mx-auto mt-8 max-w-3xl divide-y divide-emerald-200 rounded-3xl border border-emerald-200/70 bg-white">
        {qas.map((item, i) => (
          <details key={i} className="group px-6 py-5">
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              {item.q}
              <span className="float-right text-emerald-600 transition group-open:rotate-45">＋</span>
            </summary>
            <p className="mt-2 text-sm text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-emerald-200/60 bg-white/50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <a href="#" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white">NJ</span>
            <span className="text-lg">NuffJuice</span>
          </a>
          <p className="mt-3 text-sm text-slate-600">
            신선함을 한 병에. 오늘을 가볍게 만드는 착즙 주스.
          </p>
        </div>
        <FooterCol title="Shop" links={["All", "Bundles", "Gift Cards"]} />
        <FooterCol title="Company" links={["About", "Careers", "Contact"]} />
        <FooterCol title="Help" links={["Shipping", "Returns", "FAQ"]} />
      </div>
      <div className="border-t border-emerald-200/60 py-6">
        <p className="mx-auto max-w-6xl px-4 text-sm text-slate-500">© {new Date().getFullYear()} NuffJuice UI — Designed for React/Tailwind demo.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {links.map((l) => (
          <li key={l}><a href="#" className="hover:text-emerald-700">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

// --- Simple Inline Icons (SVG)
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 21c8 0 14-6 14-14V3h-4C7 3 3 7 3 15v1c0 2 0 3 2 5z" />
    </svg>
  );
}
function JuiceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 2h10M8 6h8l-1 14a3 3 0 0 1-3 2h0a3 3 0 0 1-3-2L8 6z" />
      <path d="M10 10h4M9 14h6" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 16V6a2 2 0 0 1 2-2h9v12" />
      <path d="M16 16h3l2-4h-5V6" />
      <circle cx="7.5" cy="18.5" r="2" />
      <circle cx="17.5" cy="18.5" r="2" />
    </svg>
  );
}

import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * PlantCare — AI 진단 & 위키 랜딩 (React + Tailwind)
 *
 * ✅ 구성
 * - 헤더: Home / AI / Wiki (sticky)
 * - Hero: 식물 컨셉 히어로 + CTA
 * - Features: 핵심 기능 4가지
 * - AI Diagnose: 이미지 업로드 + 메모 + (모의) 진단 결과 UI
 * - Wiki Preview: 검색 + 카드 그리드 (모의 데이터)
 * - FAQ
 * - 푸터
 *
 * 사용법
 * 1) Vite(React-TS) + Tailwind 프로젝트에서 이 파일을 src/App.tsx 로 저장
 * 2) 이미지/문구/색상 커스터마이즈
 * 3) 실제 AI 엔드포인트 연결 시 `runDiagnosis` 함수로 교체
 *
 * 디자인 노트
 * - 그린(emerald/lime) 팔레트 + 라운드(rounded-2xl~3xl) + 소프트 그림자
 * - 큰 타이포 / 넉넉한 여백 / 카드 레이아웃
 */



export default function App() {
  return (
    <div className="min-h-screen bg-emerald-50 text-slate-900 selection:bg-emerald-200/60">
      <Hero />
      {/* <Features /> */}
      <AiDiagnose />
      <WikiPreview />
      {/* <FAQ /> */}
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-lime-300/30 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-emerald-900 md:text-6xl">
            AI로 <span className="text-emerald-600">식물 상태</span>를
            즉시 진단하고, <span className="text-emerald-600">위키</span>로 해결하세요.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            한 장의 사진과 간단한 증상 입력만으로 병해/영양/환경 문제를 추정하고,
            바로 적용 가능한 관리 가이드를 제공합니다.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#ai"
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:translate-y-[-1px] hover:bg-emerald-700">
              지금 진단하기
            </a>
            <a
              href="#wiki"
              className="rounded-2xl border border-emerald-400/60 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">
              위키 둘러보기
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
            <li className="flex items-center gap-2"><CheckIcon /> 500+ 종 카탈로그</li>
            <li className="flex items-center gap-2"><CheckIcon /> 증상 체크리스트</li>
            <li className="flex items-center gap-2"><CheckIcon /> 커뮤니티 기여</li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-24 w-24 rotate-12 rounded-3xl bg-white/80 shadow-2xl" />
          <img
            alt="hero-plant"
            className="relative z-10 mx-auto w-full max-w-md rounded-3xl border border-emerald-200/60 bg-white shadow-2xl"
            src="https://images.unsplash.com/photo-1463320898484-cdee8141c787?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { title: "AI 진단", desc: "이미지 + 증상 입력 → 질병/영양/환경 의심 사항 제시", icon: <SparkleIcon /> },
    { title: "위키 가이드", desc: "물주기·광·토양·비료·번식 등 관리법 일목요연", icon: <BookIcon /> },
    { title: "체크리스트", desc: "초보자용 점검표로 기본 관리 습관 만들기", icon: <ListIcon /> },
    { title: "개인정보 안심", desc: "업로드 이미지는 분석 후 즉시 파기(설정 가능)", icon: <ShieldIcon /> },
  ];
  return (
    <section className="bg-white/70 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-emerald-900 md:text-3xl">왜 PlantCare인가요?</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
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

// ---------------- AI Diagnose ----------------

type Diagnosis = {
  label: string;
  confidence: number; // 0~1
  tips: string[];
  relatedWiki: { title: string; href: string }[];
};

function AiDiagnose() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Diagnosis | null>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

  const onPick = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setResult(null);
    }
  };

  async function runDiagnosisMock(): Promise<Diagnosis> {
    // TODO: 실제 API로 교체하세요. (예: /api/diagnose)
    // const body = await toBase64Payload(file, notes);
    // const res = await fetch("/api/diagnose", { method: "POST", body: JSON.stringify(body) });
    // return await res.json();

    // 데모용 모의 결과
    return {
      label: "잎마름병(Leaf Spot) 의심",
      confidence: 0.82,
      tips: [
        "감염 잎은 과감히 제거하고 도구는 소독하세요.",
        "과습을 피하고 통풍을 확보하세요.",
        "살균제 사용 전, 저농도로 국소 테스트 후 적용하세요.",
      ],
      relatedWiki: [
        { title: "잎마름병 종합 가이드", href: "#wiki" },
        { title: "물주기·통풍·채광 체크리스트", href: "#wiki" },
      ],
    };
  }

  const onDiagnose = async () => {
    if (!file) return alert("이미지를 업로드해 주세요");
    try {
      setIsLoading(true);
      const r = await runDiagnosisMock();
      setResult(r);
    } catch (e) {
      console.error(e);
      alert("진단 중 오류가 발생했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai" className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-[110%] -translate-x-1/2 rounded-[80px] bg-gradient-to-r from-emerald-200 to-lime-200" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-emerald-300/70 bg-white/80 p-6 backdrop-blur md:p-8">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-extrabold text-emerald-900">AI 진단</h3>
              <p className="mt-2 text-slate-600">
                식물 사진을 업로드하고 보이는 증상을 간단히 적어주세요. 모델이 가장 가능성 높은 원인을 제시합니다.
              </p>

              <div className="mt-5 space-y-3">
                <button
                  onClick={onPick}
                  className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/60 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  <UploadIcon /> 사진 선택
                </button>
                <input ref={fileInputRef} onChange={onFileChange} type="file" accept="image/*" className="hidden" />

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="예) 잎에 갈색 점이 퍼지고, 물 준지 3일 됨 / 북향 창가"
                  className="mt-2 w-full rounded-2xl border border-emerald-200/70 bg-white p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  rows={4}
                />

                <button
                  onClick={onDiagnose}
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 disabled:opacity-60"
                >
                  {isLoading ? "분석 중..." : "진단 요청"}
                </button>
              </div>

              {!!result && (
                <div className="mt-6 rounded-2xl border border-emerald-200/70 bg-emerald-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold text-emerald-900">{result.label}</p>
                    <span className="rounded-xl bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                      신뢰도 {(result.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-emerald-900/90">
                    {result.tips.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.relatedWiki.map((w) => (
                      <a key={w.title} href={w.href} className="rounded-xl bg-white px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100">
                        {w.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="overflow-hidden rounded-2xl border border-emerald-200/70 bg-white shadow">
                <div className="flex items-center justify-between border-b border-emerald-100 px-4 py-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1"><CameraIcon /> 미리보기</span>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-700">JPEG/PNG</span>
                </div>
                <div className="aspect-[4/3] w-full bg-emerald-50/50">
                  {previewUrl ? (
                    <img src={previewUrl} alt="preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      사진을 업로드하면 여기에 표시됩니다
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-slate-600">
                <Stat label="해상도" value={previewUrl ? "자동" : "—"} />
                <Stat label="파일 크기" value={file ? formatBytes(file.size) : "—"} />
                <Stat label="메모" value={notes ? `${notes.length}자` : "—"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --------------- Wiki Preview ---------------

const WIKI_DATA = [
  {
    title: "몬스테라 기본 가이드",
    excerpt: "채광·물주기·분갈이·지지대 설치까지 핵심만 요약",
    img: "https://images.unsplash.com/photo-1598289431512-b96c6c13ff94?q=80&w=1200&auto=format&fit=crop",
    tags: ["실내", "중광", "초중급"],
  },
  {
    title: "스킨답서스 물주기 타이밍",
    excerpt: "흙 건조 지표, 잎 처짐 신호, 과습 방지 팁",
    img: "https://images.unsplash.com/photo-1548391350-1a529f6ea42d?q=80&w=1200&auto=format&fit=crop",
    tags: ["저광", "초보", "물주기"],
  },
  {
    title: "다육이 겨울나기",
    excerpt: "온도·일조·관수 주기와 휴면기 관리",
    img: "https://images.unsplash.com/photo-1524307556378-8802cd10d3b0?q=80&w=1200&auto=format&fit=crop",
    tags: ["다육", "겨울", "중급"],
  },
  {
    title: "해충 식별: 응애 vs 총채",
    excerpt: "돋보기 체크 포인트, 초기 대응, 주의약제",
    img: "https://images.unsplash.com/photo-1611824208261-5bc3f9b6d2d2?q=80&w=1200&auto=format&fit=crop",
    tags: ["해충", "진단", "방제"],
  },
];

function WikiPreview() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q.trim()) return WIKI_DATA;
    const s = q.toLowerCase();
    return WIKI_DATA.filter((w) =>
      w.title.toLowerCase().includes(s) || w.tags.join(" ").toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <section id="wiki" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-emerald-900 md:text-3xl">PlantCare Wiki</h2>
          <p className="mt-2 text-slate-600">인기 문서를 미리 보고, 더 자세한 내용은 위키에서 확인하세요.</p>
        </div>
        <div className="w-full md:w-80">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="검색: 몬스테라, 해충, 물주기..."
            className="w-full rounded-2xl border border-emerald-200/70 bg-white px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((w) => (
          <article key={w.title} className="group overflow-hidden rounded-3xl border border-emerald-200/70 bg-white shadow-sm transition hover:shadow-xl">
            <div className="relative overflow-hidden">
              <img src={w.img} alt={w.title} className="h-52 w-full object-cover transition group-hover:scale-[1.03]" />
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                {w.tags.map((t) => (
                  <span key={t} className="rounded-full bg-emerald-600/90 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900">{w.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{w.excerpt}</p>
              <div className="mt-3 flex items-center justify-between">
                <a href="#" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">자세히 보기 →</a>
                <button className="rounded-xl border border-emerald-300/70 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50">북마크</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-emerald-200/70 bg-emerald-50 p-5 text-sm text-emerald-900">
        <p className="font-semibold">커뮤니티 기여</p>
        <p className="mt-1">오탈자 제보, 사진 제공, 관리 팁 추가 등 누구나 참가할 수 있어요. 오픈 기여 가이드 준비 중.</p>
      </div>
    </section>
  );
}

function FAQ() {
  const qas = [
    {
      q: "정확도는 어느 정도인가요?",
      a: "조명/초점/거리 등의 품질과 종 데이터에 따라 달라집니다. 베타 기준 상위 증상군은 80%± 신뢰도로 제시됩니다.",
    },
    {
      q: "어떤 사진이 좋나요?",
      a: "문제 부분이 또렷하고 전체 맥락(화분/토양/배치)이 함께 보이면 좋아요. 과도한 보정/역광은 피해주세요.",
    },
    {
      q: "내 사진은 저장되나요?",
      a: "기본값은 분석 후 즉시 파기입니다. 연구 기여에 동의한 경우에만 익명화되어 모델 개선에 사용됩니다.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
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
          <a href="#home" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white"><LeafIcon /></span>
            <span className="text-lg">PlantCare</span>
          </a>
          <p className="mt-3 text-sm text-slate-600">
            식집사를 위한 AI 도우미 & 위키. 더 건강한 실내 정원을 만드세요.
          </p>
        </div>
        <FooterCol title="서비스" links={["AI 진단", "위키", "기여 가이드"]} />
        <FooterCol title="리소스" links={["블로그", "고객지원", "업데이트 노트"]} />
        <FooterCol title="정책" links={["개인정보", "이용약관", "쿠키"]} />
      </div>
      <div className="border-t border-emerald-200/60 py-6">
        <p className="mx-auto max-w-6xl px-4 text-sm text-slate-500">© {new Date().getFullYear()} PlantCare UI — React/Tailwind demo.</p>
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

// ---------------- Small bits ----------------

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-emerald-200/70 bg-white px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

// --- Inline Icons (SVG) ---
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 21c8 0 14-6 14-14V3h-4C7 3 3 7 3 15v1c0 2 0 3 2 5z" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 4h13a3 3 0 0 1 3 3v12H6a3 3 0 0 0-3 3z" />
      <path d="M6 22V7a3 3 0 0 1 3-3h10" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="3" cy="6" r="1.5" /><circle cx="3" cy="12" r="1.5" /><circle cx="3" cy="18" r="1.5" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l8 4v6c0 5-3 8-8 10C7 20 4 17 4 12V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 7h4l2-3h6l2 3h4v12H3z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}

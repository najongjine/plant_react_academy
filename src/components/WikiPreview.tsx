// src/components/Header.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export type Plant = {
    id: number;
    name: string;

    sunlight: string;
    watering: string;
    temperature: string;
    humidity: string;
    soil: string;
    fertilizer: string;
    repotting: string;

    created_at: string;     // ISO timestamp (ex: "2025-08-28T12:34:56.000Z")
    updated_at: string;
    img_url: string;
};

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

const WikiPreview: React.FC = () => {
    const API_URL = `${process.env.REACT_APP_SERVER_API_URL}/api/wiki`;

    const [q, setQ] = useState("");
    const filtered = useMemo(() => {
        if (!q.trim()) return WIKI_DATA;
        const s = q.toLowerCase();
        return WIKI_DATA.filter((w) =>
            w.title.toLowerCase().includes(s) || w.tags.join(" ").toLowerCase().includes(s)
        );
    }, [q]);

    useEffect(() => {
        // 1. localhost:3001/api/wiki
        // 2. 리엑트에서 서버에 wiki 데이터 요청하기
        fetchPlantData();

    }, [])

    async function fetchPlantData() {
        try {
            const resp = await fetch(API_URL, {
                method: "GET",
            });
            console.log(`# resp: `, resp)
        } catch (e: any) {
        } finally {
        }
    }

    return (
        <div>
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
        </div>
    );
};

export default WikiPreview;
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// --- Types ------------------------------------------------------------------
export type Plant = {
    id: number;
    name: string;
    sunlight?: string | null;
    watering?: string | null;
    temperature?: string | null;
    humidity?: string | null;
    soil?: string | null;
    fertilizer?: string | null;
    repotting?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    img_url?: string | null;
};

// ⚠️ 디자인 전용 껍데기: 데이터 바인딩만 있고 로직/훅/함수 없음.
//    필요 필드: id, name, sunlight, watering, temperature, humidity,
//              soil, fertilizer, repotting, created_at, updated_at, img_url


export default function PlantDetail() {
    const API_URL = `${process.env.REACT_APP_SERVER_API_URL}/api/wiki/get_a_wiki`;

    const [plant, setPlant] = useState<Plant>({} as any);
    const [searchParams] = useSearchParams();
    const wiki_id = Number(searchParams?.get("wiki_id") ?? 2);

    useEffect(() => {
        // 1. localhost:3001/api/wiki
        // 2. 리엑트에서 서버에 wiki 데이터 요청하기
        fetchPlantData();

    }, [])

    async function fetchPlantData() {
        try {
            let resp: any = await axios(`${API_URL}?wiki_id=${wiki_id}`, {
                method: "GET",
            });
            resp = resp?.data
            if (!resp?.success) {
                alert(`서버 에러 발생. ${resp?.message ?? ""}`)
            }
            setPlant(resp?.data);
        } catch (e: any) {
            alert(`서버 에러 발생. ${e?.message ?? ""}`)
        } finally {
        }
    }

    // useEffect(() => {
    //     const dummy: Plant = {
    //         id: 7,
    //         name: "몬스테라",
    //         sunlight: "밝은 간접광, 직사광선 피함",
    //         watering: "상단 2~3cm 흙이 마르면 충분히",
    //         temperature: "18~27℃",
    //         humidity: "중~높음, 주 1~2회 분무",
    //         soil: "배수 좋은 토분(펄라이트 믹스)",
    //         fertilizer: "성장기 월 1회 액비",
    //         repotting: "1~2년마다 초봄",
    //         created_at: "2025-08-01 10:12",
    //         updated_at: "2025-09-01 09:30",
    //         img_url: "https://picsum.photos/1200/800?blur=0",
    //     };
    //     setPlant(dummy);
    // }, [])
    return (
        <div className="mx-auto max-w-6xl px-4 py-6">
            {/* Breadcrumbs */}
            <nav className="mb-4 text-sm text-slate-500">
                <a href="/" className="hover:text-emerald-700">Home</a>
                <span className="mx-2">/</span>
                <a href="/wiki" className="hover:text-emerald-700">Wiki</a>
                <span className="mx-2">/</span>
                <span className="text-slate-700">{plant.name}</span>
            </nav>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                {/* Left: Hero Image */}
                <div className="md:col-span-3 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
                    <div className="relative">
                        <img
                            src={plant?.img_url || "/placeholder-plant.jpg"}
                            alt={plant?.name}
                            className="aspect-[16/10] w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                </div>

                {/* Right: Title & Quick Meta */}
                <aside className="md:col-span-2 space-y-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">{plant?.name}</h1>
                    </div>

                    {/* Quick meta pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                            빛: {plant?.sunlight}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                            물주기: {plant?.watering}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                            온도: {plant?.temperature}
                        </span>
                    </div>

                    {/* timestamps */}
                    <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-slate-500">
                        <div className="rounded-lg bg-slate-50 p-2">생성: {plant?.created_at || '-'}</div>
                        <div className="rounded-lg bg-slate-50 p-2">수정: {plant?.updated_at || '-'}</div>
                    </div>

                    {/* meta-list */}
                    <div className="mt-3 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/40 p-3 text-sm text-slate-700">
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                            <div className="font-semibold text-slate-600">ID</div>
                            <div className="col-span-2">{plant?.id}</div>
                            <div className="font-semibold text-slate-600">이름</div>
                            <div className="col-span-2">{plant?.name}</div>
                            <div className="font-semibold text-slate-600">이미지</div>
                            <div className="col-span-2 break-all">{plant?.img_url || '-'}</div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Detail Sections */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-2 text-lg font-bold text-slate-800">☀️ 빛(일조)</h2>
                    <p className="whitespace-pre-wrap leading-7 text-slate-700">{plant?.sunlight}</p>
                </section>
                <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-2 text-lg font-bold text-slate-800">💧 물주기</h2>
                    <p className="whitespace-pre-wrap leading-7 text-slate-700">{plant?.watering}</p>
                </section>
                <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-2 text-lg font-bold text-slate-800">🌡️ 온도</h2>
                    <p className="whitespace-pre-wrap leading-7 text-slate-700">{plant?.temperature}</p>
                </section>
                <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-2 text-lg font-bold text-slate-800">💦 습도</h2>
                    <p className="whitespace-pre-wrap leading-7 text-slate-700">{plant?.humidity}</p>
                </section>
                <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-2 text-lg font-bold text-slate-800">🪴 토양</h2>
                    <p className="whitespace-pre-wrap leading-7 text-slate-700">{plant?.soil}</p>
                </section>
                <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-2 text-lg font-bold text-slate-800">🧪 비료</h2>
                    <p className="whitespace-pre-wrap leading-7 text-slate-700">{plant?.fertilizer}</p>
                </section>
                <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-2 text-lg font-bold text-slate-800">🪵 분갈이</h2>
                    <p className="whitespace-pre-wrap leading-7 text-slate-700">{plant?.repotting}</p>
                </section>
            </div>


        </div>
    );
}

// src/components/Header.tsx
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UploadIcon from "./svg/UploadIcon";
import CameraIcon from "./CameraIcon";
import { formatBytes } from "../hooks/utils";
import Stat from "./Stat";


const AiDiagnose: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

    const onPick = () => fileInputRef.current?.click();

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) {
            setFile(f);
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
                                    onClick={() => { }}
                                    disabled={isLoading}
                                    className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 disabled:opacity-60"
                                >
                                    {isLoading ? "분석 중..." : "진단 요청"}
                                </button>
                            </div>

                            <div className="mt-6 rounded-2xl border border-emerald-200/70 bg-emerald-50 p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-bold text-emerald-900">가짜 레이블</p>
                                    <span className="rounded-xl bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                                        신뢰도 가짜값%
                                    </span>
                                </div>
                                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-emerald-900/90">

                                    <li key="fake1">가짜li 값</li>
                                </ul>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <a key="가짜akey1" href="" className="rounded-xl bg-white px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100">
                                        가자 a title
                                    </a>
                                </div>
                            </div>
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
                                <Stat label="해상도" value="-" />
                                <Stat label="파일 크기" value="-" />
                                <Stat label="메모" value={"-"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiDiagnose;
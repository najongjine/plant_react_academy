// src/components/Header.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    apiUrl?: string; // 기본: http://localhost:3001/api/gemini/simple
};

const GeminiAIDiagonis: React.FC<Props> = ({ apiUrl }) => {
    const API_URL = apiUrl ?? `${process.env.REACT_APP_SERVER_API_URL}/api/gemini/simple`;

    const [files, setFiles] = useState<File[]>([]);
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);


    const onFiles = (list: FileList | File[]) => {
        const arr = Array.from(list).filter((f) => f.type.startsWith("image/"));
        if (arr.length === 0) return;
        setFiles(arr.slice(0, 6)); // 최대 6장
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        onFiles(e.target.files);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const removeOne = (idx: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    };
    const clearAll = () => setFiles([]);

    const send = useCallback(async () => {
        if (!prompt.trim() && files.length === 0) {
            alert("이미지나 질문 중 하나는 있어야 해요!");
            return;
        }
        setLoading(true);
        setAnswer("");

        const form = new FormData();
        form.append("prompt", prompt);
        files.forEach((f) => form.append("images", f, f.name));

        try {
            const resp = await fetch(API_URL, {
                method: "POST",
                body: form,
            });
            if (!resp.ok) {
                const msg = await resp.text().catch(() => "");
                throw new Error(msg || `HTTP ${resp.status}`);
            }
            const data: { text?: string; error?: string } = await resp.json();
            if (data.error) throw new Error(data.error);
            setAnswer(data.text ?? "");
        } catch (e: any) {
            setAnswer(`에러: ${e?.message || e}`);
        } finally {
            setLoading(false);
        }
    }, [API_URL, files, prompt]);

    const firstPreviewUrl = useMemo(() => {
        if (!files[0]) return null;
        return URL.createObjectURL(files[0]);
    }, [files]);

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8">
            {/* 헤더 */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-emerald-800">
                        AI 진단
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Gemini 2.5 Flash 간단 질의
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="hidden rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 md:block"
                >
                    이미지 선택
                </button>
            </div>

            {/* 메인 카드 */}
            <div className="rounded-2xl border border-emerald-100 bg-white shadow-[0_10px_30px_-10px_rgba(16,185,129,0.25)]">
                {/* 업로드/미리보기 섹션 */}
                <div className="grid gap-6 p-6">
                    {/* 드롭존 */}
                    <div
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        className={[
                            "relative grid rounded-2xl overflow-hidden",
                            "w-[560px] md:w-[640px]",   // 가로
                            "h-[300px] md:h-[340px]",   // 세로
                            "mx-auto place-content-center",
                            "border-2 border-dashed border-emerald-300 bg-emerald-50/60",
                            "text-center transition hover:bg-emerald-50",
                        ].join(" ")}
                        aria-label="이미지 드래그 앤 드롭 영역"
                    >
                        {firstPreviewUrl ? (
                            <img
                                src={firstPreviewUrl}
                                alt="preview"
                                className="block h-full w-full max-h-full max-w-full object-contain"
                            />
                        ) : (
                            <div className="pointer-events-none flex flex-col items-center justify-center">
                                <div className="mb-2 rounded-xl border-2 border-slate-900 px-4 py-3 text-xl font-extrabold">
                                    사진을 올려주세요
                                </div>
                                <p className="text-[11px] text-slate-500">
                                    이미지를 끌어다 놓거나 아래 버튼으로 선택하세요.
                                </p>
                            </div>
                        )}

                        {/* 파일 입력 숨김 */}
                        <input
                            ref={inputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={onInputChange}
                            className="hidden"
                        />

                        {/* 드롭존 하단 버튼들 */}
                        <div className="pointer-events-auto absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className="rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 backdrop-blur transition hover:bg-white"
                            >
                                찾아보기…
                            </button>
                            {files.length > 0 && (
                                <button
                                    type="button"
                                    onClick={clearAll}
                                    className="rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 backdrop-blur transition hover:bg-white"
                                >
                                    모두 지우기
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 선택된 파일 리스트(있을 때만) */}
                    {files.length > 0 && (
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                            <p className="mb-2 text-xs font-semibold text-emerald-800">
                                선택된 파일
                            </p>
                            <ul className="flex flex-wrap gap-2">
                                {files.map((f, i) => (
                                    <li
                                        key={i}
                                        className="group flex items-center gap-2 rounded-lg bg-white px-2 py-1 text-xs ring-1 ring-emerald-100"
                                    >
                                        <span className="max-w-[220px] truncate">{f.name}</span>
                                        <button
                                            onClick={() => removeOne(i)}
                                            className="rounded-md px-1.5 py-0.5 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                                            title="제거"
                                            aria-label={`${f.name} 제거`}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* 질의 입력 */}
                    <div className="space-y-2">
                        <label
                            htmlFor="prompt"
                            className="text-[13px] font-semibold text-slate-700"
                        >
                            질문 입력(옵션)
                        </label>
                        <textarea
                            id="prompt"
                            rows={6}
                            placeholder="예) 잎에 검은 점이 퍼지고 물 줬더니 잎 끝이 타요. 병충해인지, 영양 문제인지 알려줘."
                            className={[
                                "w-full resize-y rounded-2xl border-[3px] border-slate-900/80",
                                "bg-white/90 p-4 text-[15px] leading-6",
                                "shadow-inner outline-none transition",
                                "focus:border-emerald-700",
                            ].join(" ")}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </div>

                    {/* 액션 */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={send}
                            disabled={loading}
                            aria-busy={loading}
                            className={[
                                "rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-md transition",
                                "bg-emerald-600 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60",
                            ].join(" ")}
                        >
                            {loading ? "보내는 중..." : "보내기"}
                        </button>

                        <p className="text-xs text-slate-500">
                            이미지 또는 질문만으로도 진단을 요청할 수 있어요.
                        </p>
                    </div>

                    {/* 답변 */}
                    <div className="space-y-2">
                        <p className="text-lg font-extrabold tracking-tight text-slate-900">
                            답변 :
                        </p>
                        <div
                            className={[
                                "min-h-[220px] rounded-2xl border-[3px] border-slate-900/80 bg-white/90 p-4",
                                "whitespace-pre-wrap text-[15px] leading-7",
                            ].join(" ")}
                        >
                            {answer || "—"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeminiAIDiagonis;
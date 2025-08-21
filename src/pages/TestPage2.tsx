// src/pages/TestPage.tsx
import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { drawBoxes, fileToBase64 } from "../hooks/utils";
import type { RoboflowResponse } from "../types/roboflow";
import AiDiagnose from "../components/AiDiagnose";

const TestPage2: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setFiles(Array.from(e.target.files));
    };

    const send = async () => {
        if (loading) return;
        setAnswer('');
        setLoading(true);

        const ctrl = new AbortController();
        abortRef.current = ctrl;

        const form = new FormData();
        form.append('prompt', prompt);
        files.forEach((f) => form.append('images', f, f.name));

        try {
            const resp = await fetch('http://localhost:8787/api/gemini/stream', {
                method: 'POST',
                body: form,
                signal: ctrl.signal,
            });
            if (!resp.ok || !resp.body) {
                const t = await resp.text().catch(() => '');
                throw new Error(t || `HTTP ${resp.status}`);
            }

            const reader = resp.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                setAnswer((prev) => prev + decoder.decode(value, { stream: true }));
            }
        } catch (e: any) {
            if (ctrl.signal.aborted) {
                setAnswer((prev) => prev + '\n\n[중지됨]');
            } else {
                setAnswer((prev) => prev + `\n\n[에러] ${e?.message ?? e}`);
            }
        } finally {
            setLoading(false);
            abortRef.current = null;
        }
    };

    const stop = () => abortRef.current?.abort();

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2">Gemini 2.5 Flash (이미지+텍스트, 스트리밍)</h1>
            <p className="text-sm text-gray-600 mb-4">
                사진을 올리고 질문을 입력하면, 답변이 한 글자씩 찍히듯 실시간으로 표시됩니다.
            </p>

            <label className="block mb-2 font-medium">이미지 선택 (여러 장 가능)</label>
            <input type="file" accept="image/*" multiple onChange={handleFiles} className="mb-3" />

            <div className="flex gap-2 overflow-x-auto mb-4">
                {files.map((f, i) => (
                    <img
                        key={i}
                        src={URL.createObjectURL(f)}
                        alt=""
                        className="h-24 rounded border"
                        onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                    />
                ))}
            </div>

            <label className="block mb-2 font-medium">질문</label>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full border rounded p-2 mb-3"
                placeholder="예) 이 사진 속 식물의 상태를 분석해줘. 필요한 추가 정보가 있으면 먼저 질문해줘."
            />

            <div className="flex gap-2 mb-4">
                <button
                    onClick={send}
                    disabled={loading}
                    className="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-60"
                >
                    {loading ? '요청 중…' : '질의 보내기'}
                </button>
                <button
                    onClick={stop}
                    disabled={!loading}
                    className="px-4 py-2 rounded border"
                >
                    중지
                </button>
            </div>

            <pre className="whitespace-pre-wrap bg-gray-50 border rounded p-3 min-h-[160px]">
                {answer || '여기에 답변이 표시됩니다...'}
            </pre>
        </div>
    );
};

export default TestPage2;

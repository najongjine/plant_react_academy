// src/components/Header.tsx
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";


const AiDiagnose: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

    const onPick = () => fileInputRef.current?.click();

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) {
            setFile(f);
            setResult(null);
        }
    };

    async function runDiagnosisMock() {
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
        <div>

        </div>
    );
};

export default AiDiagnose;
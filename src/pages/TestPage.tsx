// src/pages/TestPage.tsx
import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { drawBoxes, fileToBase64 } from "../hooks/utils";
import type { RoboflowResponse } from "../types/roboflow";

const TestPage: React.FC = () => {
    // NOTE: 실제 배포에선 키 노출 방지(프록시 서버) 권장
    const endpoint = "https://serverless.roboflow.com/corn-leaf-blight-detection-final/2";
    const apiKey = "iWXvPKU6wZG4gB4PEeuI";

    const [file, setFile] = useState<File | null>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);           // 미리보기 data URL
    const [result, setResult] = useState<RoboflowResponse | null>(null); // 응답 JSON
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const imgRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // 파일 선택 → dataURL 미리보기
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        const reader = new FileReader();
        reader.onload = () => setImgSrc(String(reader.result));
        reader.readAsDataURL(f);
    };

    // 업로드 & 추론 요청
    const runInference = async (): Promise<void> => {
        if (!file) {
            setError("먼저 이미지를 선택하세요.");
            return;
        }
        setLoading(true);
        setError("");
        setResult(null);

        try {
            // 1) 파일을 base64 (헤더 제거)로 변환
            const base64: string = await fileToBase64(file);
            const base64Body = base64.split(",")[1] ?? ""; // data:image/...;base64, 이후만 추출

            // 2) 서버 요청
            const res: AxiosResponse<any> = await axios({
                method: "POST",
                url: endpoint,
                params: { api_key: apiKey },
                data: base64Body,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            // RoboflowResponse 형태를 기대하지만, 혹시 몰라 any → 부분적 캐스팅
            const data: any = res.data;
            setResult(data as RoboflowResponse);
        } catch (err: any) {
            console.error(err);
            setError(err?.message || "요청 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 응답(result) 도착 시, 캔버스에 박스 그리기
    useEffect(() => {
        if (!result || !imgRef.current || !canvasRef.current) return;

        const imgEl = imgRef.current;
        const canvas = canvasRef.current;

        // 이미지가 로드된 뒤 그리기
        if (!imgEl.complete) {
            const onLoad = () => drawBoxes(canvas, imgEl, result);
            imgEl.addEventListener("load", onLoad, { once: true });
            return () => imgEl.removeEventListener("load", onLoad);
        } else {
            drawBoxes(canvas, imgEl, result);
        }
    }, [result, imgSrc]);

    return (
        <div
            style={{
                maxWidth: 900,
                margin: "40px auto",
                padding: 16,
                fontFamily:
                    "system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans KR', sans-serif",
            }}
        >
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
                Roboflow 객체 인식 데모 (React + TypeScript)
            </h1>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr auto" }}>
                <input type="file" accept="image/*" onChange={onFileChange} />
                <button
                    onClick={runInference}
                    disabled={!file || loading}
                    style={{
                        padding: "8px 14px",
                        borderRadius: 10,
                        border: "1px solid #e2e8f0",
                        background: loading ? "#efefef" : "#111",
                        color: loading ? "#888" : "#fff",
                        cursor: !file || loading ? "not-allowed" : "pointer",
                        fontWeight: 600,
                    }}
                >
                    {loading ? "분석 중..." : "분석하기"}
                </button>
            </div>

            {error && (
                <p style={{ marginTop: 10, color: "#e11d48", fontWeight: 600 }}>
                    오류: {error}
                </p>
            )}

            <div
                style={{
                    marginTop: 20,
                    display: "grid",
                    gap: 16,
                    gridTemplateColumns: "1fr 1fr",
                }}
            >
                {/* 좌: 원본 + 박스오버레이 */}
                <div
                    style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: 12,
                        padding: 12,
                    }}
                >
                    <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                        결과 이미지
                    </h2>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            overflow: "hidden",
                            borderRadius: 8,
                        }}
                    >
                        {/* 원본 이미지 */}
                        {imgSrc ? (
                            <img
                                ref={imgRef}
                                src={imgSrc}
                                alt="preview"
                                style={{ width: "100%", display: "block" }}
                            />
                        ) : (
                            <div
                                style={{
                                    aspectRatio: "4 / 3",
                                    background: "#f1f5f9",
                                    display: "grid",
                                    placeItems: "center",
                                    color: "#64748b",
                                    fontSize: 14,
                                }}
                            >
                                이미지 미리보기
                            </div>
                        )}

                        {/* 상단 오버레이 캔버스 */}
                        <canvas
                            ref={canvasRef}
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                pointerEvents: "none",
                            }}
                        />
                    </div>
                </div>

                {/* 우: JSON 결과 */}
                <div
                    style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: 12,
                        padding: 12,
                        minHeight: 200,
                    }}
                >
                    <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                        응답 데이터
                    </h2>
                    <pre
                        style={{
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            background: "#0b1021",
                            color: "#e2e8f0",
                            padding: 12,
                            borderRadius: 8,
                            fontSize: 12,
                            maxHeight: 420,
                            overflow: "auto",
                        }}
                    >
                        {result ? JSON.stringify(result, null, 2) : "아직 결과가 없습니다."}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default TestPage;

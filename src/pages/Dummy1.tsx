// src/pages/TestPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { fileToBase64 } from "../hooks/utils";
import axios, { AxiosResponse } from "axios";

type RoboflowPrediction = {
    class?: string;
    confidence?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    // 필요시 더 확장
};
type RoboflowResponse = {
    time?: number;
    image?: { width: number; height: number };
    predictions?: RoboflowPrediction[];
    [k: string]: any;
};

const Dummy1: React.FC = () => {
    const apiKey = process.env.REACT_APP_ROBOFLOW_API_KEY;
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [roboflowPredict, setRoboflowPredict] = useState<RoboflowResponse>({});
    const [dummy, setDummy] = useState<any>({});
    useEffect(
        () => {

        }
        , [])

    const getAIReponse = async () => {
        try {

            const base64: string = await fileToBase64((file) as any);
            const base64Body = base64.split(",")[1] ?? ""; // data:image/...;base64, 이후만 추출

            // 2) roboflow 서버에 AI 판별 요청
            const res: AxiosResponse<any> = await axios({
                method: "POST",
                url: `https://serverless.roboflow.com/plants-final/1`,
                params: { api_key: apiKey },
                data: base64Body,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            // RoboflowResponse 형태를 기대하지만, 혹시 몰라 any → 부분적 캐스팅
            let data: any = res?.data;
            console.log(`# data: `, data)
            setRoboflowPredict(data);

        } catch (error: any) {
            console.error(`! getAIReponse err: `, error?.message)
        }

    }

    const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const f = e.target.files?.[0] || null;
            setFile(f ?? null);
            if (f) {
                const url = URL.createObjectURL(f);
                setPreview(URL.createObjectURL(f)); // 미리보기 URL 생성
            }
        } catch (error: any) {
            console.error(`! onpick err: `, error?.message)
        }

    };

    return (
        <div>
            <div>
                <div>
                    {file && (
                        <div style={{ marginTop: "10px" }}>
                            <p>선택한 파일: {file.name}</p>
                            <img
                                src={preview}
                                alt="preview"
                                style={{ width: "415px", height: "415px", objectFit: "cover" }}
                            />
                        </div>
                    )}
                </div>
                <div>
                    <input
                        type="file" accept="image/*" onChange={onPick} />

                </div>
                <div>
                    <button
                        onClick={getAIReponse}
                        style={{
                            padding: "8px 14px",
                            borderRadius: 8,
                            border: "1px solid #ddd",
                        }}
                    >
                        Roboflow로 전송
                    </button>
                </div>
                <div>
                    <ul>
                        {roboflowPredict?.predictions?.map((p) => (
                            <li key={p.confidence}>
                                {p.class} ({(p?.confidence ?? 0 * 100).toFixed(1)}%)
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dummy1;

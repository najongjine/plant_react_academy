// src/pages/TestPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { fileToBase64 } from "../hooks/utils";
import axios, { AxiosResponse } from "axios";

const Dummy1: React.FC = () => {
    const apiKey = process.env.REACT_APP_ROBOFLOW_API_KEY;
    const [file, setFile] = useState<File | null>(null);

    useEffect(
        () => {

        }
        , [])

    const getAIReponse = async () => {
        console.log(`# apikey:${apiKey}`);

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
        const data: any = res.data;
    }

    return (
        <div>
            <div>
                apikey:{apiKey}
            </div>
        </div>
    );
};

export default Dummy1;

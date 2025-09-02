import React from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


const TosspayFail: React.FC = () => {
    const [searchParams] = useSearchParams();

    return (
        <div className="result wrapper">
            <div className="box_section">
                <h2>
                    결제 실패
                </h2>
                <p>{`에러 코드: ${searchParams.get("code")}`}</p>
                <p>{`실패 사유: ${searchParams.get("message")}`}</p>
            </div>
        </div>
    );
};

export default TosspayFail;
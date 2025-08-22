// src/pages/TestPage.tsx
import React, { useEffect, useRef, useState } from "react";

const Dummy1: React.FC = () => {
    const apiKey = process.env.REACT_APP_ROBOFLOW_API_KEY;
    useEffect(
        () => {
            console.log(`# apikey:${apiKey}`);
        }
        , [])

    return (
        <div>
            <div>
                apikey:{apiKey}
            </div>
        </div>
    );
};

export default Dummy1;

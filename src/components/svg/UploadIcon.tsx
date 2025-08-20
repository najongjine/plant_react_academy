// src/components/Header.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";


const UploadIcon: React.FC = () => {


    return (
        <div>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 16V4M7 9l5-5 5 5" />
                <path d="M5 20h14" />
            </svg>
        </div>
    );
};

export default UploadIcon;
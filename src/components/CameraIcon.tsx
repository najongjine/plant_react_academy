// src/components/Header.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";


const CameraIcon: React.FC = () => {


    return (
        <div>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7h4l2-3h6l2 3h4v12H3z" />
                <circle cx="12" cy="13" r="4" />
            </svg>
        </div>
    );
};

export default CameraIcon;
// src/components/Header.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";


const LeafIcon: React.FC = () => {


    return (
        <div>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 21c8 0 14-6 14-14V3h-4C7 3 3 7 3 15v1c0 2 0 3 2 5z" />
            </svg>
        </div>
    );
};

export default LeafIcon;
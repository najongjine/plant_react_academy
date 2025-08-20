// src/components/Header.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";


const SparkleIcon: React.FC = () => {


    return (
        <div>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
                <circle cx="18" cy="18" r="2" />
            </svg>
        </div>
    );
};

export default SparkleIcon;
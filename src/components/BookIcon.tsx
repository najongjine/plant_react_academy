// src/components/Header.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";


const BookIcon: React.FC = () => {


    return (
        <div>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 4h13a3 3 0 0 1 3 3v12H6a3 3 0 0 0-3 3z" />
                <path d="M6 22V7a3 3 0 0 1 3-3h10" />
            </svg>
        </div>
    );
};

export default BookIcon;
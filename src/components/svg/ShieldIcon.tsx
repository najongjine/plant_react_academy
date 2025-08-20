// src/components/Header.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";


const ShieldIcon: React.FC = () => {


    return (
        <div>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l8 4v6c0 5-3 8-8 10C7 20 4 17 4 12V6z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        </div>
    );
};

export default ShieldIcon;
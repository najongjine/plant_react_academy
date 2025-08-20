// src/components/Header.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";


const ListIcon: React.FC = () => {


    return (
        <div>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 6h13M8 12h13M8 18h13" />
                <circle cx="3" cy="6" r="1.5" /><circle cx="3" cy="12" r="1.5" /><circle cx="3" cy="18" r="1.5" />
            </svg>
        </div>
    );
};

export default ListIcon;
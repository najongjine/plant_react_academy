// src/components/Header.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";


type StatProps = {
    label: string;
    value: string;
    children?: React.ReactNode;
};

const Stat: React.FC<StatProps> = ({ label, value }) => {
    return (
        <div className="rounded-2xl border border-emerald-200/70 bg-white px-3 py-2">
            <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
            <div className="text-sm font-semibold text-slate-800">{value}</div>
        </div>
    );
};

export default Stat;
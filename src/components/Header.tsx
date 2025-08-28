// src/components/Header.tsx
import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const headerBg =
    "https://images.unsplash.com/photo-1483794344563-d27a8d18014e?q=80&w=1600&auto=format&fit=crop"; // 잎사귀 배경
function LeafIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 21c8 0 14-6 14-14V3h-4C7 3 3 7 3 15v1c0 2 0 3 2 5z" />
        </svg>
    );
}
const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-emerald-200/60 bg-white/70 backdrop-blur">
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${headerBg})` }}
            />
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white"><LeafIcon /></span>
                    <span className="text-lg md:text-xl">PlantCare</span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        to="/"
                        className="text-[15px] font-medium text-slate-700 hover:text-emerald-700"
                    >
                        Home
                    </Link>

                    <Link
                        to="/ai"
                        className="text-[15px] font-medium text-slate-700 hover:text-emerald-700"
                    >
                        AI
                    </Link>

                    <Link
                        to="/wiki"
                        className="text-[15px] font-medium text-slate-700 hover:text-emerald-700"
                    >
                        Wiki
                    </Link>
                </nav>

                <a
                    href="#ai"
                    className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                >
                    Start AI
                </a>
            </div>
        </header>
    );
};

export default Header;
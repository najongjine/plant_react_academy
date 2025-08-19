// src/components/Header.tsx
import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>🌟 나의 멋진 리액트 앱</h1>
            <nav>
                <Link to={"/"}>홈 </Link>
                <Link to={"/counter"}> counter</Link>
            </nav>
        </header>
    );
};

export default Header;
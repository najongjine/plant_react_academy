import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <>
            <h2>홈 화면이에요!</h2>
            <p>리액트와 타입스크립트를 배워봐요 🎉</p>
            <Link to="/todo_list">
                <button>Todo List로 이동</button>
            </Link>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-blue-500">
                    Tailwind CSS 적용 완료!
                </h1>
            </div>
        </>
    );
};

export default Home;
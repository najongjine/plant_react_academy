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
        </>
    );
};

export default Home;
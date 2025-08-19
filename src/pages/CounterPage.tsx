import React from "react";
import { useCounterStore } from "../store/counterStore";

const CounterPage: React.FC = () => {
    const count = useCounterStore((state) => state.count);
    const increase = useCounterStore((state) => state.increase);
    const reset = useCounterStore((state) => state.reset);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>🔢 Zustand 전역 상태 테스트</h1>
            <p>현재 숫자: {count}</p>
            <button onClick={increase}>+1 증가</button>
            <button onClick={reset} style={{ marginLeft: "1rem" }}>
                리셋
            </button>
        </div>
    );
};

export default CounterPage;
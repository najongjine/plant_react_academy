import { RoboflowPrediction, RoboflowResponse } from "../types/roboflow";

export function formatBytes(bytes: number) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}
// 파일을 base64 Data URL(string)로 변환
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = reject;
        r.readAsDataURL(file);
    });
}

/**
 * Roboflow 응답의 bbox들을 <canvas> 위에 그려줌
 * - result는 스펙 변동 가능성이 있어 any 허용하되, 우리가 쓰는 최소 타입은 체크
 */
export function drawBoxes(
    canvas: HTMLCanvasElement,
    imgEl: HTMLImageElement,
    result: RoboflowResponse | any
): void {
    const preds: RoboflowPrediction[] = (result?.predictions ?? []) as RoboflowPrediction[];

    const displayWidth = imgEl.clientWidth || imgEl.width;
    const displayHeight = imgEl.clientHeight || imgEl.height;

    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.lineWidth = 2;
    ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans KR', sans-serif";

    // 원본 해상도 정보가 응답에 있을 수도 있음
    const naturalWidth =
        Number(result?.image?.width) || imgEl.naturalWidth || displayWidth;
    const naturalHeight =
        Number(result?.image?.height) || imgEl.naturalHeight || displayHeight;

    const sx = displayWidth / naturalWidth;
    const sy = displayHeight / naturalHeight;

    for (const p of preds) {
        // 필수 필드가 없으면 스킵
        if (
            typeof p.x !== "number" ||
            typeof p.y !== "number" ||
            typeof p.width !== "number" ||
            typeof p.height !== "number"
        ) {
            continue;
        }

        const left = (p.x - p.width / 2) * sx;
        const top = (p.y - p.height / 2) * sy;
        const w = p.width * sx;
        const h = p.height * sy;

        // 박스
        ctx.strokeStyle = "rgba(16, 185, 129, 1)";
        ctx.strokeRect(left, top, w, h);

        // 라벨
        const label = `${p.class ?? "object"} ${typeof p.confidence === "number" ? (p.confidence * 100).toFixed(1) : "?"
            }%`;

        const paddingX = 6;
        const boxH = 18;

        const textWidth = ctx.measureText(label).width;
        const boxW = textWidth + paddingX * 2;

        ctx.fillStyle = "rgba(16, 185, 129, 0.9)";
        ctx.fillRect(left, Math.max(0, top - boxH), boxW, boxH);

        ctx.fillStyle = "#0b1021";
        // y 좌표는 박스 안쪽(텍스트 baseline 고려)
        ctx.fillText(label, left + paddingX, Math.max(12, top - boxH + 13));
    }
}
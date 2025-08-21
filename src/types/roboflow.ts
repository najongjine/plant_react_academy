// src/types/roboflow.ts
export interface RoboflowPrediction {
    x: number;
    y: number;
    width: number;
    height: number;
    class: string;
    confidence: number;
    // 모델/버전에 따라 추가 필드가 올 수 있으므로 any 허용
    [k: string]: any;
}

export interface RoboflowImageMeta {
    width?: number;
    height?: number;
    [k: string]: any;
}

export interface RoboflowResponse {
    predictions: RoboflowPrediction[];
    image?: RoboflowImageMeta;
    // 기타 필드 대비
    [k: string]: any;
}

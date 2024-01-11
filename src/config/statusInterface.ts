import { Color } from "antd/es/color-picker";

/**
 * 关于页面水印类型
 */
export interface WatermarkConfig {
    content: string;
    color: string | Color;
    fontSize: number;
    zIndex: number;
    rotate: number;
    gap: [number, number];
    offset?: [number, number];
}
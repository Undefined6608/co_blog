import React, { useMemo, useState } from "react";
import { Watermark } from "antd";
import { Color } from "antd/es/color-picker";
import "../sass/pages/commonPages.sass";
import "../sass/pages/about.sass";

interface WatermarkConfig {
    content: string;
    color: string | Color;
    fontSize: number;
    zIndex: number;
    rotate: number;
    gap: [number, number];
    offset?: [number, number];
}

export const About: React.FC = () => {
	const [ config ] = useState< WatermarkConfig >({
		content: "Ant Design",
		color: "rgba(0, 0, 0, 0.15)",
		fontSize: 16,
		zIndex: 11,
		rotate: -22,
		gap: [100, 100],
		offset: undefined,
	});
	const { content, color, fontSize, zIndex, rotate, gap, offset } = config;
	const watermarkProps = useMemo(
		() => ({
			content,
			font: {
				color: typeof color === "string" ? color : color.toRgbString(),
				fontSize,
			},
			zIndex,
			rotate,
			gap,
			offset,
		}),
		[color, content, fontSize, gap, offset, rotate, zIndex],
	);
	return (
		<div className={"commonPages"}>
			<Watermark {...watermarkProps}>
				<div className={"about"}>
					<div className={"editAvatar"}>
						<img src="http://39.101.72.168:81/image/icon.jpg" alt="" />
					</div>
					<div className={"editMsg"}>
						<span>Version: <span className={"version"}>1.3.10</span></span>
						<span>Author: <span className={"authorName"}>ZbvcDevelopmentTeam</span></span>
						<span>QQ: <span className={"authorQQ"}>1105149059</span></span>
						<span>Email: <span className={"authorEmail"}>15506531157@163.com</span></span>
						<span>本博客为个人项目，请勿在作者允许前商业使用！</span>
					</div>
				</div>
			</Watermark>
		</div>
	);
};
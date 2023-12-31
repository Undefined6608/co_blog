import React, {useRef, useState} from "react";
import "../../sass/common/commonInputBox.sass";
import {SizeInterface} from "../../config/publicInterface";

export const CommonInputBox: React.FC<SizeInterface> = ({ param }) => {
	const [inputValue, setInputValue] = useState("");
	const [tipShow, setTipShow] = useState(true);
	const inputRef = useRef<HTMLInputElement>(null);
	// 更新输入框内部组件显示
	const updateTipShow = (ev: React.FormEvent<HTMLInputElement>) => {
		const target = ev.target as HTMLInputElement;
		setInputValue(target.value);
		if (target.value === "") return setTipShow(true);
		setTipShow(false);
	};
	// 键盘监听事件
	onkeydown = (ev) => {
		// console.log(ev)
		if (ev.ctrlKey && ev.code === "KeyK") {
			ev.preventDefault();
			inputRef.current?.focus();
			return;
		}
		if (ev.code === "Escape") {
			inputRef.current?.blur();
			setInputValue("");
			setTipShow(true);
			return;
		}
	};

	return (
		<div className="input-box" style={{ width: param.width, height: param.height, marginTop: param.marginTop }}>
			<input type="text" name={"search"} className={"input"} onInput={updateTipShow} value={inputValue} ref={inputRef} placeholder={"Search Documentation..."} style={{ height: param.height }} />
			<span className={"input-box-tip"}>{tipShow ? "CTRL K" : "ESC"}</span>
		</div>
	);
};
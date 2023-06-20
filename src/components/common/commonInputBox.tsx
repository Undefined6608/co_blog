import React, {useRef, useState} from "react";
import "../../sass/common/commonInputBox.sass";
import {SizeInterface} from "../../config/publicInterface";

export const CommonInputBox: React.FC<SizeInterface> = ({param}) => {
    const [inputValue, setInputValue] = useState("");
    const [tipShow, setTipShow] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    // 更新输入框内部组件显示
    const updateTipShow = (ev: any) => {
        setInputValue(ev.target.value);
        if (ev.target.value === '') return setTipShow(true);
        setTipShow(false);
    };
    // 键盘监听事件
    onkeydown = (ev) => {
        // console.log(ev)
        if (ev.ctrlKey && ev.code === "KeyK") return inputRef.current?.focus();
        if (ev.code === "Escape") {
            inputRef.current?.blur();
            setInputValue("");
            setTipShow(true);
            return;
        }
    };

    return (
        <div className="input-box" style={{width: param.width, height: param.height,marginTop:param.marginTop}}>
            <input type="text" name={"search"} className={"input"} onInput={updateTipShow} value={inputValue} ref={inputRef}
                   placeholder={"Search Documentation..."}/>
            <span className={"input-box-tip"}>{tipShow ? "CTRL K" : "ESC"}</span>
        </div>
    )
}
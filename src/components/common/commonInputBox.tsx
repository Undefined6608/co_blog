import React, { useRef, useState } from "react";
import "../../sass/common/commonInputBox.sass";
import { SizeInterface } from "../../config/propsInterface";

/**
 * 公共输入框组件
 * @param param 样式参数
 * @returns
 */
export const CommonInputBox: React.FC<SizeInterface> = ({ param }) => {
  // 输入框内容
  const [inputValue, setInputValue] = useState("");
  // 输入框提示
  const [tipShow, setTipShow] = useState(true);
  // 输入框组件
  const inputRef = useRef<HTMLInputElement>(null);
  /**
   * 更新输入框内部组件显示内容
   * @param ev 组件输入事件参数
   * @returns
   */
  const updateTipShow = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement;
    setInputValue(target.value);
    if (target.value === "") return setTipShow(true);
    setTipShow(false);
  };
  /**
   * 键盘监听事件
   */
  onkeydown = (ev) => {
    // console.log(ev)
    // Ctrl + K 快捷键 ---- 快捷选中
    if (ev.ctrlKey && ev.code === "KeyK") {
      ev.preventDefault();
      inputRef.current?.focus();
      return;
    }
    // esc 快捷键 ---- 快捷取消
    if (ev.code === "Escape") {
      inputRef.current?.blur();
      setInputValue("");
      setTipShow(true);
      return;
    }
  };

  return (
    <div
      className="input-box"
      style={{
        width: param.width,
        height: param.height,
        marginTop: param.marginTop,
      }}
    >
      <input
        type="text"
        name={"search"}
        className={"input"}
        onInput={updateTipShow}
        value={inputValue}
        ref={inputRef}
        placeholder={"Search Documentation..."}
        style={{ height: param.height }}
      />
      <span className={"input-box-tip"}>{tipShow ? "CTRL K" : "ESC"}</span>
    </div>
  );
};

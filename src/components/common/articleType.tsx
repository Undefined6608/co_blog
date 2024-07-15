import { ArticleTypeList } from "../container/articleTypeList";
import React, { useState } from "react";
import { SizeInterface } from "../../config/propsInterface";
import "../../sass/common/articleType.sass";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

/**
 * 文章类型组件
 * @param param 样式参数
 * @constructor
 */
export const ArticleType: React.FC<SizeInterface> = ({ param }) => {
  // 子组件状态
  const [childState, setChildState] = useState(false);
  // 子组件大小
  const [childSize, setChildSize] = useState<SizeInterface>({
    param: {
      width: "200px",
      height: "100%",
      marginTop: "0",
    },
  });
  // 子组件显示隐藏
  const handlerChild = () => {
    setChildState(!childState);
    if (childState)
      return setChildSize({
        param: { width: "200px", height: "100%", marginTop: "0" },
      });
    setChildSize({ param: { width: "80px", height: "100%", marginTop: "0" } });
  };
  // 渲染组件
  return (
    <div
      className={"articleType"}
      style={{
        width: param.width,
        height: param.height,
        marginTop: param.marginTop,
      }}
    >
      <ArticleTypeList
        param={childSize.param}
        state={childState}
        setState={setChildState}
      />
      {/* 显示隐藏按钮 */}
      <button className={"childShow"} onClick={handlerChild}>
        {childState ? <RightOutlined size={10} /> : <LeftOutlined size={10} />}
      </button>
    </div>
  );
};

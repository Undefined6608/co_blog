import React, { useEffect, useState } from "react";
import { ChangeEvent, MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import "../../sass/common/editComponent.sass";
import { updateArticleImg } from "../../api/article";
import PubSub from "pubsub-js";
import { EditComponentParam } from "../../config/propsInterface";
import useDebounce from "../../utils/debounce";

/**
 * 编辑组件
 * @returns
 */
export const EditComponent: React.FC<EditComponentParam> = ({
  param,
  typeParam,
  contextParam,
  getArticleValue,
}) => {
  // 文章内容
  const [text, setText] = useState("");
  // 预览主题
  const [previewTheme] = useState("vuepress");
  // true为仅显示，false为编写
  const [type, setType] = useState(false);
  // 主题
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    // 设置主题
    setType(typeParam);
    // 订阅主题
    const subToken = PubSub.subscribe("setTheme", (_, val: boolean) => {
      setTheme(val ? "dark" : "light");
    });
    // 如果是显示，则设置文章内容
    if (typeParam) {
      setText(contextParam);
      return;
    }
    // 取消订阅主题
    return () => {
      PubSub.unsubscribe(subToken);
    };
  }, [typeParam, contextParam]);

  /**
   * 图片上传
   * @param files 图片文件
   * @param callback 返回图片地址
   */
  const onUploadImg = async (
    files: Array<File>,
    callback: (urls: string[]) => void,
  ) => {
    const res = await updateArticleImg(files);
    const urls = res.flatMap((item) => item.data.url);
    // res.map((item) => item.data.map((item) => item.url))
    callback(urls);
  };
  /**
   * 防抖设置文章内容
   */
  const debouncedSetArticle = useDebounce((e: string) => {
    // 设置文章内容
    setText(e);
    // 获取文章内容
    if (getArticleValue) {
      getArticleValue(e);
    }
  }, 1000);
  /**
   * 设置文章内容
   * @param e 文章内容
   */
  const setArticle: ChangeEvent = (e) => {
    // 调用防抖函数
    debouncedSetArticle(e);
  };

  return (
    <>
      <MdEditor
        className={type ? "show" : "edit"}
        modelValue={text}
        onChange={setArticle}
        onUploadImg={onUploadImg}
        style={{
          width: param.width,
          height: param.height,
          marginTop: param.marginTop,
        }}
        showCodeRowNumber={true}
        theme={theme}
        readOnly={type}
        previewTheme={previewTheme}
        onSave={() => {
          PubSub.publish("saveShow");
        }}
      />
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { ArticleTypeInterface } from "../../config/responseInterface";
import "../../sass/common/articleTypeList.sass";
import { getArticleType } from "../../api/article";
import { useNavigate } from "react-router-dom";
import PubSub from "pubsub-js";
import Cookies from "js-cookie";
import { ChildProps } from "../../config/propsInterface";
import { MenuItem, getItem } from "../../config/requestInterface";

/**
 * 文章类型列表组件
 */
export const ArticleTypeList: React.FC<ChildProps> = ({ param, state }) => {
  // 菜单项列表
  const [items, setItems] = useState<MenuItem[]>([]);
  // 选中菜单项
  const [selectStatus, setSelectStatus] = useState<string>("");
  // 主题，默认主题为浅色模式
  const [theme, setTheme] = useState<"light" | "dark">("light");
  // 路由导航器
  const history = useNavigate();

  // 处理副作用，在theme变化的时候执行
  useEffect(() => {
    // 主题切换事件
    const themeHandler = PubSub.subscribe("setTheme", (_, val: boolean) => {
      if (val) return setTheme("dark");
      setTheme("light");
    });
    return () => {
      PubSub.unsubscribe(themeHandler);
    };
  }, [theme]);

  // 在页面加载的时候执行
  useEffect(() => {
    // 获取文章类型列表
    getArticleType().then((r) => {
      if (r.code !== 200) return;
      const updatedItems = generateMenuItems(r);
      setItems(updatedItems);
    });
  }, []);

  /**
   * 修改菜单项列表
   * @param data 文章类型数据
   * @param rootId 根类型id
   * @returns 返回修改完成的文章类型列表
   */
  const generateMenuItems = (
    data: ArticleTypeInterface,
    rootId = 0,
  ): MenuItem[] => {
    // return data.data.articleTypeList
    return data.data.articleType
      .filter((item) => item.root_id === rootId)
      .map((item) => {
        const children = generateMenuItems(data, item.id);
        if (children.length > 0)
          return getItem(
            item.type_name,
            item.id,
            <div className={"iconBox"}>
              <img
                className={theme === "dark" ? "icon_select" : ""}
                width={"16px"}
                src={item.picture}
                alt={""}
              />
            </div>,
            children,
          );
        return getItem(
          item.type_name,
          item.id,
          <div className={"iconBox"}>
            <img
              className={theme === "dark" ? "icon_select" : ""}
              width={"16px"}
              src={item.picture}
              alt={""}
            />
          </div>,
        );
      });
  };
  /**
   * 类型点击事件
   * @param ev 点击事件参数
   */
  const selectHandler: (info: {
    key: string;
    keyPath: string[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  }) => void = (ev) => {
    // 将打开的类型存入Cookie，保证刷新不失效
    Cookies.set("openType", ev.key, { expires: 1, path: "/" });
    // 设置选中状态，进行文章列表展示
    setSelectStatus(ev.key);
    // 将显示的类型选项列表隐藏
    PubSub.publish("menuShow", false);
    // 跳转到文章列表页
    history("/articleList", { state: { typeId: 1 * parseInt(ev.key) } });
  };

  /**
   * 渲染组件
   */
  return (
    <div
      className={"articleTypeList"}
      style={{
        width: param.width,
        height: param.height,
        marginTop: param.marginTop,
      }}
    >
      <Menu
        className={"menuList"}
        defaultSelectedKeys={[selectStatus]}
        defaultOpenKeys={[selectStatus]}
        mode="inline"
        theme={theme}
        onClick={selectHandler}
        selectable={true}
        inlineCollapsed={state}
        items={items}
      />
    </div>
  );
};

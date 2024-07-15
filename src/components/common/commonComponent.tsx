import React, { useEffect, useState } from "react";
import PubSub from "pubsub-js";
import { TipComponent } from "./tipComponent";
import HeaderComponent from "../header/headerComponent";
import { MenuComponent } from "../menu/menuComponent";
import { LoginComponent } from "./loginComponent";
import { ArticleType } from "./articleType";

/**
 * 公共组件
 * @returns
 */
export const CommonComponent: React.FC = () => {
  // 菜单显示状态
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 订阅菜单显示状态
    const pubSubToken = PubSub.subscribe("menuShow", (_, val: boolean) =>
      setShow(val),
    );
    return () => {
      PubSub.unsubscribe(pubSubToken);
    };
  }, []);
  return (
    <>
      {/* 提示组件 */}
      <TipComponent />
      {/* 头部组件 */}
      <HeaderComponent
        param={{ width: "100%", height: "72px", marginTop: "0" }}
        menuShow={show}
      />
      {
        // 菜单组件
        show ? (
          <MenuComponent
            param={{
              width: "100%",
              height: "calc(100vh - 72px)",
              marginTop: "0",
            }}
            showParam={show}
          />
        ) : null
      }
      {/* 登录组件 */}
      <LoginComponent />
      {/* 文章类型组件 */}
      <ArticleType
        param={{ width: "auto", height: "calc(100vh - 72px)", marginTop: "0" }}
      />
    </>
  );
};

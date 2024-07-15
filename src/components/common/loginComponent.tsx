import React, { useEffect, useState } from "react";
import "../../sass/common/loginComponent.sass";
import PubSub from "pubsub-js";
import { LoginForm } from "./loginForm";

/**
 * 登录组件
 * @returns
 */
export const LoginComponent: React.FC = () => {
  // 登录状态
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 订阅登录状态
    const subToken = PubSub.subscribe("loginStatus", (_, loginShow) => {
      setShow(loginShow);
    });
    // 取消订阅
    return () => {
      PubSub.unsubscribe(subToken);
    };
  }, []);

  /**
   * 显示登录弹窗
   */
  const handlerShow = () => {
    setShow(!show);
  };

  /**
   * 防止点击弹窗关闭弹窗
   * @param event 事件对象
   */
  const handlerStop: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation(); // 阻止事件冒泡
  };

  return (
    <>
      {show ? (
        <div className={"loginComponent"} onClick={handlerShow}>
          <div className="loginPage" onClick={handlerStop}>
            <div className="loginLogo">Co-Blog</div>
            <LoginForm />
          </div>
        </div>
      ) : null}
    </>
  );
};

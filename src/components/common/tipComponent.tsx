import { notification } from "antd";
import React, { useEffect } from "react";
import PubSub from "pubsub-js";
import {
  MsgType,
  NotificationType,
  TipComponentParam,
} from "../../config/requestInterface";

/**
 * 弹窗组件
 * @returns
 */
export const TipComponent: React.FC = () => {
  // 获取通知实例
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    // 订阅消息
    const subToken = PubSub.subscribe(
      "openTip",
      (_, param: TipComponentParam) => {
        openNotificationWithIcon(param.type, param.msg);
      },
    );
    // 取消订阅
    return () => {
      PubSub.unsubscribe(subToken);
    };
  }, [contextHolder]);

  // 弹出消息
  const openNotificationWithIcon = (type: NotificationType, msg: MsgType) => {
    api[type]({
      message: msg.message,
      description: msg.description,
    });
  };
  return <>{contextHolder}</>;
};

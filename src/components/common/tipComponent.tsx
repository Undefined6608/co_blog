import {notification} from "antd";
import React, {useEffect} from "react";
import PubSub from "pubsub-js";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type MsgType = { message: string, description: string };

type TipComponentParam = {
    type: NotificationType,
    msg: MsgType
}

export const TipComponent: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        const subToken = PubSub.subscribe('openTip', (_, param: TipComponentParam) => {
            openNotificationWithIcon(param.type, param.msg);
        })
        const openNotificationWithIcon = (type: NotificationType, msg: MsgType) => {
            api[type]({
                message: msg.message,
                description: msg.description
            });
        };
        return () =>{
            PubSub.unsubscribe(subToken);
        }
    }, [api,contextHolder])
    return (
        <>
            {contextHolder}
        </>
    )
}
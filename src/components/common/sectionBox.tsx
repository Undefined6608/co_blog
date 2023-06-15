import React, {useState} from "react";
import {MailOutlined, MobileOutlined} from "@ant-design/icons";
import "@/sass/common/sectionBox.sass";
import {Segmented} from "antd";

interface Props {
    onAction: (ev: number) => void;
}

export const SectionBox = (props: Props) => {
    const [value, setValue] = useState<string | number>(0);
    const option = [
        {
            label: '电话号码登录',
            value: 0,
            icon: <MobileOutlined/>,
        },
        {
            label: '邮箱登录',
            value: 1,
            icon: <MailOutlined/>,
        },
    ]

    const handlerSelect = (ev: any) => {
        const temp = ev;
        setValue(temp);
        props.onAction(temp);
    }
    return (
        <div className={"sectionBox"}>
            <Segmented
                block
                value={value}
                onChange={handlerSelect}
                className={"section"}
                options={option}
            />
        </div>
    )
}
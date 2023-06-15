import React, {useState} from "react";
import "@/sass/common/loginForm.sass";
import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, MailOutlined, MobileOutlined} from "@ant-design/icons";
import {formRule} from "../../config/rules";
import {emailLogin, phoneLogin} from "../../config/api";
import PubSub from "pubsub-js";

type LoginFormParam = {
    param: {
        type: number
    }
}
export const LoginForm: React.FC<LoginFormParam> = ({param}) => {
    const [tips, setTips] = useState("");
    const onFinish = (values: any) => {
        if (!values.remember) return setTips("请勾选-同意用户协议")
        if (param.type === 0) {
            phoneLogin({phone: values.phone, password: values.password}).then((r) => {
                if (r.status !== 200) return PubSub.publish('openTip', {
                    type: 'error',
                    msg: {message: "请求失败", description: ""}
                })
                if (r.data.code === 200) return window.location.reload();
                if (r.data.code === 404) return PubSub.publish('openTip', {
                    type: 'warning',
                    msg: {message: "返回值错误：", description: r.data.msg}
                })
            })
        }
        if (param.type === 1) {
            emailLogin({email: values.email, password: values.password}).then((r) => {
                if (r.status !== 200) return PubSub.publish('openTip', {
                    type: 'error',
                    msg: {message: "请求失败", description: ""}
                })
                if (r.data.code === 200) return window.location.reload();
                if (r.data.code === 404) return PubSub.publish('openTip', {
                    type: 'warning',
                    msg: {message: "返回值错误：", description: r.data.msg}
                })
            })
        }
    };
    return (
        <>
            <span className={"tips"}>{tips}</span>
            <div className={"loginForm"}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    {
                        param.type === 0 ?
                            <>
                                <Form.Item name="phone" rules={formRule.phone}>
                                    <Input prefix={<MobileOutlined className="site-form-item-icon"/>}
                                           placeholder="请输入电话号码" autoComplete={"phone"}/>
                                </Form.Item>
                                <Form.Item name="password" rules={formRule.pwd}>
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon"/>}
                                        type="password"
                                        placeholder="请输入密码"
                                        autoComplete={"current-password"}
                                    />
                                </Form.Item>
                            </> :
                            param.type === 1 ?
                                <>
                                    <Form.Item name="email" rules={formRule.email}>
                                        <Input prefix={<MailOutlined className="site-form-item-icon"/>}
                                               placeholder="请输入邮箱地址" autoComplete={"email"}/>
                                    </Form.Item>
                                    <Form.Item name="password" rules={formRule.pwd}>
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon"/>}
                                            type="password"
                                            placeholder="请输入密码"
                                            autoComplete={"current-password"}
                                        />
                                    </Form.Item>
                                </> :
                                null
                    }
                    <Form.Item style={{justifyContent: "space-between"}}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>同意用户协议</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="http://39.101.72.168:82/youQi">
                            忘记密码
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        <br/>
                        <a href="http://39.101.72.168:82/youQi">注册</a>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
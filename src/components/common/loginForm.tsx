import React, {useState} from "react";
import "@/sass/common/loginForm.sass";
import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {formRule, LoginRegExp} from "../../config/rules";
import {emailLogin, phoneLogin} from "../../config/api";
import PubSub from "pubsub-js";
import {loginFail, loginSuccess} from "../../config/request";
import {Link} from "react-router-dom";

export const LoginForm: React.FC = () => {
    const [tips, setTips] = useState("");
    const onFinish = (values: any) => {
        if (!values.remember) return setTips("请勾选-同意用户协议")
        if (LoginRegExp.illegal.test(values.username) || LoginRegExp.illegal.test(values.password)) return setTips("数据中含有非法字符！");
        if (!LoginRegExp.phone.test(values.username) && !LoginRegExp.email.test(values.username)) return setTips("用户名格式错误！");
        if (LoginRegExp.phone.test(values.username)) {
            phoneLogin({
                phone: values.username, password: values.password, remember: 1
            }).then((r) => {
                if (r.code === 200) return loginSuccess();
                if (r.code === 404) return loginFail(r);
            })
        }
        if (LoginRegExp.email.test(values.username)) {
            emailLogin({email: values.username, password: values.password, remember: 1}).then((r) => {
                if (r.code === 200) return loginSuccess();
                if (r.code === 404) return loginFail(r);
            })
        }
    };
    const linkGet = (url: string) => {
        PubSub.publish('history', {path: url});
    }

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
                    <Form.Item name="username" rules={formRule.username}>
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                               placeholder="请输入电话号码/邮箱" autoComplete={"phone"}/>
                    </Form.Item>
                    <Form.Item name="password" rules={formRule.pwd}>
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="请输入密码"
                            autoComplete={"current-password"}
                        />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>同意<Link className={"xy"} to={'/'}>《用户隐私协议》</Link><Link className={"xy"}
                                                                                                 to={'/'}>《用户使用协议》</Link></Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="link" htmlType="button" onClick={() => linkGet('/forget')}>
                            忘记密码
                        </Button>
                        <Button type="link" htmlType="button" onClick={() => linkGet('/register')}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
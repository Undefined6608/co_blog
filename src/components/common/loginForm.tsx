import React, { useState } from "react";
import "../../sass/common/loginForm.sass";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { formRule, LoginRegExp } from "../../config/rules";
import { emailLogin, phoneLogin } from "../../api/user";
import PubSub from "pubsub-js";
import { loginFail, loginSuccess } from "../../utils/request";
import { Link, useNavigate } from "react-router-dom";
import { md5 } from "js-md5";
import { FormValues } from "../../config/requestInterface";

/**
 * 登录表单组件
 * @returns 登录表单
 */
export const LoginForm: React.FC = () => {
  // 登录提示
  const [tips, setTips] = useState("");
  // 跳转路由
  const history = useNavigate();

  /**
   * 登录表单提交
   * @param values 表单数据
   * @returns
   */
  const onFinish: (values: FormValues) => void = (values) => {
    // 验证数据
    if (!values.remember) return setTips("请勾选-同意用户协议");
    // 验证用户名格式
    if (
      LoginRegExp.illegal.test(values.username) ||
      LoginRegExp.illegal.test(values.password)
    )
      return setTips("数据中含有非法字符！");
    // 验证电话号码格式
    if (
      !LoginRegExp.phone.test(values.username) &&
      !LoginRegExp.email.test(values.username)
    )
      return setTips("用户名格式错误！");
    // 电话号码登录
    if (LoginRegExp.phone.test(values.username)) {
      phoneLogin({
        phone: values.username,
        password: md5(values.password),
        remember: 1,
      }).then((r) => {
        // console.log(r);
        if (r?.code !== 200) return loginFail(new Error(r?.msg));
        loginSuccess(r.data.token);
      });
    }
    // 邮箱登录
    if (LoginRegExp.email.test(values.username)) {
      emailLogin({
        email: values.username,
        password: values.password,
        remember: 1,
      }).then((r) => {
        if (r?.code !== 200) return loginFail(new Error(r?.msg));
        loginSuccess(r.data.token);
      });
    }
  };

  return (
    <>
      <span className={"tips"}>{tips}</span>
      <div className={"loginForm"}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={formRule.username}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入电话号码/邮箱"
              autoComplete={"phone"}
            />
          </Form.Item>
          <Form.Item name="password" rules={formRule.pwd}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
              autoComplete={"current-password"}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>
              同意
              <Link className={"xy"} to={"/"}>
                《用户隐私协议》
              </Link>
              <Link className={"xy"} to={"/"}>
                《用户使用协议》
              </Link>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="link"
              htmlType="button"
              onClick={() => {
                PubSub.publish("loginStatus", false);
                history("/forget", {});
              }}
            >
              忘记密码
            </Button>
            <Button
              type="link"
              htmlType="button"
              onClick={() => {
                PubSub.publish("loginStatus", false);
                history("/register", {});
              }}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

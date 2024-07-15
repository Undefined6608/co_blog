import React, { useState } from "react";
import "../../sass/container/registerForm.sass";
import {
	Button,
	Form,
	Input,
	Select
} from "antd";
import { RuleObject } from "rc-field-form/lib/interface";
import { formRule, LoginRegExp } from "../../config/rules";
import { useNavigate } from "react-router-dom";
import { emailOccupy, getEmailCode, phoneOccupy, register, userNameOccupy } from "../../api/user";
import { requestError } from "../../api/api";
import PubSub from "pubsub-js";
import { md5 } from "js-md5";
import { formData } from "../../config/requestInterface";
import { countriesNumber } from "../../utils/staticData";

// 选项类型
export const { Option } = Select;

/**
 * 注册表单组件
 * @returns 
 */
export const RegisterForm: React.FC = () => {
	// 表单实例
	const [form] = Form.useForm();
	// 路由
	const history = useNavigate();
	// 邮箱
	const [email, setEmail] = useState("");
	// 邮箱验证码
	const [verShow, setVerShow] = useState("获取验证码");
	// 验证码是否禁用
	const [verDisable, setVerDisable] = useState(false);
	// 设置基础计时
	let time = 60;

	/**
	 * 获取验证码方法
	 * @returns 
	 */
	const verHandler = () => {
		// 邮箱验证
		if (email === "" || email === null || !LoginRegExp.email.test(email)) return requestError(Error("邮箱格式错误！"));
		// 发送邮箱验证码
		getEmailCode({ email: email }).then(r => {
			if (r.code !== 200) return PubSub.publish("openTip", {
				type: "warning",
				msg: { message: "获取失败！", description: "" }
			});
			PubSub.publish("openTip", {
				type: "success",
				msg: { message: "获取成功！", description: "" }
			});
		});
		// 计时器
		time = 60;
		// 禁用验证码按钮
		setVerDisable(true);
		// 防抖计时器
		const verCountDown = setInterval(() => {
			setVerShow(time + "");
			console.log(time);

			if (time === 0) {
				setVerShow("重新获取验证码");
				setVerDisable(false);
				clearInterval(verCountDown);
				return;
			}
			time--;
		}, 1000);
	};

	/**
	 * 注册方法
	 * @param values 
	 */
	const onFinish: (values: formData) => void = (values) => {
		// 注册
		register({
			username: values.username,
			password: md5(values.password),
			verPassword: md5(values.confirm),
			phone: values.phone,
			email: values.email,
			emailCode: values.verify
		}).then((r) => {
			// console.log(r)
			if (r.code === 400) return PubSub.publish("openTip", {
				type: "warning",
				msg: { message: "注册失败！", description: r.msg }
			});
			if (r.code === 200) {
				PubSub.publish("openTip", {
					type: "success",
					msg: { message: "注册成功！", description: "" }
				});
				setTimeout(() => {
					history("/");
					PubSub.publish("loginStatus", true);
				}, 500);
				return;
			}
		});
	};

	/**
	 * 验证用户名
	 * @param _ 规则
	 * @param value 用户名
	 * @returns 
	 */
	const validatorUserName = (_: RuleObject, value: string) => {
		if (value === null || value === "" || value === undefined) return;
		return new Promise<void>((resolve, reject) => {
			setTimeout(() => {
				userNameOccupy({ username: value }).then((r) => {
					// console.log(r);
					if (r.code === 400) return reject(r.msg);
					resolve();
				});
			}, 1000);
		});
	};

	/**
	 * 验证电话号码
	 * @param _ 规则
	 * @param value 电话号码
	 * @returns 
	 */
	const validatorPhone = (_: RuleObject, value: string) => {
		if (value === null || value === "" || value === undefined) return;
		return new Promise<void>((resolve, reject) => {
			setTimeout(() => {
				phoneOccupy({ phone: value }).then((r) => {
					// console.log(r);
					if (r.code === 400) return reject(new Error(r.msg));
					resolve();
				});
			}, 1000);
		});
	};

	/**
	 * 验证邮箱
	 * @param _ 规则
	 * @param value 邮箱
	 * @returns 
	 */
	const validatorEmail = (_: RuleObject, value: string) => {
		if (value === null || value === "" || value === undefined) return;
		return new Promise<void>((resolve, reject) => {
			setTimeout(() => {
				emailOccupy({ email: value }).then((r) => {
					// console.log(r);
					if (r.code === 400) return reject(new Error(r.msg));
					resolve();
				});
			}, 1000);
		});
	};
	/**
	 * 插槽组件
	 */
	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select style={{ width: 100 }}>
				{
					countriesNumber.map((item) => {
						return <Option key={item.value} value={item.value}>{item.label}</Option>;
					})
				}
			</Select>
		</Form.Item>
	);
	return (
		<>
			<Form
				form={form}
				name="register"
				onFinish={onFinish}
				className={"registerForm"}
				scrollToFirstError
				initialValues={{ prefix: "86" }}
				validateTrigger={"onChange"}
			>
				<Form.Item
					name="username"
					label="用户名："
					rules={[
						{ required: true, message: "用户名不能为空！" },
						{
							validator: validatorUserName
						}
					]}
				>
					<Input autoComplete={"username"} />
				</Form.Item>
				<Form.Item
					name="phone"
					label="电话号码："
					rules={[{ required: true, message: "电话号码不能为空！" }, {
						pattern: LoginRegExp.phone,
						whitespace: false,
						message: "电话号码格式错误",
					}, {
						validator: validatorPhone
					}]}
				>
					<Input addonBefore={prefixSelector} autoComplete={"phone"} style={{ width: "100%" }} />
				</Form.Item>

				<Form.Item
					name="email"
					label="邮箱："
					rules={[{ required: true, message: "邮箱不能为空！" }, {
						pattern: LoginRegExp.email,
						whitespace: false,
						message: "邮箱格式错误"
					}, {
						validator: validatorEmail
					}]}
				>
					<Input autoComplete={"email"} onChange={event => setEmail(event.target.value)} />
				</Form.Item>

				<Form.Item
					name="verify"
					label="验证码："
					tooltip="邮箱验证码?"
					rules={[
						{
							required: true,
							message: "验证码不能为空!",
						},
						{
							len: 6,
							message: "验证码格式错误！"
						}
					]}
				>
					<div className="verify">
						<Input autoComplete="verify" />
						<Button className="verBtn" type="primary" onClick={verHandler} disabled={verDisable}>{verShow}</Button>
					</div>
				</Form.Item>

				<Form.Item
					name="password"
					label="密码："
					rules={formRule.pwd}
					hasFeedback
				>
					<Input.Password autoComplete={"new-password"} />
				</Form.Item>

				<Form.Item
					name="confirm"
					label="验证密码："
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "验证密码不能为空!",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("两次密码不一致!"));
							},
						}),
					]}
				>
					<Input.Password autoComplete={"new-password"} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						注册
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};
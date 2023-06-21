import React from "react";
import "../../sass/container/registerForm.sass";
import {
    Button,
    Form,
    Input,
    Select
} from "antd";
import {formRule, LoginRegExp} from "../../config/rules";
import {emailOccupy, phoneOccupy, register, userNameOccupy} from "../../config/api";
import PubSub from "pubsub-js";

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 40},
    },
};

export const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        register({
            username: values.username,
            password: values.password,
            phone: values.phone,
            email: values.email
        }).then((r) => {
            console.log(r)
            if (r.code === 404) return PubSub.publish('openTip', {
                type: 'warning',
                msg: {message: "注册失败！", description: r.msg}
            })
            if (r.code === 200) {
                PubSub.publish('openTip', {
                    type: 'success',
                    msg: {message: "注册成功！", description: ""}
                })
                setTimeout(()=>{
                    PubSub.publish('loginStatus', true);
                },500);
                return;
            }
        });
    };

    const validatorUserName = (_: any, value: string) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                userNameOccupy({username: value}).then((r) => {
                    console.log(r)
                    if (r.code === 404) return reject(r.msg);
                    resolve();
                })
            }, 1000);
        })
    };

    const validatorPhone = async (_: any, value: string) => {
        return await new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                phoneOccupy({phone: value}).then((r) => {
                    console.log(r);
                    if (r.code === 404) return reject(new Error(r.msg));
                    resolve();
                })
            }, 1000);
        })
    };

    const validatorEmail = async (_: any, value: string) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                emailOccupy({email: value}).then((r) => {
                    console.log(r);
                    if (r.code === 404) return reject(new Error(r.msg));
                    resolve();
                })
            }, 1000);
        })
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    return (
        <>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                className={"registerForm"}
                scrollToFirstError
                initialValues={{prefix: "86"}}
                validateTrigger={"onBlur"}
            >
                <Form.Item
                    name="username"
                    label="用户名："
                    tooltip="你希望别人怎么称呼你?"
                    rules={[{required: true, message: '用户名不能为空！'},
                        {
                            validator: validatorUserName
                        }
                    ]}
                >
                    <Input autoComplete={"username"}/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="电话号码："
                    rules={[{required: true, message: '电话号码不能为空！'}, {
                        pattern: LoginRegExp.phone,
                        whitespace: false,
                        message: "电话号码格式错误",
                    }, {
                        validator: validatorPhone
                    }]}
                >
                    <Input addonBefore={prefixSelector} autoComplete={"phone"} style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱："
                    rules={[{required: true, message: '邮箱不能为空！'}, {
                        pattern: LoginRegExp.email,
                        whitespace: false,
                        message: "邮箱格式错误"
                    }, {
                        validator: validatorEmail
                    }]}
                >
                    <Input autoComplete={"email"}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码："
                    rules={formRule.pwd}
                    hasFeedback
                >
                    <Input.Password autoComplete={"new-password"}/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="验证密码："
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '验证密码不能为空!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码不一致!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password autoComplete={"new-password"}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
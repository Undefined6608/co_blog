import { MenuProps } from "antd";

// 注册接口类型
export type RegisterType = {
  username: string;
  password: string;
  verPassword: string;
  phone: string;
  email: string;
  emailCode: number;
};

/**
 * 电话号码登录参数类型
 * @param {PhoneLoginType} 用户信息
 * @returns
 */
export type PhoneLoginType = {
  phone: string;
  password: string;
  remember: number;
};

// 评论类型声明
export type commitType = {
  id: number;
  // 用户名
  title: string;
  // 会员
  member: number;
  // 积分
  integral: number;
  // 用户头像
  userAvatar: string;
  // 评论数据
  context: string;
};

/**
 * 登录表单类型
 * @property {string} username 用户名
 * @property {string} password 密码
 * @property {boolean} remember 同意
 */
export type FormValues = {
  username: string;
  password: string;
  remember: boolean;
};

// 通知类型
export type NotificationType = "success" | "info" | "warning" | "error";
// 消息类型
export type MsgType = { message: string; description: string };

/**
 * 提示框组件参数类型
 * @property {NotificationType} type 提示类型
 * @property {MsgType} msg 提示信息
 */
export type TipComponentParam = {
  type: NotificationType;
  msg: MsgType;
};

/**
 * 声明菜单项类型
 */
export type MenuItem = Required<MenuProps>["items"][number];

/**
 * 声明文章类型对象类型
 * @param label 显示的文章类型文本
 * @param key 文章类型id
 * @param icon 文章类型图标
 * @param children 文章类型子类型
 * @param type 文章类型排列样式
 * @returns 返回文章类型对象
 */
export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

/**
 * 表单数据类型
 * @property {string} username 用户名
 * @property {string} password 密码
 * @property {string} confirm 确认密码
 * @property {number} verify 验证码
 * @property {string} phone 手机号
 * @property {string} email 邮箱
 */
export type formData = {
  username: string;
  password: string;
  confirm: string;
  verify: number;
  phone: string;
  email: string;
};

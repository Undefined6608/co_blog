import {UserSettingInterface} from "../config/responseInterface";

export const userSettingList: UserSettingInterface[] = [
	{
		id: "a",
		icon: "/static/images/bianxie.png",
		name: "编写文档",
		href: "/editArticle"
	}, {
		id: "b",
		icon: "/static/images/shezhi.png",
		name: "用户设置",
		href: "/userSetting"
	}, {
		id: "c",
		icon: "/static/images/fankui.png",
		name: "用户反馈",
		href: "/feedBack"
	}
];

type countriesNumberType = {
	name: string,
	value: number,
	label: string
};

export const countriesNumber: Array<countriesNumberType> = [
	{
		name: "美国",
		value: 1,
		label: "+1 美国"
	},
	{
		name: "中国",
		value: 86,
		label: "+86 中国"
	}
];
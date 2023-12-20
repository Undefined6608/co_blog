import React, { useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import { ArticleTypeInterface, SizeInterface } from "../../config/publicInterface";
import "../../sass/common/articleTypeList.sass";
import { getArticleType } from "../../api/article";
import { useNavigate } from "react-router-dom";
import PubSub from "pubsub-js";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
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

interface ChildProps extends SizeInterface {
	state: boolean;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ArticleTypeList: React.FC<ChildProps> = ({ param, state }) => {
	const [items, setItems] = useState<MenuItem[]>([]);
	const [selectStatus, setSelectStatus] = useState<string>("");
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const history = useNavigate();
	useEffect(() => {
		const generateMenuItems = (data: ArticleTypeInterface, rootId = 0): MenuItem[] => {
			// return data.data.articleTypeList
			return data.data.articleType
				.filter((item) => item.root_id === rootId)
				.map((item) => {
					const children = generateMenuItems(data, item.id);
					if (children.length > 0) return getItem(item.type_name, item.id, <div className={"iconBox"}><img
						className={theme === "dark" ? "icon_select" : ""}
						width={"16px"}
						src={item.picture}
						alt={""} /></div>, children);
					return getItem(item.type_name, item.id, <div className={"iconBox"}><img
						className={theme === "dark" ? "icon_select" : ""}
						width={"16px"}
						src={item.picture}
						alt={""} /></div>);
				});
		};

		const themeHandler = PubSub.subscribe("setTheme", (_, val: boolean) => {
			if (val) return setTheme("dark");
			setTheme("light");
		});

		getArticleType().then((r) => {
			if (r.code !== 200) return;
			const updatedItems = generateMenuItems(r);
			setItems(updatedItems);
		});
		return () => {
			PubSub.unsubscribe(themeHandler);
		};
	}, [theme]);
	const selectHandler: (info: {
		key: string;
		keyPath: string[];
		item: React.ReactInstance;
		domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
	}) => void = (ev) => {
		// console.log(ev)
		setSelectStatus(ev.key);
		PubSub.publish("menuShow", false);
		history("/articleList", { state: { typeId: 1 * parseInt(ev.key) } });
	};
	return (
		<div className={"articleTypeList"} style={{ width: param.width, height: param.height, marginTop: param.marginTop }}>
			<Menu
				className={"menuList"}
				defaultSelectedKeys={[selectStatus]}
				defaultOpenKeys={[selectStatus]}
				mode="inline"
				theme={theme}
				onClick={selectHandler}
				selectable={true}
				inlineCollapsed={state}
				items={items}
			/>
		</div>
	);
};

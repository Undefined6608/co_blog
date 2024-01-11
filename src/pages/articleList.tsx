import React, { useEffect, useState } from "react";
import "../sass/pages/commonPages.sass";
import "../sass/pages/articleList.sass";
import { ArticleListInterface } from "../config/responseInterface";
import { getArticleList } from "../api/article";
import { useLocation } from "react-router-dom";
import { ArticleItem } from "../components/container/articleItem";
import { Divider, Empty, Spin } from "antd";
import { AnimatePresence } from "framer-motion";

/**
 * 文章列表页面
 * @returns 
 */
export const ArticleList: React.FC = () => {
	// 文章列表
	const [articleList, setArticleList] = useState<ArticleListInterface>();
	// 加载状态
	const [loading, setLoading] = useState(true);
	// 类型id
	const { state } = useLocation();
	// console.log(state.typeId);

	useEffect(() => {
		// 设置加载状态
		setLoading(true);
		// 获取文章列表
		getArticleList(state.typeId).then((r) => {
			// console.log(r);
			if (r.code !== 200) return setArticleList(undefined);
			setArticleList(r);
		}).finally(() => {
			// 设置加载状态
			setLoading(false);
		});
	}, [state.typeId]);


	return (
		<div className={"commonPages articleList"}>
			{
				!loading ?
					// articleList?.data.articleList.length ?
					articleList?.data.rows.length ?
						<ul style={{ width: "100%", padding: 0 }}>
							<AnimatePresence mode={"sync"}>
								{
									// articleList.data.articleList.map((item) => (
									articleList.data.rows.map((item) => (
										<ArticleItem key={item.id}
											param={{ width: "100%", height: "80px", marginTop: "10px" }}
											data={item} />
									))
								}
							</AnimatePresence>
							<Divider>暂无更多</Divider>
						</ul> :
						<Empty description={"暂无数据"} className={"custom-empty"} /> :
					<Spin spinning={loading} size={"large"}>正在玩命加载中···</Spin>
			}

		</div>
	);
};

import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { SizeInterface } from "../../config/publicInterface";
import "../../sass/common/commitComponent.sass";
import TextArea from "antd/es/input/TextArea";
import { Avatar, Button, Card, Empty, List, Space, Tag } from "antd";
import { addCommits, getCommits } from "../../api/article";
import { getUserInfo } from "../../api/user";
import PubSub from "pubsub-js";

interface CommitComponentParam extends SizeInterface {
	articleId: number
}

type commitType = {
	id: number,
	// 用户名
	title: string,
	// 会员
	member: number,
	// 积分
	integral: number
	// 用户头像
	userAvatar: string,
	// 评论数据
	context: string
}

const CommitComponent: React.ForwardRefRenderFunction<HTMLDivElement, CommitComponentParam> = (props, ref) => {
	const { param, articleId } = props;
	const [commitStatus, setArticleStatus] = useState(false);
	const [commits, setCommits] = useState<Array<commitType>>();
	const [submitLock, setSubmitLock] = useState(true);
	const [commitVal, setCommitVal] = useState("");
	const [loginState, setLoginState] = useState(false);
	const getInfo = useCallback(() => {
		getCommits(articleId).then((r) => {
			if (r.code !== 200) return setArticleStatus(false);
			// console.log(r);
			// const tempList: Array<commitType> = r.data.map((item) => {
			const tempList: Array<commitType> = r.data.rows.map((item) => {
				return {
					id: item.id,
					title: item.user_name,
					integral: item.integral,
					userAvatar: item.head_sculpture,
					member: item.member,
					context: item.context
				};
			});
			setCommits(tempList);
			setArticleStatus(true);
		});
	}, [articleId]);
	useEffect(() => {
		getUserInfo().then((r) => {
			if (r.code !== 200) return setLoginState(false);
			if (r.code === 200) return setLoginState(true);
		});
		const commitLoginToken = PubSub.subscribe("commitLoginStatus", (_, val: boolean) => {
			setLoginState(val);
		});
		getInfo();

		return () => {
			PubSub.unsubscribe(commitLoginToken);
		};
	}, [articleId, getInfo]);

	const updateCommit = () => {
		if (!submitLock) return PubSub.publish("openTip", {
			type: "warning",
			msg: { message: "评论失败！", description: "评论过于频繁，请稍后重试" }
		});
		if (!commitVal) return;
		setSubmitLock(false);
		const timer = setTimeout(() => {
			setSubmitLock(true);
			clearTimeout(timer);
		}, 10000);
		addCommits({ articleId: articleId, context: commitVal }).then((r) => {
			if (r.code !== 200) return PubSub.publish("openTip", {
				type: "warning",
				msg: { message: "评论失败！", description: r.msg }
			});
			PubSub.publish("openTip", {
				type: "success",
				msg: { message: "评论成功！", description: "" }
			});
			getInfo();
		});
	};

	const goLogin = () => {
		PubSub.publish("loginStatus", true);
	};

	return (
		<div className={"commitComponent"} ref={ref} style={{ minHeight: param.height, width: param.width, marginTop: param.marginTop }}>
			<Card title="评论区" className={"inputCommitBox"} bordered={false} bodyStyle={{ width: "100%", textAlign: "center" }}>
				<TextArea rows={4} maxLength={255} className={"inputCommit"} onChange={e => {
					setCommitVal(e.currentTarget.value);
				}} />
				<Button className={"commit_btn"} style={{ width: "50%" }} onClick={updateCommit}>提交</Button>
			</Card>
			{
				!loginState ?
					<div className={"occlusion"}>
						<span className={"please"}>请先登录</span>
						<Button className={"pleaseLogin"} onClick={goLogin}>登录</Button>
					</div> :
					null
			}
			<Card title="评论列表" className={"commitsList"} bordered={false} bodyStyle={{ width: "100%" }}>
				{
					commitStatus ?
						<List
							itemLayout="horizontal"
							dataSource={commits}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										key={"commits" + item.id}
										avatar={<Avatar src={item.userAvatar} />}
										title={<div><span>{item.title}</span>
											<Space size={[0, 10]} wrap>
												<Tag style={{ height: "20px", scale: "0.7" }} color={item.member === 0 ? "gold" : item.member === 1 ? "red" : "blue"}>{item.member === 0 ? "SVIP" : item.member === 1 ? "VIP" : "普通用户"}</Tag>
												<Tag style={{ height: "20px", scale: "0.7" }} color={item.integral >= 10000 ? "purple" : item.integral >= 1000 ? "magenta" : "cyan"}>{item.integral >= 10000 ? "大牛" : item.integral === 1000 ? "资深" : "初入门庭"}</Tag>
											</Space>
										</div>}
										description={item.context}
									/>
								</List.Item>
							)}
						/> :
						<Empty description={"暂无评论"} />
				}
			</Card>
		</div>
	);
};

export default forwardRef(CommitComponent);

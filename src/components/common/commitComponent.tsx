import React, { forwardRef, useCallback, useEffect, useState } from "react";
import "../../sass/common/commitComponent.sass";
import TextArea from "antd/es/input/TextArea";
import { Avatar, Button, Card, Empty, List, Space, Tag } from "antd";
import { addCommits, getCommits } from "../../api/article";
import { getUserInfo } from "../../api/user";
import PubSub from "pubsub-js";
import { CommitComponentParam } from "../../config/propsInterface";
import { commitType } from "../../config/requestInterface";

/**
 * 评论组件
 * @param props 评论组件参数
 * @param ref DOM参数
 * @returns
 */
const CommitComponent: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CommitComponentParam
> = (props, ref) => {
  // 获取评论组件参数
  const { param, articleId } = props;
  // 评论组件状态
  const [commitStatus, setArticleStatus] = useState(false);
  // 评论列表
  const [commits, setCommits] = useState<Array<commitType>>();
  // 提交评论锁
  const [submitLock, setSubmitLock] = useState(true);
  // 评论内容
  const [commitVal, setCommitVal] = useState("");
  // 登录状态
  const [loginState, setLoginState] = useState(false);

  // 获取评论列表信息,在articleId变化时执行
  const getInfo = useCallback(() => {
    // 获取评论列表信息
    getCommits(articleId).then((r) => {
      if (r.code !== 200) return setArticleStatus(false);
      // console.log(r);
      // const tempList: Array<commitType> = r.data.map((item) => {
      // 将获取的值转化为需要的数组
      const tempList: Array<commitType> = r.data.rows.map((item) => {
        return {
          id: item.id,
          title: item.user_name,
          integral: item.integral,
          userAvatar: item.head_sculpture,
          member: item.member,
          context: item.context,
        };
      });
      // 设置评论列表
      setCommits(tempList);
      // 设置评论组件状态
      setArticleStatus(true);
    });
  }, [articleId]);

  useEffect(() => {
    // 获取用户信息
    getUserInfo().then((r) => {
      if (r.code !== 200) return setLoginState(false);
      if (r.code === 200) return setLoginState(true);
    });
    // 监听登录状态
    const commitLoginToken = PubSub.subscribe(
      "commitLoginStatus",
      (_, val: boolean) => {
        setLoginState(val);
      },
    );
    // 监听文章Id变化
    getInfo();

    // 处理副作用
    return () => {
      PubSub.unsubscribe(commitLoginToken);
    };
  }, [articleId, getInfo]);

  /**
   * 提交评论
   * @returns
   */
  const updateCommit = () => {
    // 判断提交锁是否开启
    if (!submitLock)
      return PubSub.publish("openTip", {
        type: "warning",
        msg: { message: "评论失败！", description: "评论过于频繁，请稍后重试" },
      });
    // 判断评论内容是否为空
    if (!commitVal) return;
    // 设置提交锁锁定
    setSubmitLock(false);
    // 设置提交锁解锁
    const timer = setTimeout(() => {
      setSubmitLock(true);
      clearTimeout(timer);
    }, 10000);
    // 提交评论
    addCommits({ articleId: articleId, context: commitVal }).then((r) => {
      if (r.code !== 200)
        return PubSub.publish("openTip", {
          type: "warning",
          msg: { message: "评论失败！", description: r.msg },
        });
      PubSub.publish("openTip", {
        type: "success",
        msg: { message: "评论成功！", description: "" },
      });
      // 刷新评论列表
      getInfo();
    });
  };

  // 登录
  const goLogin = () => {
    PubSub.publish("loginStatus", true);
  };

  return (
    <div
      className={"commitComponent"}
      ref={ref}
      style={{
        minHeight: param.height,
        width: param.width,
        marginTop: param.marginTop,
      }}
    >
      <Card
        title="评论区"
        className={"inputCommitBox"}
        bordered={false}
        bodyStyle={{ width: "100%", textAlign: "center" }}
      >
        <TextArea
          rows={4}
          maxLength={255}
          className={"inputCommit"}
          onChange={(e) => {
            setCommitVal(e.currentTarget.value);
          }}
        />
        <Button
          className={"commit_btn"}
          style={{ width: "50%" }}
          onClick={updateCommit}
        >
          提交
        </Button>
      </Card>
      {!loginState ? (
        <div className={"occlusion"}>
          <span className={"please"}>请先登录</span>
          <Button className={"pleaseLogin"} onClick={goLogin}>
            登录
          </Button>
        </div>
      ) : null}
      <Card
        title="评论列表"
        className={"commitsList"}
        bordered={false}
        bodyStyle={{ width: "100%" }}
      >
        {commitStatus ? (
          <List
            itemLayout="horizontal"
            dataSource={commits}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  key={"commits" + item.id}
                  avatar={<Avatar src={item.userAvatar} />}
                  title={
                    <div>
                      <span>{item.title}</span>
                      <Space size={[0, 10]} wrap>
                        <Tag
                          style={{ height: "20px", scale: "0.7" }}
                          color={
                            item.member === 0
                              ? "gold"
                              : item.member === 1
                                ? "red"
                                : "blue"
                          }
                        >
                          {item.member === 0
                            ? "SVIP"
                            : item.member === 1
                              ? "VIP"
                              : "普通用户"}
                        </Tag>
                        <Tag
                          style={{ height: "20px", scale: "0.7" }}
                          color={
                            item.integral >= 10000
                              ? "purple"
                              : item.integral >= 1000
                                ? "magenta"
                                : "cyan"
                          }
                        >
                          {item.integral >= 10000
                            ? "大牛"
                            : item.integral === 1000
                              ? "资深"
                              : "初入门庭"}
                        </Tag>
                      </Space>
                    </div>
                  }
                  description={item.context}
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty description={"暂无评论"} />
        )}
      </Card>
    </div>
  );
};

export default forwardRef(CommitComponent);

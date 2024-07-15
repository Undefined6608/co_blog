import React from "react";
import { ArticleItemParam } from "../../config/propsInterface";
import "../../sass/container/articleItem.sass";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Space, Tag } from "antd";
import { addRead } from "../../api/article";

/**
 * 文章列表项组件
 * @param param 文章参数
 * @returns
 */
export const ArticleItem: React.FC<ArticleItemParam> = ({ param, data }) => {
  // 路由导航
  const history = useNavigate();

  /**
   * 点击文章跳转到文章详情页
   */
  const handlerArticle = () => {
    // 增加阅读数
    addRead(data.id);
    // 跳转到文章详情页
    history("/article", { state: { articleId: data.id } });
  };
  return (
    <motion.li
      className={"articleItem"}
      style={{
        width: param.width,
        height: param.height,
        marginTop: param.marginTop,
      }}
      layout
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: -50 }}
      transition={{ type: "spring" }}
      key={data.id}
      onClick={handlerArticle}
    >
      <div className={"articleItemIconBox"}>
        <img className={"articleItemIcon"} src={data.icon} alt="" />
      </div>
      <div className={"articleItemMsg"}>
        <span className={"title"}>{data.title}</span>
        <span className={"context"}>{data.context}</span>
        <div className={"author"}>
          <span className={"nickname"}>
            <img className={"avatar"} src={data.head_sculpture} alt="" />
            <span className={"username"}>{data.user_name}</span>
            <Space size={[0, 10]} wrap>
              <Tag
                style={{ height: "20px", scale: "0.7" }}
                color={
                  data.member === 0
                    ? "gold"
                    : data.member === 1
                      ? "red"
                      : "blue"
                }
              >
                {data.member === 0
                  ? "SVIP"
                  : data.member === 1
                    ? "VIP"
                    : "普通用户"}
              </Tag>
              <Tag
                style={{ height: "20px", scale: "0.7" }}
                color={
                  data.integral >= 10000
                    ? "purple"
                    : data.integral >= 1000
                      ? "magenta"
                      : "cyan"
                }
              >
                {data.integral >= 10000
                  ? "大牛"
                  : data.integral === 1000
                    ? "资深"
                    : "初入门庭"}
              </Tag>
            </Space>
          </span>
          <span className={"read"}>浏览量：{data.read}</span>
        </div>
      </div>
      <div className={"date"}>
        {data.date.replace(/T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/, "")}
      </div>
    </motion.li>
  );
};

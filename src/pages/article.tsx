import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {getArticleMsg} from "../config/api";
import {ArticleMsgInterface} from "../config/publicInterface";
import {Empty, FloatButton, Spin} from "antd";
import {ArticleBox} from "../components/container/articleBox";
import "../sass/pages/commonPages.sass";
import "../sass/pages/article.sass";
import {CommentOutlined} from "@ant-design/icons";
import CommitComponent from "../components/common/commitComponent";

export const Article: React.FC = () => {
    const [articleMsg, setArticleMsg] = useState<ArticleMsgInterface>();
    const [loading, setLoading] = useState(false);
    const {state} = useLocation();
    const commentRef = useRef<HTMLDivElement>(null);
    const goComment = () => {
        if (!commentRef.current) return;
        commentRef.current.scrollIntoView({behavior: 'smooth'});
    }
    useEffect(() => {
        getArticleMsg(state.articleId).then((r) => {
            if (r.code !== 200) return setArticleMsg(undefined);
            setLoading(true);
            setArticleMsg(r);
        }).finally(() => {
            setLoading(false);
        })
    }, [state.articleId])
    return (
        <div className={"commonPages article"}>
            {
                !loading ?
                    articleMsg ?
                        <>
                            <ArticleBox param={{width: "100%", height: "100%", marginTop: "30px"}}
                                        context={articleMsg.data.context}/>
                            <CommitComponent ref={commentRef}
                                             param={{width: '100%', height: '300px', marginTop: '20px'}}
                                             articleId={state.articleId}/>
                            <FloatButton.Group shape="circle" style={{right: 24}}>
                                <FloatButton icon={<CommentOutlined/>} onClick={goComment} tooltip={"查看评论"}/>
                                <FloatButton.BackTop visibilityHeight={30} tooltip={"返回顶端"}/>
                            </FloatButton.Group>
                        </> :
                        <Empty description={"暂无数据"}/>
                    :
                    <Spin spinning={loading} size={"large"} children={"正在玩命加载中···"}/>
            }
        </div>
    )
}

import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getArticleMsg} from "../config/api";
import {ArticleMsgInterface} from "../config/publicInterface";
import {Empty, Spin} from "antd";
import {ArticleBox} from "../components/container/articleBox";
import "../sass/pages/commonPages.sass";
import "../sass/pages/article.sass";

export const Article: React.FC = () => {
    const [articleMsg, setArticleMsg] = useState<ArticleMsgInterface>();
    const [loading, setLoading] = useState(true);
    const {state} = useLocation();
    useEffect(() => {
        setLoading(true);
        getArticleMsg(state.articleId).then((r) => {
            if (r.code !== 200) return setArticleMsg(undefined);
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
                        <ArticleBox param={{width: "100%", height: "100%", marginTop: "30px"}}
                                    context={articleMsg.data.context}/> :
                        <Empty description={"暂无数据"}/> :
                    <Spin spinning={loading} size={"large"} children={"正在玩命加载中···"}/>
            }
        </div>
    )
}
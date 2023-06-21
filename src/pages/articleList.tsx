import React, {useEffect, useState} from "react";
import "../sass/pages/commonPages.sass";
import "../sass/pages/articleList.sass";
import {ArticleListInterface} from "../config/publicInterface";
import {getArticleList} from "../config/api";
import {useLocation} from "react-router-dom";
import {ArticleItem} from "../components/container/articleItem";
import {NotFront} from "../components/container/notFront";

export const ArticleList: React.FC = () => {
    const [articleList, setArticleList] = useState<ArticleListInterface>();
    const typeId = useLocation().state;
    useEffect(() => {
        getArticleList(typeId.typeId).then((r) => {
            if (r.code !== 200) return;
            setArticleList(r);
        })
    }, [typeId])
    return (
        <div className={"commonPages articleList"}>
            {
                articleList ?
                    articleList.data.articleList.map((item) => (
                        <ArticleItem param={{width: "100%", height: "40px", marginTop: "10px"}} data={item}/>
                    )) :
                    <NotFront param={{width:"100%",height:"100%",marginTop:"0"}} fontSize={"16px"} />
            }
        </div>
    )
}
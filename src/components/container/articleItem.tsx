import React from "react";
import {ArticleItemInterface, SizeInterface} from "../../config/publicInterface";
import "../../sass/container/articleItem.sass";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion"
import {addRead} from "../../config/api";

interface ArticleItemParam extends SizeInterface {
    data: ArticleItemInterface
}

export const ArticleItem: React.FC<ArticleItemParam> = ({param, data}) => {
    const history = useNavigate();
    const handlerArticle = () => {
        addRead(data.id).then((r) => {
        })
        history('/article', {state: {articleId: data.id}});
    }
    return (
        <motion.li className={"articleItem"}
                   style={{width: param.width, height: param.height, marginTop: param.marginTop}}
                   layout
                   initial={{scale: 0, y: 50}}
                   animate={{scale: 1, y: 0}}
                   exit={{scale: 0, y: -50}}
                   transition={{type: "spring"}}
                   key={data.id}
                   onClick={handlerArticle}>
            <div className={"articleItemIconBox"}>
                <img className={"articleItemIcon"} src={data.icon} alt=""/>
            </div>
            <div className={"articleItemMsg"}>
                <span className={"title"}>{data.title}</span>
                <span className={"context"}>{data.context}</span>
                <div className={"author"}>
                    <span className={"nickname"}>
                        <img className={"avatar"} src={data.avatar} alt=""/>
                        <span className={"username"}>{data.userName}</span>
                    </span>
                    <span className={"read"}>浏览量：{data.read}</span>
                </div>
            </div>
            <div className={"date"}>{data.date}</div>
        </motion.li>
    )
}
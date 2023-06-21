import React from "react";
import {ArticleItemInterface, SizeInterface} from "../../config/publicInterface";

interface ArticleItemParam extends SizeInterface {
    data: ArticleItemInterface
}

export const ArticleItem: React.FC<ArticleItemParam> = ({param, data}) => {
    return (
        <div className={"articleItem"} style={{width: param.width, height: param.height, marginTop: param.marginTop}}>

            {data.title}
            {data.context}
            {data.userName}
            {data.read}
            {data.date}
        </div>
    )
}
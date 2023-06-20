import React from "react";
import {ArticleType} from "../common/articleType";
import "../../sass/common/containerComponent.sass";

export const ContainerComponent: React.FC = () => {
    return (
        <div className={"containerComponent"}>
            <ArticleType param={{width:'auto',height:'auto',marginTop:'0'}} />
        </div>
    )
}
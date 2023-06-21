import React from "react";
import {SizeInterface} from "../../config/publicInterface";

interface NotFrontParam extends SizeInterface {
    fontSize: string
}

export const NotFront: React.FC<NotFrontParam> = ({param, fontSize}) => {
    return (
        <div style={{width: param.width, height: param.height, marginTop: param.marginTop, fontSize: fontSize}}>
            未找到相应数据
        </div>
    )
}
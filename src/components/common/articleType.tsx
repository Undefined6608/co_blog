import {ArticleTypeList} from "../container/articleTypeList";
import React, {useState} from "react";
import {SizeInterface} from "../../config/publicInterface";
import "../../sass/common/articleType.sass";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

export const ArticleType: React.FC<SizeInterface> = ({param}) => {
    const [childState, setChildState] = useState(false);
    const [childSize, setChildSize] = useState<SizeInterface>({param: {width: '200px', height: 'auto',marginTop:'0'}});
    const handlerChild = () => {
        setChildState(!childState);
        if (childState) return setChildSize({param: {width: '200px', height: 'auto',marginTop:'0'}});
        setChildSize({param: {width: '80px', height: 'auto',marginTop:'0'}});
    }
    return (
        <div className={"articleType"} style={{width:param.width,height:param.height,marginTop:param.marginTop}}>
            <ArticleTypeList param={childSize.param} state={childState} setState={setChildState}/>
            <button className={"childShow"} onClick={handlerChild}>
                {
                    childState ?
                        <RightOutlined size={10}/> :
                        <LeftOutlined size={10}/>
                }
            </button>
        </div>
    )
}
import React, {useEffect, useState} from "react";
import {Menu, MenuProps} from "antd";
import {ArticleTypeInterface, SizeInterface} from "../../config/publicInterface";
import "../../sass/common/articleTypeList.sass";
import {getArticleType} from "../../config/api";
import {historyReplace} from "../../config/historyConfig";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

interface ChildProps extends SizeInterface {
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ArticleTypeList: React.FC<ChildProps> = ({param, state, setState}) => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [selectStatus,setSelectStatus] = useState<string>('3');

    useEffect(() => {

        const generateMenuItems = (data: ArticleTypeInterface, rootId = 0): MenuItem[] => {
            return data.data.articleTypeList
                .filter((item) => item.root_id === rootId)
                .map((item) => {
                    const children = generateMenuItems(data, item.id);
                    if (children.length > 0) {
                        return getItem(item.type_name, item.id, <img className={"icon"} width={"16px"}
                                                                     src={item.picture} alt={''}/>, children);
                    } else {
                        return getItem(item.type_name, item.id, <img className={"icon"} width={"16px"}
                                                                     src={item.picture} alt={''}/>);
                    }
                });
        };

        getArticleType().then((r) => {
            if (r.code !== 200) return;
            const updatedItems = generateMenuItems(r);
            setItems(updatedItems);
        }).catch((e) => {

        })
    }, []);
    const selectHandler = (ev: any) => {
        console.log(ev)
        setSelectStatus(ev.key);
        historyReplace('/articleList', {typeId: ev.key * 1});
    }
    return (
        <div className={"articleTypeList"}
             style={{width: param.width, height: param.height, marginTop: param.marginTop}}>
            <Menu
                defaultSelectedKeys={[selectStatus]}
                defaultOpenKeys={[selectStatus]}
                mode="inline"
                theme="light"
                onClick={selectHandler}
                selectable={true}
                inlineCollapsed={state}
                items={items}
            />
        </div>
    )
}
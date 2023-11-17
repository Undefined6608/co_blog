import React, {useEffect, useState} from "react";
import "../sass/pages/editArticle.sass";
import {EditComponent} from "../components/common/editComponent";
import {Input, Select} from "antd";
import {getArticleType, getUserInfo} from "../config/api";
import PubSub from "pubsub-js";
import type {UploadProps} from 'antd';
import {Button, message, Upload} from 'antd';
import {UploadOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

export const EditArticle: React.FC = () => {
    const [typeList, setTypeList] = useState<Array<{ value: number, label: string }>>();
    const [type, setType] = useState(0);
    const [title, setTitle] = useState('');
    const history = useNavigate();
    const [icon, setIcon] = useState('http://39.101.72.168:81/image/icon.jpg');

    getUserInfo().then((r) => {
        if (r.code !== 200) return history('/');
        if (r.data.limits !== 0 && r.data.limits !== 1) return history('/');
    })

    const props: UploadProps = {
        name: 'image',
        action: 'http://39.101.72.168:4001/api/upload/img',
        // action: '/api/upload/img',
        headers: {
            ContentType: 'multipart/form-data',
        },
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                message.error(`${file.name} 不是png类型`);
                return false; // 阻止文件上传
            }
            const fileSizeLimit = 5 * 1024 * 1024; // 2 MB (以字节为单位)
            if (file.size > fileSizeLimit) {
                message.error('文件大小超过限制（最大5MB）');
                return false; // 阻止文件上传
            }
            return isPNG || Upload.LIST_IGNORE;
        },
        onChange(info) {
            // console.log(info);
            if (info.file.status === 'done') {
                if (info.file.response.code !== 200) return;
                setIcon(info.file.response.data[0].url);
                message.success(`${info.file.name} 图片上传成功!`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 图片上传失败!`);
            }
        },
    };
    useEffect(() => {
        getArticleType().then((r) => {
            if (r.code !== 200) return PubSub.publish('openTip', {
                type: 'warning',
                msg: {message: "请求失败！", description: r.msg}
            })
            const updateTypeList: Array<{ value: number, label: string }> = r.data.articleTypeList.filter(person => person.edit_status === 1).map((item) => {

                return {value: item.id, label: item.type_name};
            })
            return setTypeList(updateTypeList);
        })
    }, [])
    return (
        <div className={"commonPages editArticleBox"}>
            <div className={"selectList"}>
                <div className={"selectItem"}>
                    文章类别：
                    <Select
                        style={{width: 120}}
                        onChange={setType}
                        options={typeList}
                    />
                </div>
                <div className={"selectItem"}>
                    文章标题：
                    <Input placeholder="请输入文章标题" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className={"selectItem"}>
                    文章展示图片：
                    <Upload {...props}>
                        <Button icon={<UploadOutlined/>}>.png上传图片</Button>
                    </Upload>
                </div>
            </div>
            <EditComponent param={{width: '100%', height: '80vh', marginTop: '10px'}} typeParam={false}
                           contextParam={''} updateData={{type: type, title: title, icon: icon}}/>
        </div>
    )
}

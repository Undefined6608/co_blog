// 引入创建history对象方法
import {BrowserHistory, createBrowserHistory} from "history";

// 创建history对象
const history: BrowserHistory = createBrowserHistory();

export const historyPush = (url: string, data: object) => {
    history.push(url, data)
}

export const historyReplace = (url: string, data: object) => {
    history.replace(url, data);
}
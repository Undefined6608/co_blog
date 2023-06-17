import React, {useEffect, useState} from "react";
import "@/sass/common/loginComponent.sass";
import PubSub from "pubsub-js";
import {LoginForm} from "./loginForm";
export const LoginComponent: React.FC = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const subToken = PubSub.subscribe('loginStatus', (_, loginShow) => {
            setShow(loginShow);
        })
        return () => {
            PubSub.unsubscribe(subToken);
        }
    }, []);

    const handlerShow = () => {
        setShow(!show);
    }

    const handlerStop = (event: any) => {
        event.stopPropagation();  // 阻止事件冒泡
    }

    return (
        <>
            {
                show ?
                    <div className={"loginComponent"} onClick={handlerShow}>
                        <div className="loginPage" onClick={handlerStop}>
                            <div className="loginLogo">
                                Co-Blog
                            </div>
                            <LoginForm/>
                        </div>
                    </div> :
                    null
            }
        </>
    )
}
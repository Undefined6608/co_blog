import React from "react";
import { RegisterForm } from "../components/container/registerForm";
import "../sass/pages/commonPages.sass";
import "../sass/pages/register.sass";

/**
 * 
 * @returns 注册页面
 */
export const Register: React.FC = () => {
	return (
		<div className={"commonPages register"}>
			<span className={"registerTitle"}>
				Co-Blog 用户注册
			</span>
			<RegisterForm />
		</div>
	);
};
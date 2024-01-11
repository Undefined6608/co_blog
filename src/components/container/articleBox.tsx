import React from "react";
import {SizeInterface} from "../../config/publicInterface";
import "../../sass/container/articleBox.sass";
import "github-markdown-css/github-markdown-light.css";
import {EditComponent} from "../common/editComponent";

interface ArticleBoxParam extends SizeInterface {
	context: string
}

export const ArticleBox: React.FC<ArticleBoxParam> = ({ param, context }) => {
	return (
		<div className={"article_Box"} style={{ width: param.width, minHeight: param.height, marginTop: param.marginTop }}>
			<EditComponent typeParam={true} contextParam={context} param={{ width: "100%", height: "100%", marginTop: "10px" }} />
		</div>
	);
};
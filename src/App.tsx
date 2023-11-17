import React, {useEffect, useState} from "react";
import "./App.sass";
import {AppRouter} from "./router";

function App() {
	const [theme, setTheme] = useState(false);
	useEffect(() => {
		const themeToken = PubSub.subscribe("theme", (_, val: boolean) => {
			setTheme(val);
		});
		return () => {
			PubSub.unsubscribe(themeToken);
		};
	}, []);
	return (
		<div className="App" data-dark-mode={theme}>
			<AppRouter/>
		</div>
	);
}

export default App;

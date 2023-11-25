const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		createProxyMiddleware("/api/*", { // 转发前缀
			target: "http://39.101.72.168:6005", // 转发地址
			// target: "http://localhost:4001", // 转发地址
			changeOrigin: true, // 向服务器发送本机信息，相当于请求头里的Host
		})
	);
};

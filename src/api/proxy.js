// 该服务为 vercel serve跨域处理
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
	let target = "";

	if (req.url.startsWith("/api")) {
		// 这里填目标地址
		target = "http://137.175.84.209:6005";
	}
	// 创建代理对象并转发请求
	createProxyMiddleware({
		target,
		changeOrigin: true
	})(req, res);
};


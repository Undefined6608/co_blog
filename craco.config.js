const CracoLessPlugin = require('craco-less');
const path = require('path');

const pathResolve = pathUrl => path.join(__dirname, pathUrl);

module.exports = {
	webpack: {
		alias: {
			'@@': pathResolve('.'),
			'@': pathResolve('src'),
			'@assets': pathResolve('src/assets'),
			'@common': pathResolve('src/common'),
			'@components': pathResolve('src/components'),
			'@hooks': pathResolve('src/hooks'),
			'@pages': pathResolve('src/pages'),
			'@store': pathResolve('src/store'),
			'@utils': pathResolve('src/utils')
			// 此处是一个示例，实际可根据各自需求配置
		},
		performance: {
			hints: 'error',
			maxAssetSize: 300000000, // 整数类型（以字节为单位）
			maxEntrypointSize: 500000000 // 整数类型（以字节为单位）
		},
		// 更改build打包文件名称为dist
		configure: (webpackConfig, { env, paths }) => {
			webpackConfig.output.path = path.resolve(__dirname, 'dist')
			paths.appBuild = path.resolve(__dirname, 'dist')
			return webpackConfig
		},
	},
	devServer: {
		host: '0.0.0.0',
		port: 80,
		proxy: {
			'/api': {
				// target: 'http://39.101.72.168:6005',
				// target: 'http://182.92.162.133:6005',
				// target: 'http://137.175.84.209:6005',
				target: 'http://localhost:4001',
				changeOrigin: true
			}
		}
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				// 此处根据 less-loader 版本的不同会有不同的配置，详见 less-loader 官方文档
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {},
						javascriptEnabled: true
					}
				}
			}
		}
	]
};

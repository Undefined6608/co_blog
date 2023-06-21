const path = require('path');
module.exports = {
    homepage: 'http://192.168.127.1:3000',
    webpack: {
        configure: {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, 'src')
                }
            },
        }
    }
};
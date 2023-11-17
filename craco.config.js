const path = require('path');
module.exports = {
    homepage: 'http://127.0.0.1:3000',
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

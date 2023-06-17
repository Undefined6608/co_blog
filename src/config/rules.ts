export const LoginRegExp = {
    illegal: /(.*=.*--.*)|(.*(\+|-).*)|(.*\w+(%|\$|#|&)\w+.*)|(.*\|\|.*)|(.*\s+(and|or)\s+.*)|(.*\b(select|update|union|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|info|drop|execute)\b.*)/i,
    email: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
    phone: /^1[3456789]\d{9}$/,
    username: /(^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+)|(^1[3456789]\d{9})$/
}
export const formRule = {
    nickName:[{required: true, message: '用户名不能为空！'}],
    phone: [{required: true, message: '电话号码不能为空！'}, {
        pattern: LoginRegExp.phone,
        whitespace: false,
        message: "电话号码格式错误"
    }],
    email: [{required: true, message: '电话号码不能为空！'}, {
        pattern: LoginRegExp.email,
        whitespace: false,
        message: "邮箱格式错误"
    }],
    username: [{required: true, message: '电话号码/邮箱不能为空！'}, {
        pattern: LoginRegExp.username,
        whitespace: false,
        message: "电话号码/邮箱格式错误"
    }],
    pwd: [{required: true, message: '密码不能为空！'}],
}
const RegExp = {
    email: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
    phone: /^1[3456789]\d{9}$/
}
export const formRule = {
    phone: [{required: true, message: '电话号码不能为空！'}, {pattern: RegExp.phone,message: "电话号码格式错误！"}],
    email: [{required: true, message: '邮箱不能为空!'}, {pattern: RegExp.email,message: "邮箱格式错误！"}],
    pwd: [{required: true, message: '密码不能为空！'}]
}
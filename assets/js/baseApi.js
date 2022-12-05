// 每次调用$.get(),$.post,$.ajax()的时候会先调用该函数
// 在该函数中我们可以拿到ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax，统一根路径的拼接
    options.url = 'http://127.0.0.1' + options.url
    // 同意为有权限的接口设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        // 不论成功还是失败都会执行 complete 函数
        // 在complete 函数中可以通过res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 401 && res.responseJSON.msg === '无效的token') {
            // 强制清空token
            localStorage.removeItem('token')
            // 强制跳转会原页面
            location.href = '../../home/login.html'
        }
    }
})
// 每次调用$.get(),$.post,$.ajax()的时候会先调用该函数
// 在该函数中我们可以拿到ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax，统一根路径的拼接
    options.url = 'http://127.0.0.1' + options.url
    console.log(options.url)
})
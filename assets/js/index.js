$(function () {
    GetBaseInformation()
    $('#btnLogout').click(function () {
        var layer = layui.layer
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            // 清除本地的token
            localStorage.removeItem('token')
            // 跳转页面
            location.href = 'http://127.0.0.1:5500/home/login.html'
            // 关闭 confirm 询问框
            layer.close(index)
        });
    })
})
function GetBaseInformation() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // 请求头
        success: function (res) {
            if (res.status !== 0) {
                return layer.message
            }
            var userStr = res.data.ninckname || res.data.username
            $('#welcome').html('欢迎&nbsp;' + userStr)
            var avatorpick = userStr[0].toUpperCase()
            $('.text-avatar').html(avatorpick)
            if (res.data.user_pick === '') {
                $('.layui-nav-img').hide()
                $('.text-avatar').show()
            }
            else {
                //将获取的图片信息渲染
                $('.layui-nav-img').attr(src, 'res.data.user_pick').show()
                $('.text-avatar').hide()
            }
            console.log(res, avatorpick)
        }
    })
}
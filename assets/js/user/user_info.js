$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1~6个字符'
            }
        }
    })
    var username = ''
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        console.log(data)
        $.ajax({
            method: 'post',
            url: '/my/info',
            data: data,
            success: function (res) {
                console.log('提交信息成功')
                console.log(res)
            }
        })
        getinfo()
    })
    $('#btnRest').click(function (e) {
        e.preventDefault()
        getinfo()
    })
})
function getinfo() {
    var form = layui.form
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res.data)
            form.val('form-userinfo', res.data)
            username = res.data.username
            $('#user-name').val(username)
        }
    })
}

// 子页面调父页面方法
//  window.parent.方法()
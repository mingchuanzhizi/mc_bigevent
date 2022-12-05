$(function () {
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newpassword: function (value) {
            if (value === $('.layui-form [name = password]').val()) {
                return '新老密码不能相同'
            }
        },
        rewpassword: function (value) {
            if (value !== $('.layui-form [name = newpassword]').val()) {
                return '两次密码必须相同'
            }
        }
    });
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'get',
        })
    })
})
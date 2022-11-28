$(function () {
    // 去注册
    $('#link_reg').click(function () {
        $('.login-box').hide()
        $('.reg-box').show()
        // 清空登录信息
        // $('.layui-form-item [name=username]').val('')
        // $('.layui-form-item [name=password]').val('')
    })
    // 去登陆
    $('#link_login').click(function () {
        $('.reg-box').hide()
        $('.login-box').show()
        // 清空注册去的内容
        // $('.layui-form-item [name=username]').val('')
        // $('.layui-form-item [name=password]').val('')
        // $('.layui-form-item [name=repassword]').val('')
    })
    // 自定义校验规则
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()来自定义校验对象
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框,可以直接返回 true,这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式,也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ]
        // 校验两次密码是否一致
        , repass: function (value) {
            // 需要拿到密码框的内容做对比,如果两者不等,return 提示错误消息
            var pass = $('.reg-box [name=password]').val()
            if (value !== pass)
                return '两次密码不一致'
        }
    })
    $('#reg_form').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
            // username: $('.in-user').val(),
            // password: $('.in-pass').val()
        }
        $.ajax({
            method: 'post',
            url: '/api/reg/post',
            data: data,
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg(res.msg);
                }
                else if (res.status === 2) {
                    layer.msg('注册成功，请登录');
                    console.log(res.username)
                    console.log(res.password)
                    // 模拟人的点击直接去登录
                    $('#link_login').click()
                }
            }
        })
    })
    $('#login_form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login/post',
            // 快速获取表单中的数据
            // 该数据是json格式 如果后端想要获取需要设置相应的解析中间键
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg(res.msg)
                else {
                    layer.msg('登陆成功')
                    // 将登录成功的token字符串缓存到localStorage中
                    localStorage.setItem('token', 'Bearer ' + res.token)
                    console.log(res.token, res.username)
                    // 跳转到主页
                    location.href = '../../home/index.html'

                }
            }
        })
    })
})
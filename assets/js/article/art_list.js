$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;

    // 定义一个查询的参数对象
    // 需要将其提交到服务器
    var data = {
        pagenum: 1, // 默认请求第一页的数据
        pagesize: 2,// 默认每页显示两条数据
        cate_id: '', // 分类文章的id
        state: '' // 文章发布的状态
    }
    initTable()
    renderPage(3)


    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/table',
            data: data,
            success: function (res) {
                console.log(res)
                // 使用模板引擎渲染页面数据
                template('art_list_table', res)
                // 通知layui重新渲染页面
                form.render()
            }
        })
    }

    // 定义美化事件的过滤器
    template.defaults.imports.dataFormat = function (date) {
        var dt = new Date(date)

        var y = dt.getFullYear()
        y = y > 9 ? y : '0' + y
        var m = dt.getMonth()
        m = m > 9 ? m : '0' + m
        var d = dt.getDate()
        d = d > 9 ? d : '0' + d

        var h = dt.getHours()
        h = h > 9 ? h : '0' + h
        var mm = dt.getMinutes()
        mm = mm > 9 ? mm : '0' + mm
        var s = dt.getSeconds()
        s = s > 9 ? s : '0' + s

        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
    }
    $('#form-search').submit(function (e) {
        e.preventDefault()
        var str = $('[name = cate_id]').val()
        var sbr = $('[name = state]').val()
        console.log(str, sbr)
    })
    // 定义渲染分页的方法
    function renderPage(total) {
        // 渲染分页
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: 50, //数据总数，从服务端得到
            limit: data.pagesize, // 每页展示的数据条数
            curr: data.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'pre', 'page', 'next', 'skip'],
            // 定义下拉菜单的数据间隔
            limits: [2, 3, 5, 10],
            // 分页切换的时候触发
            // jump触发回调有两种方式
            // 1.点击页面造成页码切换时
            // 2.只要调用了laypage.render方法就会触发
            jump: function (obj, first) {
                // 可以通过first的值来判断jump的触发方式
                // first = true 自动触发
                // first = undefined 点击触发
                console.log(obj.curr)
                // 把最新的页码值赋值
                data.pagenum = obj.curr
                // 根据最新的页码渲染页面
                if (!first)
                    initTable()
            }
        });
    }
    // 通过代理的方式书写删除的方法
    $('tbody').on('click', '#btn-delete', function () {
        // 询问用户是否删除数据
        var id = $(this).attr('data-id')
        // 获取删除按钮的个数
        var num = $('#btn-delete').length
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/api/sds' + id,
                success: function (res) {
                    layer.msg('删除成功')
                    // 如果当页数据删除完之后，页码还是显示的当时页码，因此页面会没有数据
                    // 因此要判断数据是否删除完，删除完了则页码减一
                    // 可以判断页面的删除按钮个数来判断是否删除完
                    // 当点击最后一个删除按钮时num = 1，点击完毕之后没有删除按钮元素
                    // 因此判断num = 1时页面数据减一即可
                    if (num === 1) {
                        // 页码值最小是一
                        // 因此
                        data.pagenum = data.pagenum === 1 ? 1 : data.pagenum - 1
                    }
                    // 重新渲染页面
                    initTable()
                }
            })

            layer.close(index);
        });
    })
})
$(function () {
    var layer = layui.layer
    var indexadd = null
    var form = layui.form
    postinfo()
    $('#btn-Add').click(function () {
        indexadd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })
    // 通过代理形式为form绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/postarticle',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                postinfo()
                layer.close(indexadd)
            }
        })
    })
    var indexEdit = null
    $('body').on('click', '#btnEdit', function () {
        $('.inputName').val($(this).parent().siblings('#tdName').text())
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-add').html()
        })
        var name = $(this).parent().siblings('#tdName').text()
        var another = $(this).parent().siblings('#tdAnother').text()
        var id = $(this).attr('data-id')
        console.log(id)
        form.val("form-add", {
            name: name,
            another: another
        })
    })
})

function postinfo() {
    $.ajax({
        method: 'get',
        url: '/api/postarticle',
        success: function (res) {
            console.log(res.data)
            var htmlStr = template('tpl-table', res.data)
            $('tbody').html(htmlStr)
        }
    })
}
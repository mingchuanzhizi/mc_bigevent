$(function () {
    var layer = layui.layer
    var form = layui.form
    $.ajax({
        method: 'get',
        url: '/api/sadas',
        success: function (res) {
            // dosomething
            var htmllStr = template('tp-pub', res)
            $('[name = cate_id]').html(htmllStr)
            form.render()
        }
    })
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('.chooseCover').click(function () {
        $('#coverfile').click()
    })
    // 创建一个可以表明草稿和发布的状态
    var art_state = '已发布'
    $('#btnSave').click(function () {
        art_state = '草稿'
    })
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        // 此次提交的数据需要formdata格式的数据，因此需要创建一个formdata数据
        // 将一个原生dom对象传递给formdata就可以快速创建一个formdata实例
        var fd = new FormData($(this)[0])
        // 可以通过append的方法将某些元素加入到fd中
        // 将文章的状态存入state中
        fd.append('state', art_state)
        // 需要将裁剪的图片输出为文件格式后发起ajax请求
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // blob即为获得的文件格式图片
                fd.append('cover_img', blob)
            })
    })
    publishArtical(fd)
    // 创建一个发送ajax的函数
    function publishArtical(fd) {
        $.ajax({
            method: 'post',
            url: '/api/sds',
            data: fd,
            // 如果向服务器提交的是formdata数据需要添加以下两个配置
            contentType: false,
            processDate: false,
            success: function (res) {
                // doingsomething
                localStorage.href = '../../../article/art_list.html'
            }
        })
    }
})
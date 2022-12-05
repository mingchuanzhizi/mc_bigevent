$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#btnChoose').click(function () {
        $('#inputFile').click()
    })
    // 为文件选择框绑定change事件
    $('#inputFile').on('change', function (e) {
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请添加图片')
        }
        else {
            // 拿到用户的文件
            var file = e.target.files[0]
            // 将文件转换为路径
            var imgUrl = URL.createObjectURL(file)
            // 重新初始化
            $image
                .cropper('destroy') //销毁源文件
                .attr('src', imgUrl) // 添加选择的文件
                .cropper(options) // 重新初始化
            console.log(file, filelist)
        }
    })
    $('#btnD').click(function () {
        // 获取所需的图片并转换为数据格式（base64字符串）传输给服务器
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 发送ajax请求
    })
})
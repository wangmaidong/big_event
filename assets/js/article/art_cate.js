$(function () {
    const {
        form
    } = layui;
    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                const htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }
    initArtCateList();
    // 为添加类别按钮绑定点击事件
    let indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        })
    })
    // 为script的form表单添加提交事件，使用事件代理的方式
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $("#form-add").serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                initArtCateList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })
    // 给编辑按钮添加点击事件弹出编辑弹出层，因为是根据数据动态渲染所以使用事件代理
    let indexEdit = null;
    $("#tbody_art").on("click", "#btn_edit", function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $("#dialog-edit").html()
        })
        const id = $(this).attr("data-id");
        console.log(id)
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                console.log(res)
                form.val('form-edit', res.data)
            }
        })
    })
    // 给弹出编辑层添加提交事件，使用事件委托
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })
    // 给删除按钮添加点击事件，使用事件代理
    $("tbody").on("click", "#btn_delete", function () {
        const id = $(this).attr("data-id");
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList();
                }
            })
        })
    })

    
})
$(function () {
    // 去注册
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show()
    })
    // 去登录
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide()
    })
    // 定义校验规则 从layui.js中引入了layui对象

    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码不符合规则"],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 给注册表单添加注册事件
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        const username = $("#form_reg [name=username]").val();
        const password = $("#form_reg [name=password]").val();
        const data = {
            username,
            password
        }
        console.log(data)
        $.ajax({
            type: "POST",
            data: data,
            url: "/api/reguser",
            success: function(res) {
                if(res.status !== 0) {
                    layer.msg(res.message)
                } else if(res.status === 0) {
                    layer.msg(res.message);
                    $("#link_login").click();
                }
            }
        })
    })

    // 给登陆表单添加提交事件
    $("#form_login").on("submit", function(e) {
        // 首先阻止默认提交行为
        e.preventDefault();
        // 进行Ajax提交
        $.ajax({
            type: "POST",
            data: $(this).serialize(),
            url: "/api/login",
            success: function(res) {
                if(res.status !== 0) {
                    layer.msg(res.message)
                } else if(res.status === 0) {
                    layer.msg(res.message);
                    // 把返回信息中的token进行本地存储，方便后面使用
                    localStorage.setItem("token", res.token);
                    // 跳转到登录界面
                    location.href = "/index.html"
                }
            }
        })
    })
})
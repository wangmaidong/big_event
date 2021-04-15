$(function () {
    // 调用获取用户信息
    getUserBaseInfo();
    // 给退出按钮绑定点击事件
    $("#btn-logout").on("click", function () {
        layer.confirm('确定退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            location.href = "/login.html";
            delete localStorage.token;
            // localStorage.removeItem("token")
            layer.close(index);
        });
    })
})


// 获取用户基本信息
function getUserBaseInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // 带有my路径的请求需要在头部添加登陆时后台返回的token
        // headers: {
        //     Authorization: localStorage.token || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            } else if (res.status === 0) {
                layer.msg(res.message);
                renderAvatar(res.data);
            }
        }
    });
}

// 渲染用户头像
function renderAvatar(user) {
    const name = user.nickname || user.username;
    $("#welcome").html(`欢迎  ${name}`);
    if (user.user_pic) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        const firstLetter = name[0].toUpperCase();
        $(".text-avatar").html(firstLetter).show();
    }
}
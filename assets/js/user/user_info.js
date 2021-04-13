$(function () {
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })
  initUserInfo();
  // 给重置按钮添加点击事件
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  })
  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserBaseInfo()
      }
    })
  })
})
//   获取登录用户的信息
function initUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layui.form.val('formUserInfo', res.data)
    }
  })
}
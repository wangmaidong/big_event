// 在发起请求前进行统一拦截对请求地址进行修改
$.ajaxPrefilter(function(options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // 判断请求路径是否包含my的请求路径，是的话就表示是带权限的请求
    if(options.url.includes("my")) {
        options.headers = {
            Authorization: localStorage.token || "",
        }
        options.complete =  function({responseJSON:{message,status}}) {
            console.log(message, status);
            if (status === 1 && message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
                location.href = '/login.html'
              }
        }
    }
})
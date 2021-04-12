// 在发起请求前进行统一拦截对请求地址进行修改
$.ajaxPrefilter(function(options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
})
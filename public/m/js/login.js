$(function(){
  window.userData = {};
  // 验证用户输入数据是否为空：此处可以通过正则进行更精细的验证
  $('.btn_login').on('tap',function(){
    if(!$('input[name="name"]').val()){
      mui.toast('请输入用户名',{ duration:'long', type:'div' });
      return false;
    }else if(!$('input[name="pass"]').val()){
      mui.toast('请输入密码',{ duration:'long', type:'div' });
      return false;
    }

    // 获取input数据，并传入后台
    userData.username = $('input[name="name"]').val();
    userData.password = $('input[name="pass"]').val();
    userLogin(window.userData,function(data){
      // 如果登录成功，跳转到之前页面,如果账号密码不正确，则弹出提示框
      if(data.error == 403){
          mui.toast(data.message,{ duration:'long', type:'div' });
      }else if(data.success == true){
        var urlStr = location.search.replace('?returnUrl=','');
        if(!urlStr){
          // 如果用户没有之前的浏览记录，则跳转到主页
          location.href="../index.html";
        }else{
          // 如果有，则根据url传递的参数跳转到之前页面
          location.href = urlStr;
        }
      }
    })
  })

})
// ajax将数据发送给后台 {"username":"zhoushugang","password":"123456"}
var userLogin = function(params,callback){
  $.ajax({
    url:'/user/login',
    type:'post',
    data:params,
    dataType:'json',
    success:function(data){
      callback && callback(data);
    }
  })
}

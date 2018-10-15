$(function(){
  $('.btn_login').on('tap',function(){
    if(!$('input[name="name"]').val()){
      mui.toast('请输入用户名',{ duration:'long', type:'div' });
      return false;
    }else if(!$('input[name="pass"]').val()){
      mui.toast('请输入密码',{ duration:'long', type:'div' });
      return false;
    }
  })
})
// 1.点击登录的时候获取用户数据

// 2.ajax将数据发送给后台 {"username":"zhoushugang","password":"123456"}

$(function(){
  /*不显示转圈效果*/
  NProgress.configure({
      showSpinner: false
  });
  /*在ajax开始请求的时候  把进度条显示出来*/
  $(window).ajaxStart(function(){
      NProgress.start();
  });
  /*在ajax结束请求的时候  把进度条完成*/
  $(window).ajaxComplete(function(){
      NProgress.done();
  });

  // 点击折叠
  $('.fatherBox').click(function(e){
    e.preventDefault();
    $('.sonBox').slideToggle('slow');
  })
  $('.catalog').click(function(e){
    e.preventDefault();
    $('aside').toggle();
    $('nav').toggleClass('menu');
  })
  // 退出：弹出模态框
  $('.loginOut').click(function(){
    console.log('hello');
    loginOut();
  });
})

var loginOut = function(){
  $.ajax({
    url:'/employee/employeeLogout',
    type:'get',
    data:'',
    dataType:'json',
    success:function(data){
      if(data.success){
        setTimeout(function(){
          location.href='http://127.0.0.1:3000/admin02/login.html';
        },1000)
        console.log(data);
      }
    }
  })
}

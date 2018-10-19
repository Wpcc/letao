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
})

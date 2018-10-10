$(function(){
  /*
  初始化：
   */
  // 1.初始化滑动插件
  mui('.mui-scroll-wrapper').scroll({
  	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  // 2.初始化input：获取url参数,并将数据复制给input
  var params = obj.getParamsByUrl();
  $('.lt_search input').val(params.key);
  // 3.初始化页面，根据input的值渲染商品页
  getSearchData({
    page:1,
    pageSize:4
  },function(data){
    $('.lt_products').html(template('proTemplate',data));
  })
  /*
  排序：
   */
  $('.lt_productList').on('tap','div',function(){
    // ------样式业务逻辑-------
    var $this = $(this);
    if(!$this.hasClass('now')){
      $this.addClass('now').siblings().removeClass('now');
      // 清空变换图标
      $this.siblings().find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    else{
      //如果图标向下，则变成上。反之，亦然。
      if($this.find('span').hasClass('fa-angle-down')){
        $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
      }else{
        $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
      }
    }
    //----排序业务逻辑-------
    var searchP = {
      page:1,
      pageSize:4
    }
    if($this.find('span').hasClass('fa-angle-down')){
      searchP[$(this).attr('data-type')] = 2;
    }else{
      searchP[$(this).attr('data-type')] = 1;
    }
    getOrderSearchData(searchP);
  })
  /*
  下拉刷新和上拉加载
   */
   mui.init({
     pullRefresh : {
       container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
       down : {
         callback :function(){
           var that = this;
           setTimeout(function(){
             getSearchData({
             page:1,
             pageSize:4
             },function(data){
               $('.lt_products').html(template('proTemplate',data));
             });
             // 结束刷新
             that.endPulldownToRefresh();
             that.refresh(true);
           },1000)
         }
       }
     }
   });

})

// 获取搜索数据
var getSearchData = function(params,callback){
  $.ajax({
    url:'/product/queryProduct',
    type:'get',
    data:params,
    dataType:'json',
    success:function(data){
      callback && callback(data);
    }
  })
}
// 获取排序搜索数据
var getOrderSearchData = function(params){
  getSearchData(params,function(data){
    $('.lt_products').html(template('proTemplate',data));
  })
}

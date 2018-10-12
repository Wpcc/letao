$(function(){
  // 初始化滑动插件
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  //页面渲染
  window.urlParams = obj.getParamsByUrl();
  console.log(urlParams);
  getDetailData({id:window.urlParams.productId},function(data){
    console.log(data);
    $('.renderBox').html(template('productDetailTemplate',data));
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    // 设置页面参数
    selectDetailData();
    // 发送产品详细数据
    postDetailData();
  })
})

var getDetailData = function(data,callback){
  $.ajax({
    url:'/product/queryProductDetail',
    type:"get",
    data:data,
    dataType:'json',
    success:function(data){
      callback && callback(data);
    }
  })
}
var selectDetailData = function(){
  window.selectDD={
    productId:window.urlParams.productId,
    num:0,
    size:0
  };

  $('.lt_size span').on('tap',function(){
    $(this).addClass('now').siblings().removeClass('now');
    window.selectDD['size'] = $(this).html();
  })
  $('.lt_number span:first-child').on('tap',function(){
    var num = $(this).siblings('input').val();
    num --;
    if(num<0){
      return false;
    }
    $(this).siblings('input').val(num);
    window.selectDD['num'] = $('.lt_number input').val();

  })
  $('.lt_number span:nth-of-type(2)').on('tap',function(){
    var num = $(this).siblings('input').val();
    num ++;

    console.log(num);
    if(num>20){
      return false;
    }
    $(this).siblings('input').val(num);
    window.selectDD['num'] = $('.lt_number input').val();
  })

}

var postDetailData = function(){
  $('.lt_footer a:nth-of-type(2)').on('tap',function(event){
    if(window.selectDD.size == 0){
      mui.toast('请选择产品尺寸',{ duration:'long', type:'div' });
      return false;
    }else if(window.selectDD.num == 0){
      mui.toast('请选择产品数量',{ duration:'long', type:'div' });
      return false;
    }
    // 与后台交互获取数据
    obj.loginQuery({
      url:'/cart/addCart',
      type:'post',
      data:window.selectDD,
      dataType:'json',
      success:function(data){
        console.log(data);
      }
    })
  })
}

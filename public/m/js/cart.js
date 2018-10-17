$(function(){
  /*
  1.页面初始化：包括上拉刷新、下拉加载
  2.产品修改:包括产品的修改及删除
  3.点击刷新按钮：刷新页面
  4.计算总金额：通过change事件
   */
   // 初始化滑动插件
   mui('.mui-scroll-wrapper').scroll({
   	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
   });
  // 1.初始化下拉刷新、上拉加载
  mui.init({
    pullRefresh : {
      container:"#refreshContainer",
      down : {
        auto: true,
        callback :function(){
          var that = this;
          setTimeout(function(){
            console.log('下拉刷新完毕');
            // 动态渲染dom,并保存服务器数据
            getCartData(function(data){
              window.cartData = data;
              console.log(window.cartData);
              $('#cart_box').html(template('cartTemplate',{arr:data}));
            });
            // 关闭下拉刷新
            that.endPulldownToRefresh();
            that.refresh(true);
          },1000);
        }
      },
      up : {
       callback :function(){
         var that = this;
         setTimeout(function(){
           // 购物车的数据一次性显示，故不需要做后续数据有无加载样式不一的逻辑
           console.log('上拉加载完毕');
           // 关闭上拉刷新
           that.endPullupToRefresh(true);
         },1000);
       }
     }
    }
  });
  // 2.产品修改
  $('#cart_box').on('tap','li .mui-btn-blue',function(event){
    event.preventDefault();
    var index = $(this).attr('data-id');
    window.selectData = window.cartData[index];
    console.log(selectData);
    var html = template('editBoxTemplate',{data:window.selectData}).replace(/\n/g,'');
    // 编辑框逻辑
    editBoxLogic();
    mui.confirm(html,'编辑商品',['确认','取消'],function(e){
      if (e.index == 0) {
        var data = {
          id:window.selectData.id,
          size:window.selectData.size,
          num:window.selectData.num
        };
        // 更新服务器中购物车数据
        upCartData(data,function(data){
          if(data.success == true){
            $('#cart_box').html(template('cartTemplate',{arr:window.cartData}));
          }else{
            mui.toast(data.message);
          }
        })
      }else{
        mui.swipeoutClose();
      }
    },'div');
  })
  $('#cart_box').on('tap','li .mui-btn-red',function(event){
    var that = this;
    event.preventDefault();
    // mui确定框内部逻辑
    mui.confirm('你要删除这件商品吗？', '温馨提示', ['确定', '取消'], function(e) {
        if (e.index == 0) {
          var id = $(that).parent().parent().attr('data-product');
          // 删除服务器中购物车数据,并将本地存储数据删除
          deleteCartData({id:id},function(data){
            if(data.success == true){
              var index = $(this).attr('data-id');
              window.cartData.splice(index,1);
              $('#cart_box').html(template('cartTemplate',{arr:window.cartData}));
            }else{
              mui.toast(data.message);
            }
          })
        }else{
          mui.swipeoutClose();
        }
    })

  })
  // 3.点击按钮刷新
  $('.fa-refresh').on('tap',function(){
    mui('#refreshContainer').pullRefresh().pulldownLoading();
  })
})
// 获取后台用户购物车的数据
var getCartData = function(callback){
  $.ajax({
    url:'/cart/queryCart',
    type:'get',
    dataType:'json',
    success:function(data){
      callback && callback(data);
    }
  })
}
// 删除数据
var deleteCartData = function(id,callback){
  $.ajax({
    url:'/cart/deleteCart',
    type:'get',
    data:id,
    dataType:'json',
    success:function(data){
      callback && callback(data);
    }
  })
}
// 更新数据
var upCartData = function(data,callback){
  console.log(data);
  $.ajax({
    url:'/cart/updateCart',
    type:'post',
    data:data,
    dataType:'json',
    success:function(data){
      callback && callback(data);
    }
  })
}
//产品框逻辑
var editBoxLogic = function(){
  // 更改选中样式：数量不能小于0大于库存
  $('body').on('tap','.lt_size span',function(){
    console.log('size');
    $(this).addClass('now').siblings().removeClass('now');
    window.selectData.size = parseInt($(this).html());
  })
  .on('tap','.lt_number span:first-child',function(){
    var i = $(this).siblings('input').val();
    if(i<=1){
      return false;
    }
    i--;
    $(this).siblings('input').val(i);
    window.selectData.num = i;
  })
  .on('tap','.lt_number span:nth-of-type(2)',function(){
    var i = $(this).siblings('input').val();
    // 转数字
    var max = parseInt($(this).siblings('.maxNum').html());
    if(i>=max){
      return false;
    }
    i++;
    $(this).siblings('input').val(i);
    window.selectData.num = i;
  })
  // 提交选中数据

}

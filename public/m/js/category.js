$(function(){

  /*
  一级分类模板渲染
  运用模板引擎进行渲染
   */
  getFirstCategoryDate(function(data){
    var html = template('firstCategory',data);
    $('.cate_left ul').html(html);
    var dataId = $('.cate_left ul li:first-child a').attr('data-id');
    // 通过一级分类传递id，获取二级分类数据
    render(dataId);
  });
  /*
   通过事件委托给动态DOM节点设置处理函数
   */
  $('.cate_left ul').on('tap','li',function(){
    // 如果点击的分类已经加载过数据，则无需加载
    if($(this).hasClass('now')){return false;};
    // 改变一级分类样式
    $(this).addClass('now');
    $(this).siblings().removeClass('now');
    // 改变一级分类对应二级分类的样式
    var dataId = $(this).find('a').attr('data-id');
    render(dataId);
  })
});

// 获取一级分类数据
var getFirstCategoryDate = function(callback){
  $.ajax({
    url:"/category/queryTopCategory",
    type:"get",
    data:"",
    dataType:"json",
    success:function(data){
      callback && callback(data);
    }
  })
}
/*
 获取二级分类数据，并封装二级分类数据渲染
 */
var getSecondCategoryDate = function(params,callback){
  $.ajax({
    url:"/category/querySecondCategory",
    type:"get",
    data:params,
    dataType:"json",
    success:function(data){
      callback && callback(data);
    }
  })
}
var render = function(firstCategoryData){
  getSecondCategoryDate({
      id:firstCategoryData
    },function(data){
      var html = template('secondCategory',data);
      $('.cate_right ul').html(html);
  })
}

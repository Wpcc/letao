$(function(){
  // 页面渲染
    render();
  /*
    逻辑：
      点击搜索，将获取的数据传给url
      同时将数据存入到web当中
   */
  $('.lt_search a').on('tap',function(){
    // 获取input的数据并传给url,需要清除input中的前后空格
    var params = $.trim($('.lt_search input').val());
    if(!params){
      mui.toast('请输入查询数据',{ duration:'long', type:'div' });
    }else{
      // 将数据存储到web存储当中
      setLocalStorageDate(params);
      location.href = 'searchList.html?key='+params;
      // 清空input里面的输入
      $(".lt_search input").val('');
    }
  })
  /*
  点击逻辑：
    1：清空记录-----删除所有数据
    2：删除--------删除点击的数据
    将事件代理到父级元素
   */
  $('.lt_history').on('tap','.clearAll',function(){
    localStorage.clear();
    render();
  }).on('tap','.clearSelected',function(){
    var data = $(this).attr('data-id');
    removeLocalStorageDate(data);
    render();
  })
})

/*
web存储：
  1.取数据
  2.存数据
  3.删除数据
 */
var getLocalStorageDate = function(){
  return JSON.parse(localStorage.getItem('history') || '[]');
}
var setLocalStorageDate = function(data){
  var list = getLocalStorageDate();
  // 如果web存储中有数据，删除数据，将数据提前
  $.each(list,function(i,item){
    if(data == item){
      list.splice(i,1);
    }
  })
  list.unshift(data);

  if(list.length>10){
    list.splice(10,1);
  }
  localStorage.setItem('history',JSON.stringify(list));
}
var removeLocalStorageDate = function(data){
  var list = getLocalStorageDate();
  // 如果web存储中有数据，删除数据，将数据提前
  $.each(list,function(i,item){
    if(data == item){
      list.splice(i,1);
    }
  })
  localStorage.setItem('history',JSON.stringify(list));
}
// 渲染页面
var render = function(){
  var html = template('historyTemplate',{data:getLocalStorageDate()});
  $('.lt_history').html(html);
}

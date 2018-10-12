// 获取url参数
window.obj = new Object();
obj.getParamsByUrl = function(){
  var params={};
  //?key=3&name=hello
  var search = location.search;
  if(search){
    var searchStr = search.slice(1);
    var searchArr = searchStr.split('&');
    // 得到['key=3','name=hello']
    $.each(searchArr,function(index,item){
      var arr = item.split('=');
      params[arr[0]] = arr[1];
    })
  }
  return params;
}

//传入对象中，除了ajax还需要包括回调函数
obj.loginQuery = function(params){
  $.ajax({
    url:params.url || '#',
    type:params.type || 'get',
    data:params.data || '',
    dataType:params.dataType || 'json',
    success:function(data){
      // 如果用户未登陆，跳转到登陆页面
      if(data.error == 400){
          location.href = '/m/user/login.html?returnUrl='+location.href;
          return false;
      }
      else if(data.success){
        success && success(data);
      }
    },
    error:function(xhr){
      mui.toast('服务器繁忙',{ duration:'long', type:'div' });
    }
  })
}

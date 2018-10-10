// 获取url参数
var obj = new Object();
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

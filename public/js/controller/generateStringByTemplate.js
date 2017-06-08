function generateStringByTemplate(obj){
  var id = obj.id,
      params = obj.params,
      data = obj.data;
  var arr = [];
  var new_arr = [];
  var txt = $("#"+ id).text();
  for(var index in params){
    arr.push(index);
  }
  var arrReg = arr.join("|");
  var reg = new RegExp(arrReg, "g");
  $(data).each(function(key, value){
    new_arr.push(txt.replace(reg, function(t){
      return value[params[t]];
    }));
  });
  return new_arr;
}

//时间戳处理函数
  function changeByReg(num){
    num = num || 1493103810;
    var newDate = new Date();
    newDate.setTime(num * 1000);
    var str = newDate.toLocaleString()
    var reg_a = /[\u4e00-\u9fa5]|[/]/g

    var newstr = str.replace(reg_a,function(t){
      if(t === '/'){
        return '-';
      }
      if(/[\u4e00-\u9fa5]/.test(t)){
        return '';
      }
    })
    return newstr;
  }


  function ajax(url,type,timeout,data,callback){
    $.ajax({
        url:url,
        type:type,
        data:data,
        timeout : timeout,
        success: function(data){
          callback(data);
        }
      });
  }

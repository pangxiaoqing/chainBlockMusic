;
!function(){
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
}();
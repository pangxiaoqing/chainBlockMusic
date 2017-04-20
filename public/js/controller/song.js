function aa(){
	var audio = document.getElementById('audio'),
		  time = document.getElementById('time');
	var timer;
	//获取cookie中的值，并赋值给$num
	// var $num = parseInt($.cookie("num"));
	//关闭audio自带的controls功能
	audio.controls = false;
	//audio自带timeupdate事件，当播放位置发生改变时触发
	audio.addEventListener('timeupdate', function() {
		//aTime表示音频当前位置秒数，aLength表示音频长度以秒记
		var	aTime =parseInt(audio.currentTime);
		var aLength =parseInt(audio.duration) ;
		//aMinute表示音频的分钟数，aSecond表示音频的秒数
		var aMinute = parseInt(aLength/60);
		var aSecond = aLength % 60;
		//音频当前秒数大于60秒时，所对应的分钟数和秒数
		var aTimeM = parseInt(aTime/60);
		var aTimeS = aTime%60;

		if(aLength < 60){
		  	if(aTime < 10){
		  		time.innerHTML='00:0'+aTime+'/00:'+aLength;
		  	}else{
		  		time.innerHTML='00:'+aTime+'/00:'+aLength;
		  	}
		}else if(aLength > 60 && aSecond > 10){
		  	if(aTime < 10){
		  		time.innerHTML='00:0'+aTime+'/0'+aMinute+':'+aSecond;
		  	}else if(aTime > 10 && aTime <= 60){
		  		time.innerHTML='00:'+aTime+'/0'+aMinute+':'+aSecond;
		  	}else if(aTime > 60 && aTimeS < 10){
		  		time.innerHTML='0'+aTimeM+':0'+aTimeS+'/0'+aMinute+':'+aSecond;
		  	}else if(aTime > 60 && aTimeS > 10){
		  		time.innerHTML='0'+aTimeM+':'+aTimeS+'/0'+aMinute+':'+aSecond;
		  	}
		}else if(aLength > 60 && aSecond < 10){
				if(aTime < 10){
					time.innerHTML='00:0'+aTime+'/0'+aMinute+':'+'0'+aSecond;
				}else if(aTime > 10 && aTime <= 60){
					time.innerHTML='00:'+aTime+'/0'+aMinute+':'+'0'+aSecond;
				}else if(aTime > 60 && aTimeS < 10){
					time.innerHTML='0'+aTimeM+':0'+aTimeS+'/0'+aMinute+':'+'0'+aSecond;
				}else if(aTime > 60 && aTimeS > 10){
					time.innerHTML='0'+aTimeM+':'+aTimeS+'/0'+aMinute+':'+'0'+aSecond;
				}
		}
	}, false);

	var $playpause = $("#playpause");
	var $stepForward = $("#stepForward");
	var $stepBackward = $("#stepBackward");
	//页面加载完成 直接播放音乐
	$playpause.removeClass("glyphicon-play").addClass("glyphicon-pause");
	audio.play();
	updateProgress();
	//点击切换暂停播放按键
	$playpause.click(function(){
		if(audio.paused || audio.ended) {
				$playpause.removeClass("glyphicon-play").addClass("glyphicon-pause");
		    audio.play();
		    updateProgress();
		}else{
		    $playpause.removeClass("glyphicon-pause").addClass("glyphicon-play");
		    audio.pause();
		}
	});
	//点击下一首歌，歌曲切换至下一首
	// $stepForward.click(function(){
	// 	// console.log($.cookie("num"));
	// 	$num += 1;
	// 	if($num > 16){
	// 		alert("当前歌曲是最后一首歌");
	// 	}else{
	// 		resetGetJsonData($num);
	// 	}
	// });
	//点击快进按钮，向后退
	// $stepBackward.click(function(){
	// 	$num -= 1;
	// 	if($num < 1){
	// 		alert("当前歌曲是第一首歌");
	// 	}else{
	// 		resetGetJsonData($num);
	// 	}
	// });
	//定时器函数，控制进度条进度
	function updateProgress(){
		var $progressWidth = $("#progress").width();
		var aLength = audio.duration;
		timer = setInterval(change,1000);
	}
	function change(){
		var $progressWidth = $("#progress").width();
		var aLength = audio.duration;
		var ProcessYet = (audio.currentTime / aLength) * $progressWidth;
    //console.log(ProcessYet);
    $("#progressBar").css("width",ProcessYet);
	}


  //监听媒体文件结束的事件（ended），这边一首歌曲结束循环播放
	audio.addEventListener('ended', function() {
    audio.currentTime = 0;
    audio.play();
    updateProgress();
	});
	// //监听媒体文件结束的事件（ended），这边一首歌曲结束就读取下一首歌曲，实现播放上的循环播放
	// audio.addEventListener('ended', function() {
	// 	if($num == 16){
	// 		$num = 1;
	// 		resetGetJsonData($num);
	// 	}else{
	// 		$num += 1;
	// 		resetGetJsonData($num);
	// 	}
	// });
	//当cookie中存的num改变时，重新从json文件中获取数据，加载到界面上
	// function resetGetJsonData(num){
	// 	$.getJSON('js/song.json', function(data){
	// 		// console.log(data);
	// 		$.cookie("num",num);
	// 		// console.log(data[$num]);
	// 		$("#songMess").empty().append(generateStringByTemplate({
	// 			id:"songMessage",
	// 			params:{"%d":"name","%t":"describe","%s":"src"},
	// 			data:data[num]
	// 		}));
	// 		//刷新界面相当与F5的功能（执行完次动作后，相当与return，所以在此之后的事件将不会执行）
	// 		window.location.reload();
	// 	});
	// }
};

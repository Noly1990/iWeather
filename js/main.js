$(document).ready(function() {

	$('#send').click(function() {
		var cityname = $('#cityName').val();
		var todayItems = $('#todayItems dd');
		var futureItems = $('#futureItems dd');
		var futureSpans = $('#futureItems span');
		var aimCity = $('#aimCity');
		if(cityname !== '') {

						$.ajax({
							url: "http://v.juhe.cn/weather/index?cityname=" + cityname + "&dtype=json&format=1&key=866c54e639beeac7373394a3fd195a34",
							dataType: "jsonp",
							jsonp: "callback",
							success: function(data) {
								var reCode = data.resultcode;
		
								if(reCode == '200') {
			
									var today = data.result.today;
									var future = data.result.future;
									var sk = data.result.sk;
			
									$('#todayTime').text(today.date_y + sk.time);
									todayItems.eq(0).text(today.temperature);
									todayItems.eq(1).text(today.weather);
									todayItems.eq(2).text(today.wind);
									todayItems.eq(3).text(sk.humidity);
									todayItems.eq(4).text(today.travel_index);
									todayItems.eq(5).text(today.exercise_index);
									todayItems.eq(6).text(today.uv_index);
			
									aimCity.text(today.city);
			
									var flag = 0;
									for(var k in future) {
										futureSpans.eq(flag).text(toNomalDate(k.substring(4)));
			
										futureItems.eq(flag).text(future[k].temperature + '--' + future[k].weather + '--' + future[k].wind);
			
										flag++;
									}
								} else {
									alert(data.reason + ' ' + ' 请查证后再输入。');
								}
			
							}
						});

			//------------------------------------------------------------------------------------------------


		} else {
			alert('你没有输入任何信息！');
		}

	});

	$('#getLocal').click(function() {
		
				var todayItems = $('#todayItems dd');
		var futureItems = $('#futureItems dd');
		var futureSpans = $('#futureItems span');
		var aimCity = $('#aimCity');
		$.ajax({
			'url': 'http://api.ip138.com/query/',
			'data': { //默认自动添加callback参数
				'ip': '', //为空即为当前iP地址
				'oid': '9081',
				'mid': '71978',
				'token': '2904c21a4ee2cc557efa71e58a3562d6' //不安全，请定期刷新token，建议进行文件压缩
			},
			'dataType': 'jsonp',
			'success': function(json) {
							var cityName=json.data[2];
							console.log(cityName);
							$.ajax({
							url: "http://v.juhe.cn/weather/index?cityname=" + cityName + "&dtype=json&format=1&key=866c54e639beeac7373394a3fd195a34",
							dataType: "jsonp",
							jsonp: "callback",
							success: function(data) {
								var reCode = data.resultcode;
								console.log(reCode);
			
								if(reCode == '200') {
			
									var today = data.result.today;
									var future = data.result.future;
									var sk = data.result.sk;
			
									$('#todayTime').text(today.date_y + sk.time);
									todayItems.eq(0).text(today.temperature);
									todayItems.eq(1).text(today.weather);
									todayItems.eq(2).text(today.wind);
									todayItems.eq(3).text(sk.humidity);
									todayItems.eq(4).text(today.travel_index);
									todayItems.eq(5).text(today.exercise_index);
									todayItems.eq(6).text(today.uv_index);
			
									aimCity.text(today.city);
			
									var flag = 0;
									for(var k in future) {
										futureSpans.eq(flag).text(toNomalDate(k.substring(4)));
			
										futureItems.eq(flag).text(future[k].temperature + '--' + future[k].weather + '--' + future[k].wind);
			
										flag++;
									}
								} else {
									alert(data.reason + ' ' + ' 请查证后再输入。');
								}
			
							}
						});
											
			}
		});
	});
});

function toNomalDate(str) {
	return str.substring(0, 4) + '年' + str.substring(4, 6) + '月' + str.substring(6) + '日';
}
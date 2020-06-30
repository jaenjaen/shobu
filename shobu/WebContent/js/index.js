$(function() {
	$.ajax({
		type:'post',
		url:'/main.do',
		dataType:'json',
		
		success:function(r){
			console.log("Main.jsp get Json");
			console.log(r.matchs.length);
			if (r.matchs.length == 0) {
				$(".carousel-indicators").append('<li data-target="#myCarousel" data-slide-to=0></li>');
				$(".carousel-inner").append('<div class="item active"> <table class="game"><tr><th>오늘은 경기가 없습니다.</th></tr></table></div>');
			}
			
			else{
				$.each(r.matchs,function(idx,match){
					
					//build indicator
					if(idx==0){
						$(".carousel-indicators").append('<li data-target="#myCarousel" data-slide-to="'+idx+'" class="active"></li>');
					}else{
						$(".carousel-indicators").append('<li data-target="#myCarousel" data-slide-to="'+idx+'"></li>');
					}
					
					//input carousel-inner
					//변경시 String만 수정
					var string = '<table class="game">'+
								 	'<tr>'+
								 		'<td class="away"><img class="teamlogo" src="'+match.awayImg+'"></td>'+
								 		'<td class="graph">'+
								 			'<section class="bar-graph bar-graph-horizontal bar-graph-one">'+
								 				'<div class="bar-away">'+
								 					'<div class="bar" data-percentage='+match.awayRatio+'% style="width:'+match.awayRatio+';background-color:'
								 					+match.awayColor+'"></div>'+
								 				'</div>'+
								 				'<div class="bar-home">'+
								 					'<div class="bar" data-percentage='+match.homeRatio+'% style="width:'+match.homeRatio+';background-color:'
								 					+match.homeColor+'"></div>'+
								 				'</div>'+
								 			'</section> </td>'+
								 		'<td class="home"><img class="teamlogo" src='+match.homeImg+'></td>'+
								 	'</tr>'+
								 	'<tr class ="bold">'+
								 		'<td>'+match.awayPitcher+'</td> <td>'+match.place+'<br>'+match.time+'</td> <td>'+match.homePitcher+'</td>'+
								 	'</tr>'+
								 '</table>'+
								'</div>';
				
					if(idx==0) $(".carousel-inner").append('<div class="item active">'+string+'</div>');
					else $(".carousel-inner").append('<div class="item">'+string+'</div>');
					
					
				});//~Match each
			}
			
			$.each(r.teams,function(index,teams){
				var rate = teams.rate;
				var distance = teams.distance;
				var teamAVG = teams.teamAVG;
				var teamEra = teams.teamEra;
				
				$("#teamrank").append("<tr>");
				$("#teamrank").append("<td>"+teams.ranking+"</td>");
				$("#teamrank").append("<td>"+teams.teamName+"</td>");
				$("#teamrank").append("<td>"+teams.win+"</td>");
				$("#teamrank").append("<td>"+teams.draw+"</td>");
				$("#teamrank").append("<td>"+teams.lose+"</td>");
				$("#teamrank").append("<td>"+rate.toFixed(3)+"</td>");
				$("#teamrank").append("<td>"+distance.toFixed(1)+"</td>");
				$("#teamrank").append("<td>"+teamAVG.toFixed(3)+"</td>");
				$("#teamrank").append("<td>"+teamEra.toFixed(2)+"</td>");
				$("#teamrank").append("<td>"+teams.stream+"</td>");
				$("#teamrank").append("<td>"+teams.games10+"</td>");
				$("#teamrank").append("</tr>");
			});//~Team each
			
		}//~callback
		
	});//~ajax
})//~reday
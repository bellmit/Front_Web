/*
author:yipin,
name:calculator 
装修计算器工具类
*/

define(function(){
	return {
		
			/*
			墙砖(瓷砖)计算器
			*/
			calBrick:function(params){
					/**
         * 开始计算
         * 用砖数量（块数）=[（房间的长度÷砖长）×（房间高度÷砖宽）×2+ 
         *（房间的宽度÷砖长）×（房间高度÷砖宽）×2 —（窗户的长度÷砖长）×
         *（窗户的宽度÷砖宽）×个数—（门的长度÷砖长）×（门的宽度÷砖宽）×个数]×1.05
         */
				
					var bricknum = 0,
							data=this.getData(params);
					
					bricknum = parseFloat((data.room_long * 1000 / data.brick_long) * (data.room_height * 1000 / data.brick_width) * 2);
					bricknum += parseFloat((data.room_width * 1000 / data.brick_long) * (data.room_height * 1000 / data.brick_width) * 2);
					bricknum -= parseFloat((data.window_height * 1000 / data.brick_long) * (data.window_width * 1000 / data.brick_width) * data.window_num);
					bricknum -= parseFloat((data.door_height * 1000 / data.brick_long) * (data.door_width * 1000 / data.brick_width) * data.door_num);
	
					bricknum = Math.round(bricknum * 1.06);
	
					return bricknum;
				
			},
			/*地砖计算器*/
			calFloorBrick:function(params){
					var bricknum = 0,
							rate = 1.05,
							data=this.getData(params);
					/**
					 * 开始计算
					 * 用砖数量（块数）=（房间的长度÷砖长）×（房间宽度÷砖宽）×1.05
					 */
	
					bricknum = Math.round((data.room_long * 1000 / data.floorbrick_long) * (data.room_width * 1000 / data.floorbrick_width) * rate);
					
					return bricknum;
			},
			/*壁纸计算器*/
			calWallpaper:function(params){
					var wallpapernum = 0,
							rate = 1.1,
							data=this.getData(params);
					/**
					 * 开始计算
					 * 壁纸用量(卷)＝房间周长×房间高度×1.1÷每卷平米数
					 */
					wallpapernum = Math.round(((parseFloat(data.room_long) + parseFloat(data.room_width)) * 2 * data.room_height * rate) / data.wallpaperpm);
					
					return wallpapernum;
			},
			/*涂料计算器*/
			calPaint:function(params){
					var paintnum = 0,
							data=this.getData(params);

					paintnum = parseFloat((data.room_long + data.room_width) * 2 * data.room_height + data.room_long * data.room_width);
					paintnum -= parseFloat(data.window_height * data.window_width * data.window_num);

					
					paintnum -= parseFloat(data.door_height * data.door_width * data.door_num);
					
	
					paintnum = (Math.round(paintnum / data.paintrate * 100)) / 100;
					
					return  isNaN(paintnum)?0:paintnum;
			},
			/*窗帘计算器*/
			calCurtain:function(params){
					var draperynum = 0,
							data=this.getData(params);
					/** 
					 * 开始计算
					 * 窗帘所需布料（米）= [ （窗户宽+0.15米×2）×2] ÷ 布宽×（0.15米+窗户高+0.5米+0.2米）
					 */
					draperynum = Math.round((data.window_width + 0.15 * 2) * 2 / data.drapery * (0.15 + data.window_height + 0.5 + 0.2));
					
					return draperynum;
			},
			/*地板计算器*/
			calFloor:function(params){
					var floornum = 0,
							data=this.getData(params),
							rate = data.floor_type;
						
        floornum = Math.round((data.room_long * 1000 / data.floor_long) * (data.room_width * 1000 / data.floor_width) * rate);
				return floornum;
			},
			/*
			字符串类型转换为浮点型
			*/
			getData:function(params){
					var data={};
					for(var i in params){
						data[i]=parseFloat(params[i]);
					};
					return data;
			}
			

			
	}
});

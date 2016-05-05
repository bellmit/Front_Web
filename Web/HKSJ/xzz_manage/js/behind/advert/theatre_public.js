//one:所属一级类型 two:所属二级类型
var themeJson=[
 {"id":"27","name":"主页-微视频-热门精选","one":"201508131310570453"},   
 {"id":"29","name":"主页-电影-热门精选","one":"201508131311081856"},
 {"id":"30","name":"主页-电视剧-热门精选","one":"201508131311192166"}, 
 {"id":"31","name":"主页-动漫-热门精选","one":"201508131311344768"},
 {"id":"1","name":"主页-微视频","one":"201508131310570453"},
 {"id":"2","name":"主页-电影","one":"201508131311081856"},
 {"id":"3","name":"主页-电视剧","one":"201508131311192166"},
 {"id":"4","name":"主页-动漫","one":"201508131311344768"},
 {"id":"5","name":"主页-专辑","one":"1"},
 {"id":"6","name":"微视频-原创搞笑","one":"201508131310570453"},
 {"id":"7","name":"微视频-奇闻趣事","one":"201508131310570453"},
 {"id":"8","name":"微视频-人物","one":"201508131310570453"},
 {"id":"9","name":"微视频-自然","one":"201508131310570453"},
 {"id":"10","name":"微视频-旅行","one":"201508131310570453"},
 {"id":"11","name":"微视频-运动","one":"201508131310570453"},
 {"id":"12","name":"电影-热门推荐","one":"201508131311081856"},
 {"id":"13","name":"电影-院线强档","one":"201508131311081856"},
 {"id":"14","name":"电影-轻松剧场","one":"201508131311081856"},
 {"id":"15","name":"电影-激情剧场","one":"201508131311081856"},
 {"id":"16","name":"电影-经典影片","one":"201508131311081856"},
 {"id":"17","name":"电视剧-热门推荐","one":"201508131311192166"},
 {"id":"18","name":"电视剧-黄金剧场","one":"201508131311192166"},
 {"id":"19","name":"电视剧-国内","one":"201508131311192166"},
 {"id":"20","name":"电视剧-海外","one":"201508131311192166"},
 {"id":"21","name":"电视剧-经典电视","one":"201508131311192166"},
 {"id":"22","name":"动漫-新番剧场","one":"201508131311344768"},
 {"id":"23","name":"动漫-日韩","one":"201508131311344768"},
 {"id":"24","name":"动漫-国产","one":"201508131311344768"},
 {"id":"25","name":"动漫-欧美","one":"201508131311344768"},
 {"id":"26","name":"动漫-经典动漫","one":"201508131311344768"},
 {"id":"28","name":"专辑-推荐专辑","one":"1"}
 ];
//根据id标签，获得所属的一级类型、二级类型
function getOneById(id)
{
	var ot= new Array();
	for (var i = 0; i < themeJson.length; i++)
	{
		if(themeJson[i].id==id)
		{
			ot[0]=themeJson[i].one;
			ot[1]=themeJson[i].two;
		}
	}
	return ot;
}
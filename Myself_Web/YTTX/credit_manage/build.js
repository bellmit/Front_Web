({ 
	appDir:'',/*根目录，此目录下的文件都会被复制到dir目录下*/
	dir:'mobile/build/serve',/*输出目录*/
	baseUrl:'mobile/src/serve',/*查找文件的锚点*/
	modules:[{ name:'serve'}],/*模块名称*/
	fileExclusionRegExp: /^(r|build)\.js|.*\.(less|css|png|jpg|jpeg|gif|html|eot|svg|ttf|woff|json)$/,/*不要复制的文件*/
	optimizeCss:'none',/*是否优化css文件*/
	removeCombined:false,/*是否删除已合并文件*/
	paths:{
		'jquery':'../../../js/lib/jquery/jquery',
		'jquery_mobile':'../../../js/lib/jquery/jquery-mobile',
		'slide':'../../js/widgets/slide',
		'imglist':'../../js/widgets/imglist'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'jquery_mobile':{
			deps:['jquery']
		}
	}
}) 


/*
路径：D:\apm_serve\www\htdocs\Myself_Web\YTTX\credit_manage

命令： node r.js -o build.js


*/
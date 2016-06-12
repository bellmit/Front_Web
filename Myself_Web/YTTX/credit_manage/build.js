({ 
	appDir:'',/*根目录，此目录下的文件都会被复制到dir目录下*/
	dir:'mobile/js/serve',/*输出目录*/
	baseUrl:'mobile/src/serve',/*查找文件的锚点*/
	modules:[{ name:'serve'}],/*模块名称*/
	fileExclusionRegExp: /^(r|build)\.js|(lib|widgets)|.*\.(less|css|png|jpg|jpeg|gif|html|eot|svg|ttf|woff|json)$/,/*不要复制的文件*/
	optimizeCss:'none',/*是否优化css文件*/
	removeCombined:true,/*是否删除已合并文件*/
	optimize:"uglify",/*压缩方式*/
	useStrict: false,/*是否开启严格模式*/
	paths:{
		'jquery':'../../../js/lib/jquery/jquery',
		'jquery_mobile':'../../../js/lib/jquery/jquery-mobile',
		'slide':'../../js/widgets/slide',
		'grid':'../../js/widgets/grid'
	},
	shim:{
		'jquery_mobile':{
			deps:['jquery']
		}
	}
}) 


/*
路径：D:\apm_serve\www\htdocs\Myself_Web\YTTX\credit_manage

命令： node r.js -o build.js


*/
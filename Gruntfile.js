
;module.exports = function(grunt){

	/*//配置端口
	var flushPort=35729;
	//导入刷新模块
	var flushModule = require('connect-livereload')({
		port:flushPort
	});
	//使用中间件
	var flushMv = function(connect, options) {
		return [
			// 把脚本，注入到静态文件中
			flushModule,
			// 静态文件服务器的路径
			connect.static(options.base[0]),
			// 启用目录浏览(相当于IIS中的目录浏览)
			connect.directory(options.base[0])
		];
	};*/

	//获取package.json的信息
	var pkg=grunt.file.readJSON('package.json'),
		web_url=(function(pkg){
				if(pkg.platform&&pkg.platform!==''){
					return pkg.base_path+'/'+pkg.web_path+'/'+pkg.project+'/'+pkg.name+'/'+pkg.platform+'/';
				}else{
					return pkg.base_path+'/'+pkg.web_path+'/'+pkg.project+'/'+pkg.name+'/';
				}
			})(pkg),
		bannerstr='/**\nname:'+pkg.name+' / '+(function(pkg){
			var name=pkg.module_name;
			if(name.indexOf('/')!==-1){
				var tempname=name.split('/');
				return tempname[tempname.length-1];
			}else{
				return name;
			}
		})(pkg)+';\n author:'+pkg.author+';\n date:'+grunt.template.today("yyyy-mm-dd")+';\n version:'+pkg.version+'**/\n';

	//任务配置,所以插件的配置信息
	grunt.initConfig({
		//服务器
		/*connect:{
			options: {
				// 服务器端口号
				port: 90,
				// 服务器地址(可以使用主机名localhost，也能使用IP)
				hostname: '127.0.0.1',
				// 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
				base: '.'
			},
			livereload: {
				options: {
					// 通过LiveReload脚本，让页面重新加载。
					middleware:flushMv
				},
				files:(function(pkg,web_url){
					return doFilter({package:pkg,web_url:web_url},'js_src','.js');
				})(pkg,web_url)
			}

		},*/
		
		
		//css语法检查
		csslint:{
			//检查生成的css文件目录文件
			options:{
				csslintrc:'.csslintrc'
			},
			src:(function(pkg,web_url){
					return doFilter({package:pkg,web_url:web_url},'less_dest','.css');
				})(pkg,web_url)
		},
		
		//配置requirejs
		requirejs: {
		  compile: {
			options: {
			  baseUrl:web_url+"/"+pkg.js_src,
			  mainConfigFile:(function(pkg,web_url){
					return doFilter({package:pkg,web_url:web_url},'js_src','.js');
				})(pkg,web_url),
			  include:(function(pkg,web_url){
					return doFilter({package:pkg,web_url:web_url},'js_src','.js');
				})(pkg,web_url),
			  out:(function(pkg,web_url){
					return doFilter({package:pkg,web_url:web_url},'js_dest','.js');
				})(pkg,web_url)
			}
		  }
		},
		
		//定义js语法检查（看配置信息）
		jshint:{
			options:{
				jshintrc:'.jshintrc'
			},
			//检查源目录文件和生成目录文件
			all:(function(pkg,web_url){
					return doFilter({package:pkg,web_url:web_url},['js_src','js_dest'],'.css');
				})(pkg,web_url)
		},


		//定义css图片压缩输出（一次性任务）
		imagemin:{
			dynamic:{
				options:{
					optimizationLevel:3
				},
				files:[{
					expand:true,//开启动态扩展
					cwd:web_url+pkg.image_src,//当前工作路径
					src:['**/*.{png,jpg,gif,jpeg}'],//要处理的图片格式
					dest:web_url+pkg.image_dest//输出目录
				}]
			}
		},

		//定义css图片拼合
		sprite:{
			all:{
				src:web_url+pkg.image_src+'/*.png',
				dest:web_url+pkg.image_dest+'/credit_state.png',
				destCss:web_url+'img_sprite/credit_state.css'
			}
		},
		
		//less编译生成css
		less:{
			 build: {
				 src:(function(pkg,web_url){
						return doFilter({package:pkg,web_url:web_url},'less_src','.less');
					 })(pkg,web_url),
				 dest:(function(pkg,web_url){
						return doFilter({package:pkg,web_url:web_url},'less_dest','.css');
					 })(pkg,web_url)
			 },
			 dev: {
				 options: {
					 compress: true,
					 yuicompress:false
			 	 }
			}
		},


		//使用less时为定义css压缩。（没有使用less时为合并（一次性任务））
		cssmin:{
			options:{
				keepSpecialComments:0,/* 移除 CSS文件中的所有注释 */
				shorthandCompacting:false,
				roundingPrecision:-1
			},
			target:{
				files:[{
					expand:true,//开启动态扩展
					cwd:web_url+pkg.less_dest,//当前工作路径css/
					src:['*.css'],
					dest:web_url+pkg.less_dest,//css/
					ext:'.css'//后缀名
				}]

			}
		},
		
		//合并模块化依赖，目前使用r.js合并压缩require模块
		

		//定义合并js任务（情况比较少）,暂时不做css合并
		concat:{
			options:{
				stripBanners:true,
				separator:';',//分割符
				banner:bannerstr
			},
			dist:{
				//源目录 to do,合并文件时需要看情况而定
				src:(function(web_url){
					var names=['zepto','event','touch','callbacks','ajax','form','selector','fx','fx_methods','assets','data','deferred','detect','gesture','ios3','stack','ie'],result=[];
					for(var i=0,len=names.length;i<len;i++){
						result.push(web_url+'js/zepto/'+names[i]+'.js');
						
					}
					return result;
				})(web_url),
				//生成目录
				dest:(function(web_url){
					var result=web_url+'js/lib/zepto/zepto.js';
					return result;
				})(web_url)
			}
		},



		//定义js压缩任务gulify
		uglify:{
			options:{
				//生成版权，名称，描述等信息
				stripBanners:true,
				banner:bannerstr
			},
			build:{
				src:(function(pkg,web_url){
					return doFilter({package:pkg,web_url:web_url},'js_dest','.js');
				})(pkg,web_url),
				dest:(function(pkg,web_url){
					return doFilter({package:pkg,web_url:web_url},'js_dest','.js');
				})(pkg,web_url)
			}
		},

		//定义监控文件变化
		watch:{
			/*client: {
				// 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
				options: {
					livereload:flushPort
				},
				// '**' 表示包含所有的子目录
				// '*' 表示包含所有的文件
				files:(function(pkg,web_url){
					return doFilter({package:pkg,web_url:web_url},'js_src','.js');
				})(pkg,web_url)',
			}*/
			less:{
				files:[web_url+pkg.less_src+'/**/*.less'],
				tasks:['less','cssmin'],
				options:{
					spawn:false,
					debounceDelay: 250,
					//配置自动刷新程序
					livereload:true
				}
			},
			scripts:{
				files:(function(pkg,web_url){
						  return doFilter({package:pkg,web_url:web_url},'js_src','.js');
					  })(pkg,web_url),
				tasks:['uglify'],
				options:{
					spawn:false,
					debounceDelay: 250,
					//配置自动刷新程序
					livereload:true
				}
			}
		}

	});
	
	
	//抽离公共处理函数
	function doFilter(sou,str,suffix){
		var spkg,surl,sname,sstr,res;
		//设置源
		if(!sou){
			spkg=grunt.file.readJSON('package.json');
			if(spkg.platform&&platform!==''){
				surl=spkg.base_path+'/'+spkg.web_path+'/'+spkg.project+'/'+spkg.name+'/'+spkg.platform+'/';
			}else{
				surl=spkg.base_path+'/'+spkg.web_path+'/'+spkg.project+'/'+spkg.name+'/';
			}
		}else{
			spkg=sou.package;
			surl=sou.web_url;
		}
		//设置名称
		sname=spkg.module_name;
		//设置路径
		if(typeof str==='string'){
			sstr=spkg[str];
		}else{
			sstr=[];
			for(var i=0;i<str.length;i++){
				sstr.push(spkg[str[i]]);
			}
		}
		//过滤
		if(sname===''){
			if(typeof sstr==='string'){
				res=surl+sstr+'/'+sname+suffix;
			}else{
				res=[];
				(function(){
					var j=0,
						len=sstr.length;
					for(j;j<len;j++){
						res.push(surl+sstr[j]+'/'+sname+suffix);
					}
				}());
			}
			return res;
		}else{
			//filter
			if(sname.indexOf('/')!==-1){
				var tempmodule=sname.split('/'),
				filename=tempmodule[tempmodule.length-1];
				tempmodule.pop();
				if(typeof sstr==='string'){
					if(suffix==='.css'){
						res=surl+sstr+'/'+filename+suffix;
					}else{
						res=surl+sstr+'/'+tempmodule.join('/')+'/'+filename+suffix;
					}
				}else{
					res=[];
					(function(){
						var j=0,
							len=sstr.length;
							if(suffix==='.css'){
								for(j;j<len;j++){
									res.push(surl+sstr[j]+'/'+filename+suffix);
								}
							}else{
								for(j;j<len;j++){
									res.push(surl+sstr[j]+'/'+tempmodule.join('/')+'/'+filename+suffix);
								}
							}
					}());
				}
				return res;
			}else{
				if(typeof sstr==='string'){
					if(suffix==='.css'){
						res=surl+sstr+'/'+spkg.module_name+suffix;
					}else{
						res=surl+sstr+'/'+spkg.module_name+'/'+spkg.module_name+suffix;
					}
				}else{
					res=[];
					(function(){
						var j=0,
							len=sstr.length;
							if(suffix==='.css'){
								for(j;j<len;j++){
									res.push(surl+sstr[j]+'/'+spkg.module_name+suffix);
								}
							}else{
								for(j;j<len;j++){
									res.push(surl+sstr[j]+'/'+spkg.module_name+'/'+spkg.module_name+suffix);
								}

							}
					}());
				}
				return res;
			}
		}
		
	}


	//导入任务所需的依赖支持服务
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-connect');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	//grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	

	//集成单个模块任务
	
	
	/*grunt.registerTask('default',"合并js",function(){
		grunt.task.run(['concat',]);
	});*/
	
	
	
	/*grunt.registerTask('default',"拼合图片",function(){
		grunt.task.run(['sprite',]);
	});*/
	

	
	grunt.registerTask('default',"less编译生成css并压缩",function(){
		grunt.task.run(['less','cssmin']);
	});

	
	/*grunt.registerTask('default',"less编译生成css并压缩,同时实时监控",function(){
		grunt.task.run(['less','cssmin','watch:less']);
	});*/
	
	
	/*grunt.registerTask('default',"监控js压缩",function(){
		grunt.task.run(['uglify','watch']);
	});*/
	
	/*grunt.registerTask('default',"js压缩",function(){
		grunt.task.run(['uglify']);
	});*/
	
	


};



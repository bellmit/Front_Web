
;module.exports = function(grunt){

	//配置端口
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
	};

	//获取package.json的信息
	var pkg=grunt.file.readJSON('package.json'),
		web_url=pkg.base_path+'/'+pkg.web_path+'/'+pkg.project+'/'+pkg.name+'/';

	//任务配置,所以插件的配置信息
	grunt.initConfig({
		//服务器
		connect:{
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
				files:(function(){
					if(pkg.module_name===''){
						return web_url+'/'+pkg.js_src+'/'+pkg.module_name+'.js';
					}else{
						return web_url+'/'+pkg.js_src+'/'+pkg.module_name+'/'+pkg.module_name+'.js';
					}
				}())
			}

		},
		
		
		//css语法检查
		/*csslint:{
			//检查生成的css文件目录文件
			options:{
				csslintrc:'.csslintrc'
			},
			src:['<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.less_dest%>/!**!/!*.css']
		},*/
		
		//定义js语法检查（看配置信息）
		/*jshint:{
			options:{
				jshintrc:'.jshintrc'
			},
			//检查源目录文件和生成目录文件
			all:['<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.js_src%>/!**!/!*.js','<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.js_dest%>/!**!/!*.js']
		},*/


		//定义css图片压缩输出（一次性任务）
		/*imagemin:{
			dynamic:{
				options:{
					optimizationLevel:3
				},
				files:[{
					expand:true,//开启动态扩展
					cwd:'<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.image_src%>/',//当前工作路径
					src:['**!/!*.{png,jpg,gif,jpeg}'],//要处理的图片格式
					dest:'<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.image_dest%>/'//输出目录
				}]
			}
		},*/

		//定义css图片拼合（一次性任务）
		/*sprite:{
			all:{
				src:'<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.image_src%>/!*.png',
				dest:'<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.image_dest%>/icon.png',
				destCss:'<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.less_dest%>/icon.png.css'
			}
		},*/
		
		//less编译生成css
		/*less:{
			development:{
				options:{
					paths:[]
				}
			},
			production:{
				
				
				
			}
		},*/


		//定义css合并（一次性任务）
		/*cssmin:{
			options:{
				keepSpecialComments:0,/!* 移除 CSS文件中的所有注释 *!/
				shorthandCompacting:false,
				roundingPrecision:-1
			},
			target:{
				files:[{
					expand:true,//开启动态扩展
					cwd:'<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.less_dest%>/',//当前工作路径css/
					src:['*.css'],
					dest:'<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.less_dest%>/',//css/
					ext:'.css'//后缀名
				}]

			}
		},*/


		

		//定义合并js任务（情况比较少）,暂时不做css合并
		/*concat:{
			css:{
				//to do 根据实际需求填充相关配置
			},
			js:{
				options:{
					stripBanners:true,
					separator:';',//分割符
					banner:'/!*\n name:<%=pkg.name%>\/<%=pkg.module_name%>;\n author:<%=pkg.author%>;\n date:<%=grunt.template.today("yyyy-mm-dd")%>;\nversion:<%=pkg.version%>;\n*!/\n'
				},
				dist:{
					//源目录 to do,合并文件时需要看情况而定
					src:(function(){
						var minjs='<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.js_src%>/';
						if(pkg.module_name===''){
							minjs+='<%=pkg.module_name%>.js';
						}else {
							minjs+='<%=pkg.module_name%>/<%=pkg.module_name%>.js';
						}
						return minjs;
					}()),
					//生成目录
					dest:(function(){
						var minjs='<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.js_dest%>/';
						if(pkg.module_name===''){
							minjs+='<%=pkg.module_name%>.js';
						}else {
							minjs+='<%=pkg.module_name%>/<%=pkg.module_name%>.js';
						}
						return minjs;
					}())
				}
			},
		},*/



		//定义js压缩任务gulify
		uglify:{
			options:{
				//生成版权，名称，描述等信息
				stripBanners:true,
				banner:'/*\n name:<%=pkg.name%>\/<%=pkg.module_name%>;\n author:<%=pkg.author%>;\n date:<%=grunt.template.today("yyyy-mm-dd")%>;\nversion:<%=pkg.version%>;\n*/\n'
			},
			my_target:{},
			build:{
				src:(function(){
					if(pkg.module_name===''){
						return web_url+'/'+pkg.js_src+'/'+pkg.module_name+'.js';
					}else{
						return web_url+'/'+pkg.js_src+'/'+pkg.module_name+'/'+pkg.module_name+'.js';
					}
				}()),
				dest:(function(){
					if(pkg.module_name===''){
						return web_url+'/'+pkg.js_src+'/'+pkg.module_name+'.js';
					}else{
						return web_url+'/'+pkg.js_dest+'/'+pkg.module_name+'/'+pkg.module_name+'.js';
					}
				}())
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
				files:'<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.js_src%>/<%=pkg.module_name%>/<%=pkg.module_name%>.js',
			}*/
			scripts:{
				files:(function(){
					console.log(web_url);
					if(pkg.module_name===''){
						return web_url+'/'+pkg.js_src+'/'+pkg.module_name+'.js';
					}else{
						return web_url+'/'+pkg.js_src+'/'+pkg.module_name+'/'+pkg.module_name+'.js';
					}
				}()),
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


	//导入任务所需的依赖支持服务
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	
	/*
	
	grunt.registerTask('default', ['csslint', 'jshint', 'imagemin', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('dev', ['csslint', 'jshint']);
    grunt.registerTask('dest', ['imagemin', 'concat:css', 'cssmin', 'uglify:minjs']);
	
	*/



	//告诉grunt当我们在终端中输入grunt时需要做些什么（依赖顺序）
	//grunt.registerTask('default',['jshint']);//javascript语法检查
	//grunt.registerTask('default',['imagemin']);//图片资源优化
	//grunt.registerTask('default',['uglify']);//Javascript压缩
	//grunt.registerTask('default',['sprite']);//图片资源拼合
	//grunt.registerTask('default',['watch']);//资源改变触发器监听


	/*grunt.registerTask('default',"javascript压缩",function(){
		grunt.task.run(['uglify','watch']);
	});*/
	
	grunt.registerTask('default',['watch']);



};



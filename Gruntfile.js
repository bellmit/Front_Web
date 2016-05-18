
;module.exports = function(grunt){
	//任务配置,所以插件的配置信息
	grunt.initConfig({
		//获取package.json的信息
		pkg:grunt.file.readJSON('package.json'),


		//定义css图片压缩输出（一次性任务）
		imagemin:{
			dynamic:{
				options:{
					optimizationLevel:3
				},
				files:[{
					expand:true,//开启动态扩展
					cwd:'img/',//当前工作路径
					src:['**/*.{png,jpg,gif,jpeg}'],//要处理的图片格式
					dest:'images/'//输出目录
				}]
			}
		},

		//定义css图片拼合（一次性任务）
		sprite:{
			all:{
				src:'img/*.png',
				dest:'images/icon.png',
				destCss:'css/icon.png.css'
			}
		},


		//定义css合并（一次性任务）
		cssmin:{
			options:{
				shorthandCompacting:false,
				roundingPrecision:-1
			},
			target:{
				files:[{
					expand:true,//开启动态扩展
					cwd:'css/',
					src:['*.css','!*.min.css'],
					dest:'css/',
					ext:'.min.css'
				}]

			}
		},


		//定义js语法检查（看配置信息）
		jshint:{
			build:['Gruntfile.js','src/**/*.js','js/**/*.js'],
			options:{
				jshintrc:'.jshintrc'
			}
		},

		//定义合并js任务
		concat:{
			options:{
				stripBanners:true,
				separator:';',//分割符
				banner:'/*\n name:<%=pkg.name%>\/<%=pkg.module_name%>;\n author:<%=pkg.author%>;\n date:<%=grunt.template.today("yyyy-mm-dd")%>;\nversion:<%=pkg.version%>;\n*/\n'
			},
			dist:{
				src:['src/*.js'],//源目录
				dest:'js/*.js'//生成目录
			}
		},



		//定义js压缩任务gulify
		uglify:{
			options:{
				//生成版权，名称，描述等信息
				stripBanners:true,
				banner:'/*\n name:<%=pkg.name%>\/<%=pkg.module_name%>;\n author:<%=pkg.author%>;\n date:<%=grunt.template.today("yyyy-mm-dd")%>;\nversion:<%=pkg.version%>;\n*/\n'
			},
			my_target:{},
			build:{
				src:'<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.js_src%>/<%=pkg.module_name%>/<%=pkg.module_name%>.js',
				dest:'<%=pkg.base_path%>/<%=pkg.web_path%>/<%=pkg.project%>/<%=pkg.name%>/<%=pkg.js_dest%>/<%=pkg.module_name%>/<%=pkg.module_name%>.js'
			}
		},

		//定义监控文件变化
		watch:{
			build:{
				files:['src/**/*.js'],
				tasks:['uglify'],
				options:{
					spawn:false
				}
			}
		}

	});


	//导入任务所需的依赖支持服务
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	//grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');



	//告诉grunt当我们在终端中输入grunt时需要做些什么（依赖顺序）
	//grunt.registerTask('default',['jshint']);//javascript语法检查
	//grunt.registerTask('default',['imagemin']);//图片资源优化
	//grunt.registerTask('default',['uglify']);//Javascript压缩
	//grunt.registerTask('default',['sprite']);//图片资源拼合
	//grunt.registerTask('default',['watch']);//资源改变触发器监听


	grunt.registerTask('default',"javascript压缩",function(){
		grunt.task.run(['uglify','watch']);
	});



};
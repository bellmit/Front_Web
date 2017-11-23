;module.exports = function (grunt) {

    var configfile = 'package_mall.json';

    /*//���ö˿�
     var flushPort=35729;
     //����ˢ��ģ��
     var flushModule = require('connect-livereload')({
     port:flushPort
     });
     //ʹ���м��
     var flushMv = function(connect, options) {
     return [
     // �ѽű���ע�뵽��̬�ļ���
     flushModule,
     // ��̬�ļ���������·��
     connect.static(options.base[0]),
     // ����Ŀ¼���(�൱��IIS�е�Ŀ¼���)
     connect.directory(options.base[0])
     ];
     };*/

    //��ȡpackage.json����Ϣ
    var pkg = grunt.file.readJSON(configfile),
        web_url = (function (pkg) {
            if (pkg.platform && pkg.platform !== '') {
                return pkg.base_path + '/' + pkg.web_path + '/' + pkg.project + '/' + pkg.name + '/' + pkg.platform + '/';
            } else {
                return pkg.base_path + '/' + pkg.web_path + '/' + pkg.project + '/' + pkg.name + '/';
            }
        })(pkg),
        bannerstr = '/**\nname:' + pkg.name + ' / ' + (function (pkg) {
                var name = pkg.source_name;
                if (name.indexOf('/') !== -1) {
                    var tempname = name.split('/');
                    return tempname[tempname.length - 1];
                } else {
                    return name;
                }
            })(pkg) + ';\n author:' + pkg.author + ';\n date:' + grunt.template.today("yyyy-mm-dd") + ';\n version:' + pkg.version + '**/\n';

    //��������,���Բ����������Ϣ
    grunt.initConfig({
        //css�﷨���
        csslint: {
            //������ɵ�css�ļ�Ŀ¼�ļ�
            options: {
                csslintrc: '.csslintrc'
            },
            src: (function (pkg, web_url) {
                return doFilter({package: pkg, web_url: web_url}, 'less_dest', '.css');
            })(pkg, web_url)
        },


        //����js�﷨��飨��������Ϣ��
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            //���ԴĿ¼�ļ�������Ŀ¼�ļ�
            all: (function (pkg, web_url) {
                return doFilter({package: pkg, web_url: web_url}, ['js_src', 'js_dest'], '.js');
            })(pkg, web_url)
        },


        //����cssͼƬѹ�������һ��������
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,//������̬��չ
                    cwd: web_url + pkg.image_src,//��ǰ����·��
                    src: ['**/*.{png,jpg,gif,jpeg}'],//Ҫ�����ͼƬ��ʽ
                    dest: web_url + pkg.image_dest//���Ŀ¼
                }]
            }
        },

        //����cssͼƬƴ��
        sprite: {
            all: {
                src: web_url + pkg.image_src + '/*.png',
                dest: web_url + pkg.image_dest + '/mini_icon.png',
                destCss: web_url + 'css/admin_mini.css'
            }
        },

        //less��������css
        less: {
            build: {
                src: (function (pkg, web_url) {
                    return doFilter({package: pkg, web_url: web_url}, 'less_src', '.less');
                })(pkg, web_url),
                dest: (function (pkg, web_url) {
                    return doFilter({package: pkg, web_url: web_url}, 'less_dest', '.css');
                })(pkg, web_url)
            },
            dev: {
                options: {
                    compress: true,
                    yuicompress: false
                }
            }
        },


        //ʹ��lessʱΪ����cssѹ������û��ʹ��lessʱΪ�ϲ���һ�������񣩣�
        cssmin: {
            options: {
                keepSpecialComments: 0, /* �Ƴ� CSS�ļ��е�����ע�� */
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,//������̬��չ
                    cwd: web_url + pkg.less_dest,//��ǰ����·��css/
                    src: ['*.css'],
                    dest: web_url + pkg.less_dest,//css/
                    ext: '.css'//��׺��
                }]

            }
        },

        //�ϲ�ģ�黯������Ŀǰʹ��r.js�ϲ�ѹ��requireģ��


        //����ϲ�js��������Ƚ��٣�,��ʱ����css�ϲ�
        concat: {
            options: {
                stripBanners: true,
                separator: ';',//�ָ��
                banner: bannerstr
            },
            dist: {
                //ԴĿ¼ to do,�ϲ��ļ�ʱ��Ҫ���������
                src: (function (web_url) {
                    //ѹ��zepto
                    var names = ['zepto', 'event', 'ie', 'touch'];
                    /*var names=['zepto','event','ajax','form','ie','detect','fx','fx_methods','assets','data','deferred','callbacks','selector','touch','gesture','stack','ios3'];*/
                    /* //ѹ��zepto var names=['zepto','event','touch','callbacks','ajax','form','selector','fx','fx_methods','assets','data','deferred','detect','gesture','ios3','stack','ie'];*/
                    //ѹ����̨js
                    /*names=['bootstrap','tweenmax','resizeable','joinable','api','toggles','toastr','dialog']*/
                    /*names=['html5shiv','respond']*/
                    /*names=['bootstrap','dialog']*/
                    /*names=['bootstrap','tweenmax','resizeable','joinable','api','toggles','toastr','dialog','moment']*/
                    /*var names = ['bootstrap', 'toastr', 'dialog', 'moment'];*/

                    var result = [];
                    for (var i = 0, len = names.length; i < len; i++) {
                        result.push(web_url + 'src/zepto/' + names[i] + '.js');
                    }
                    return result;
                })(web_url),
                //����Ŀ¼
                dest: (function (web_url) {
                    var result = web_url + 'js/zepto/zepto.js';
                    return result;
                })(web_url)
            }
        },


        //����jsѹ������gulify
        uglify: {
            options: {
                //���ɰ�Ȩ�����ƣ���������Ϣ
                stripBanners: true,
                banner: bannerstr
            },
            build: {
                src: (function (pkg, web_url) {
                    return doFilter({package: pkg, web_url: web_url}, 'js_src', '.js');
                })(pkg, web_url),
                dest: (function (pkg, web_url) {
                    return doFilter({package: pkg, web_url: web_url}, 'js_dest', '.js');
                })(pkg, web_url)
            }
        },

        //�������ļ��仯
        watch: {
            less: {
                files: [web_url + pkg.less_src + '/**/*.less'],
                tasks: ['less', 'cssmin'],
                options: {
                    spawn: false,
                    debounceDelay: 250,
                    //�����Զ�ˢ�³���
                    livereload: true
                }
            },
            scripts: {
                files: (function (pkg, web_url) {
                    return doFilter({package: pkg, web_url: web_url}, 'js_src', '.js');
                })(pkg, web_url),
                tasks: ['uglify'],
                options: {
                    spawn: false,
                    debounceDelay: 250,
                    //�����Զ�ˢ�³���
                    livereload: true
                }
            }
        }

    });


    //���빫��������
    function doFilter(sou, str, suffix) {
        //souΪ�����ļ�
        //strΪ��ԴԴ�ļ����������ļ�
        //�����ļ������ͼ���׺
        var file, baseurl, sourcefile, buildfile, result, filename;

        //����Դ
        if (!sou) {
            file = grunt.file.readJSON(configfile);
            if (file.platform && file.platform !== '') {
                baseurl = file.base_path + '/' + file.web_path + '/' + file.project + '/' + file.name + '/' + file.platform + '/';
            } else {
                baseurl = file.base_path + '/' + file.web_path + '/' + file.project + '/' + file.name + '/';
            }
        } else {
            file = sou.package;
            baseurl = sou.web_url;
        }

        //����Դ�ļ�·��
        sourcefile = file.source_name;
        buildfile = file.build_name;


        //����·��
        if (typeof str === 'string') {
            buildfile = file[str] + '/' + buildfile;
        } else {
            buildfile = [];
            for (var i = 0; i < str.length; i++) {
                buildfile.push(file[str[i]] + '/' + buildfile);
            }
        }


        //����
        if (sourcefile.indexOf('/') !== -1) {
            //�ж��·������
            var tempmodule = sourcefile.split('/'),
                filename = tempmodule[tempmodule.length - 1];
            if (suffix === '.less') {
                tempmodule.pop();
                buildfile = buildfile + tempmodule.join('/') + '/';
            }
        } else {
            //ֻ�е���·��
            filename = sourcefile;
        }
        if (typeof buildfile === 'string') {
            result = baseurl + buildfile + filename + suffix;
        } else {
            result = [];
            (function () {
                var j = 0,
                    len = buildfile.length;
                for (j; j < len; j++) {
                    result.push(baseurl + buildfile[j] + filename + suffix);
                }
            }());
        }
        return result;
    }


    //�����������������֧�ַ���
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


    //���ɵ���ģ������


    /*grunt.registerTask('default', "�ϲ�js", function () {
     grunt.task.run(['concat']);
     });*/

    /*grunt.registerTask('default', "�ϲ�ѹ��js", function () {
        grunt.task.run(['concat', 'uglify']);
    });*/

    /*grunt.registerTask('default',"ƴ��ͼƬ",function(){
     grunt.task.run(['sprite']);
     });*/


    /*grunt.registerTask('default',"less��������css��ѹ��",function(){
     grunt.task.run(['less','cssmin']);
     });*/


    grunt.registerTask('default', "less��������css��ѹ��,ͬʱʵʱ���", function () {
        grunt.task.run(['less', 'cssmin', 'watch:less']);
    });


    /*grunt.registerTask('default', "���jsѹ��", function () {
        grunt.task.run(['uglify', 'watch']);
    });*/

    /*grunt.registerTask('default', "jsѹ��", function () {
        grunt.task.run(['uglify']);
    });*/


};



// JavaScript Document
/*!
 * Date: 2011-3-29
 * Author: musical_insect
 * Content: beautify select box by jQuery and css
*/
jQuery.fn.extend({
    beautifyselect: function (options) {
        return this.each(function () {
            new jQuery.BeautifySelect(this, options);
        });
    }
});

/* pawel maziarz: work around for ie logging */
if (!window.console) {
    var console = {
        log: function (msg) {}
    }
};

jQuery.BeautifySelect = function (selectobj, options) {
    /// <summary>
    /// beautify select
    /// </summary>
    /// <param name="selectobj" type="Dom">select object</param>
    /// <param name="options" type="object">options,format:{inputClass:selectbox,containerClass:selectbox-wrapper,hoverClass:hover,selectedClass:selected}</param>
    var opt = options || {};
    opt.inputClass = opt.inputClass || "selectbox";
    opt.containerClass = opt.containerClass || "selectbox-wrapper";
    opt.hoverClass = opt.hoverClass || "hover";
    opt.currentClass = opt.selectedClass || "selected";
    opt.debug = opt.debug || false;

    var elm_id = selectobj.id;
    var active = 0;
    var hasfocus = 0;
    //jquery object for select element
    var $select = $(selectobj);
    // jquery container object
    var $container = setupContainer(opt);
    //jquery input object 
    var $input = setupInput(opt);
    // hide select and append newly created elements
    $select.hide().before($input).before($container);

    init();

    $input.click(function (event) {
        $container.toggle();
    }).keydown(function (event) {
        switch (event.which) {
            case 38: // up
                event.preventDefault();
                moveSelect(-1);
                break;
            case 40: // down
                event.preventDefault();
                moveSelect(1);
                break;
            //case 9:  // tab                                                             
            case 13: // enter
                event.preventDefault(); // seems not working in mac !
                $('li.' + opt.hoverClass).trigger('click');
                break;
            case 27: //escape
                hideMe();
                break;
        }
    }).blur(function () {
        if ($container.is(':visible') && hasfocus > 0) {
            if (opt.debug) console.log('container visible and has focus')
        } else {
            try {
                // Workaround for ie scroll - thanks to Bernd Matzner
                if ($.browser.msie || $.browser.safari) { // check for safari too - workaround for webkit
                    if (document.activeElement.getAttribute('id').indexOf('_container') == -1) {
                        hideMe();
                    } else {
                        $input.focus();
                    }
                } else {
                    hideMe();
                }
            } catch (Error) { hideMe(); }
        }
    });

    //隐藏下拉菜单容器
    function hideMe() {
        hasfocus = 0;
        $container.hide();
    }

    //初始化下拉菜单
    function init() {
        $container.append(getSelectOptions($input.attr('id'))).hide();
    }

    //初始化下拉菜单容器并进行相关设置
    function setupContainer(options) {
        var container = document.createElement("div");
        $container = $(container);
        $container.attr('id', elm_id + '_container');
        $container.addClass(options.containerClass);
        return $container;
    }

    //初始化下拉菜单并进行相关设置
    function setupInput(options) {
        var input = document.createElement("input");
        var $input = $(input);
        $input.attr("id", elm_id + "_input");
        $input.attr("type", "text");
        $input.addClass(options.inputClass);
        $input.attr("autocomplete", "off");
        $input.attr("readonly", "readonly");
        $input.attr("tabIndex", $select.attr("tabindex")); // "I" capital is important for ie
        return $input;
    }

    //处理下拉菜单响应键盘上的上、下键
    function moveSelect(step) {
        var lis = $("li", $container);
        if (!lis || lis.length == 0) return false;
        active += step;
        //loop through list
        if (active < 0) {
            active = lis.size() - 1;
        } else if (active > lis.size() - 1) {
            active = 0;
        }
        scroll(lis, active);
        lis.removeClass(opt.hoverClass);

        $(lis[active]).addClass(opt.hoverClass);
        $input.val($(lis[active]).html());
    }

    function scroll(list, active) {
        var el = $(list[active]).get(0);
        var list = $container.get(0);
        if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
            list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
        } else if (el.offsetTop < list.scrollTop) {
            list.scrollTop = el.offsetTop;
        }
    }

    //处理当前选择中的值
    function setCurrent() {
        var li = $("li." + opt.currentClass, $container).get(0);
        var ar = ('' + li.id).split('_');
        var el = ar[ar.length - 1];
        $select.val(el);
        $input.val($(li).html());
        return true;
    }

    //获取当前选中项的索引
    function getCurrentSelected() {
        return $select.val();
    }

    //获取当前选中项的值
    function getCurrentValue() {
        return $input.val();
    }

    //获取下拉菜单的选择项
    function getSelectOptions(parentid) {
        var select_options = new Array();
        var ul = document.createElement('ul');
        $select.children('option').each(function () {
            var li = document.createElement('li');
            li.setAttribute('id', parentid + '_' + $(this).val());
            li.innerHTML = $(this).html();
            if ($(this).is(':selected')) {
                $input.val($(this).html());
                $(li).addClass(opt.currentClass);
            }
            ul.appendChild(li);
            $(li).mouseover(function (event) {
                hasfocus = 1;
                if (opt.debug) console.log('over on : ' + this.id);
                jQuery(event.target, $container).addClass(opt.hoverClass);
            }).mouseout(function (event) {
                hasfocus = -1;
                if (opt.debug) console.log('out on : ' + this.id);
                jQuery(event.target, $container).removeClass(opt.hoverClass);
            }).click(function (event) {
                var fl = $('li.' + opt.hoverClass, $container).get(0);
                if (opt.debug) console.log('click on :' + this.id);
                $('#' + elm_id + '_container' + ' li.' + opt.currentClass).removeClass(opt.currentClass);
                $(this).addClass(opt.currentClass);
                setCurrent();
                //$select.change();
                $select.get(0).blur();
                hideMe();
            });
        });
        return ul;
    }
};
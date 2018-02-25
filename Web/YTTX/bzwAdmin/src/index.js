import $ from 'jquery';
import './css/base.css';


$(function () {
    var $test=$('#test_support');

    $test.on('click',function () {
        var $this=$(this);
        $this.html('您的浏览器版本太低，请升级您的浏览器'+Math.random().toString().slice(0,10)+'......');
    });
});
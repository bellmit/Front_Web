<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="description" content="session测试">
<meta name="keywords" content="session测试">
<title>Date类测试</title>
<style type="text/css">
    .dts1{
	       box-sizing:border-box;
    	   padding:3px 10px 3px 50px;
    	   color:#666;
    	   margin:0;
    }

</style>
</head>
<body>
<p style="height:50px;line-height:50px;font-size:24px;text-align:center;color:#060;">Date测试(<span style="color:#c00;margin:0 3px 0 5px;"><?= date('Y-m-d')?></span>)</p><hr />
<?php
    //错误信息级别
    error_reporting(E_ALL);
    $xz=time();
    $mt=mktime(0,0,0,date('m',$xz),date('d',$xz)+1,date('Y',$xz));
    $zt=mktime(0,0,0,date('m',$xz),date('d',$xz)-1,date('Y',$xz));
    $vt=array(2,29,2015);
    $vr=checkdate($vt[0],$vt[1],$vt[2])?'有效':'无效';
    echo '<p class="dts1">当前时间(今天)：'.date('Y-m-d',$xz).'</p>';
    echo '<p class="dts1">明天：'.date('Y-m-d',$mt).'</p>';
    echo '<p class="dts1">昨天：'.date('Y-m-d',$zt).'</p>';
    echo '<p class="dts1">现在：'.date('H:i:s').'</p>';
    echo '<p class="dts1">校验日期('.$vt[0].'-'.$vt[1].'-'.$vt[2].')：'.$vr.'</p>';
?>
</body>











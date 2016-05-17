<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="description" content="session测试">
<meta name="keywords" content="session测试">
<title>字符串操作</title>
</head>
<body>
<?php
    $str='中国汉代以前，人们对女性只注重面部形象，到了魏晋，才开始着重于装饰。
    魏文帝喜欢打扮华丽并将头发挽成蝉翼形的妃子。唐朝是开放社会，容许袒胸露臂，崇尚的女性体态美是额宽、脸圆、体胖。唐朝以后没有定论。
    宋朝以后，大致是以观音菩萨的本貌作为女性美的高标准，各个时代所雕塑绘画的观音菩萨，就是当时审美标准的具体说明。
    Hunan sentimental words that you have heard, if the theory of beauty, after only finished the Sichuan and chongqing. 
    But Taoyuan, Hunan is famous for its beauty. Ten into the beauty of Hunan Province, 
    70% from Taoyuan. Because Taoyuan is the master Tao Yuanming\'s the Peach Garden.
    People can not be beautiful on the land of idyllic beauty.';
    echo '测试的字符串：<span style="color:#666;font-size:12px;">'.$str.'</span><hr />';
    echo '<p>strlen计算出的字符串长度：<span style="color:#333;">'.strlen($str).'</span></p>';
    echo '<p>mb_strlen计算出的字符串长度（utf-8）：<span style="color:#333;">'.mb_strlen($str,"utf-8").'</span></p>';
    echo '<p>mb_strlen计算出的字符串长度（gbk）：<span style="color:#333;">'.mb_strlen($str,"gbk").'</span></p>';
    echo '<p>mb_strlen计算出的字符串长度（gb2312）：<span style="color:#333;">'.mb_strlen($str,"gb2312").'</span></p>';
    echo '<p>mb_strlen计算出的字符串长度（'.mb_internal_encoding().'）：<span style="color:#333;">'.mb_strlen($str,mb_internal_encoding()).'</span></p>';
    echo '<hr />';
    echo '<p>substr（0,15）截取字符串长度（汉字编码为3字节，因此只能截取3的整数倍字符，此处截取5个汉字）：<span style="color:#f00;">'.substr($str,0,15).'</span></p>';
    echo '<hr />';
    echo '测试的字符串中是否含有：<span style="color:#666;font-size:12px;">"唐朝"</span>和<span style="color:#666;font-size:12px;">"你妹"</span><hr />';
    echo '<p>strpos查找"唐朝"在字符中的位置：<span style="color:#f00;">'.strpos($str,"唐朝").'</span></p>';
    $nimei=strpos($str,"你妹");
    if($nimei===FALSE){
        $nimei='没有找到相关"你妹"字符';
    }
    echo '<p>strpos查找"你妹"在字符中的位置：<span style="color:#f00;">'.$nimei.'</span></p><hr />';
    $arr1=array('C#','Basic','Pascal','C','C++','JAVA','SQL','VB','Delphi','PB','ASP','PHP','JavaScript','ActionScript','HTML','CSS');
    $str1='字符串或串(String)是由数字、字母、下划线组成的一串字符.字符串主要用于编程，概念说明、函数解释.';
    echo '<p>测试explode将字符串转换为数组,implode将数组转换为字符串</p>
            <p>字符串: <span style="font-weight:bold;color:#090;">'.$str1.'</span></p>
        
        <div>数组：<p style="font-weight:bold;color:#090;padding:0 0 20px 50px;">';
        $alen=count($arr1);
        for($i;$i<$alen;$i++){
            if($i==0){
                echo $arr1[$i];
            }else{
                echo $arr1[$i]." ;<br />";
            }
            
        }
        echo '</p></div>';
        $sta=explode('.',$str1);
        $ats=implode(',',$arr1);
    echo '<p>explode操作:<span style="color:#f00;"><br />'.$sta[0].'<br />'.$sta[1].'</span></p>';
    echo '<p>implode操作:<span style="color:#f00;"> '.$ats.'</span></p><hr />';
    echo '<p>测试str_replace替换字符串:<span style="font-weight:bold;color:#090;"> '.str_replace(',',' ;  ',$ats).'</span></p>'
?>
</body>











<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="description" content="session测试">
<meta name="keywords" content="session测试">
<title>文件操作</title>
</head>
<body>
<?php
    $mkdir='mkdir_file';
    $filename=$mkdir.'/ni mei.txt';
    $filesize=0;
    $content='Computer file is a kind of file, and it is different from common file carrier. '.
    'The computer file is a collection of information on the computer. Documents can be text documents, pictures,'.
    ' procedures, etc.. File is usually an extension of three letters for indicating the type of file (for example,'.
    ' the image file is often saved in JPEG format and file name extension is.Jpg).<br />'.'所谓“文件”，就是在我们的电脑中，以实现某种功能、或某个软件的部分功能为目的而定义的一个单位。
文件有很多种，运行的方式也各有不同。一般来说我们可以通过文件名来识别这个文件是哪种类型，特定的文件都会有特定的图标（就是显示这个文件的样子），也只有安装了相应的软件，才能正确显示这个文件的图标。
文件是与软件研制、维护和使用有关的资料，通常可以长久保存。文件是 软件 的重要组成部分。在软件产品研制过程中，以书面形式固定下来的用户需求、在研制周期中各阶段产生的规格说明、研究人员作出的决策及其依据、遗留问题和进一步改进的方向，以及最终产品的使用手册和操作说明等，都记录在各种形式的文件档案中。
文件是对软件中另一组成部分──程序的解释和说明，是对研制过程进行管理的重要手段。管理人员通过文件来确立不同研制人员或小组之间的工作联系，调整研制周期各阶段之间的衔接关系，并根据所产生的文件检查和控制研制工作的进度。文件也是使用、理解和维护软件所不可缺少的重要资料。
文件就是在我们的电脑中，以实现某种功能、或某个软件的部分功能为目的而定义的一个单位。
文件：电脑中的文件可以是文档、程序、快捷方式和设备。文件是由文件名和图标组成，一种类型的文件具有相同的图标，文件名不能超过255个字符（包括空格）。
文件是指存储在外部介质上的数据的集合。<br />';
    
    try {
        //创建文件目录
        if(!is_dir($mkdir)){
            mkdir($mkdir,0777,true);
        }else{
            echo '<p>该文件夹已经存在</p>';
        }
        
        //创建文件
        $file=fopen($filename,'a+');
        //打开文件
        if(!$file){
            echo '<p>文件不能打开</p>';
            exit;
        }
        //写入文件
        if(fwrite($file,$content)===FALSE){
            echo '<p>文件不能写入</p>';
            exit;
        }
        
        //获取文件磁盘大小
        if(is_file($filename)){
            $filesize=filesize($filename);
        }else{
            $filesize=0;
        }
        
        //读文件
        $readfile=fread(fopen($filename,'rb'),$filesize);
        if($readfile!==FALSE){
            $size=$filesize/1024;
            echo '<p style="color:#f00;">文件内容为：</p>
                <p>'.$readfile.'</p>
            <p style="color:#f00;">文件大小为：<span>'.$size.'kb</span></p>';
        }

        
    } catch (Exception $e) {
        echo '<p>文件操作失败</p>';
    }
    //关闭文件
    fclose($file);
?>
</body>











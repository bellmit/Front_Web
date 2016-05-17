<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="description" content="session测试">
<meta name="keywords" content="session测试">
<title>操作Excel</title>
</head>
<body>
<?php
    //错误信息级别
    error_reporting(E_ALL);
    
    //导入Excel类库
    require_once 'Classes/PHPExcel.php';
   # require_once 'Classes/PHPExcel/IOFactory.php';
    
    
    //创建Excel对象
    $excel=new PHPExcel();
    
    //获取单元格对象
    $cell=$excel->getActiveSheet();

    //操作Excel
    $excel->setActiveSheetIndex(0);
    
    
    //合并单元格，并设置其合并的单元格对象属性
    $cell->mergeCells('A1:E2');
    
    //设置表头样式
    $cell->getStyle('A1:E2')->applyFromArray(
        array(
            'font'=>array(
                'bold'=>true,
                'size'=>24,
            ),
            'borders'=>array(
                'top'=>array(
                   'style'=>PHPExcel_Style_Border::BORDER_THIN 
                ),
                'left'=>array(
                    'style'=>PHPExcel_Style_Border::BORDER_THIN
                ),
                'right'=>array(
                    'style'=>PHPExcel_Style_Border::BORDER_THIN
                )
            ),
            'alignment'=>array(
                'horizontal'=>PHPExcel_Style_Alignment::HORIZONTAL_CENTER  
            )
        )
    );
    $cell->getStyle('A1:E2')->getFont()->getColor()->applyFromArray(array('rgb' => '006600'));
    
    //设置表头标题
    $cell->setCellValue('A1','你妹!这是PHP操作Excel!');
    
    //设置其他值
    $tempcell='';
    $tempindex=array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        'AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ');
    for($i=1;$i<6;$i++){
        $tempcell=$tempindex[$i-1];
        for($j=3;$j<6;$j++){
            $cell->setCellValue($tempcell.$j,rand(1,1000));
        }
    };
    
    //设置其他样式
    $cell->getStyle('A3:E5')->getFont()->getColor()->applyFromArray(array('rgb' => '666'));
    
    //从Excel工厂穿件具体实例
    #$factory=PHPExcel_IOFactory::createWriter($excel,'test_excel');
    $factory=new PHPExcel_Writer_Excel5($excel);
    
    //导出Excel实例对象(输出至excel文件)
    $filename='test_excel.xls';
    try {
        $factory->save('test_excel.xls');
        echo '<p style="color:#060;font-size:20px;text-align:center;heigt:300px;line-height:300px;">你妹！创建excel成功！</p>';
    } catch (Exception $e) {
        echo '<p style="color:#f00;font-size:20px;text-align:center;heigt:300px;line-height:300px;">你妹！创建excel失败！</p>';
    }

?>
</body>











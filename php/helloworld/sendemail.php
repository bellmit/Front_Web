<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="description" content="session测试">
<meta name="keywords" content="session测试">
<title>Email测试</title>
<style type="text/css">
    .ewrap{
	    box-sizing:border-box;
      width:1000px;
    	margin:20px auto;
    	padding:20px;
    }
    .fitem{
	    float:left;
    	width:100%;
			display:block;
			margin:5px 0 0 0;	
    }
		.fitem span{
			float:left;
			width:100px;
			display:inline-block;
			text-align:right;
			height:100%;
			cursor:pointer;
			color:#555;
			font-size:14px;
		}
		.fitem input,
		.fitem textarea{
				border-radius:3px;
				border:1px solid #666;
				box-sizing:border-box;
		}
		.fitem input:focus,
		.fitem textarea:focus{
				border:1px solid #069;
		}
		.ftxt,
		.fbtn{
	    height:50px;
    }
		.ftip{
			height:30px;
			line-height:30px;
			text-indent:105px;
			color:#a00;
			font-size:12px;
		}
    .ftxtarea{
	    height:300px;
    }
		.ftxt span{
			line-height:30px;
		}
		.ftxtarea span{
			line-height:300px;
		}
    .ftxt input{
				height:30px;
				padding:5px;
				width:500px;
		}
		.ftxtarea textarea{
			height:300px;
			width:800px;
			padding:5px;
			resize:none;
		}
		.fbtn button{
			float:left;
      box-sizing:border-box;
	    height:40px;
	    width:200px;
			margin:5px 0 0 100px;
	    padding:10px;
	    border:1px solid #666;
	    border-radius:3px;
	    text-align:center;
	    cursor:pointer;
    	color:#369;
    	background:#f9f9f9;
    }
    .fbtn button:hover{
	    background:#f3f3f3;
    }
</style>
</head>
<body>
	<p style="height:50px;line-height:50px;font-size:24px;text-align:center;color:#060;">Email测试</p><hr />
  <form action="email.php" method="post" id="eform">
    <div class="ewrap">
        <label class="fitem ftxt">
            <span>收件人：</span><input name="To" id="to" type="text" >
        </label>
        <label class="fitem ftxt">
            <span>发件人：</span><input name="From" id="from" type="text" >
        </label>
        <label class="fitem ftxt">
            <span>主题：</span><input name="Theme" id="theme" type="text" >
        </label>
        <label class="fitem ftxtarea">
            <span>内容：</span><textarea name="Msg" id="msg" ></textarea>
        </label>
        <label id="ftip" class="fitem ftip"></label>
        <label class="fitem fbtn">
        		<button type="submit" name="submit">发送</button>
        </label> 
    </div>
  </form>
  <script>
			(function(){
				var eform=document.getElementById('eform'),
				to=document.getElementById('to'),
				from=document.getElementById('to'),
				theme=document.getElementById('theme'),
				msg=document.getElementById('msg'),
				ftip=document.getElementById('ftip');
				eform.onsubmit=function(){
						if(to.value==''||from.value==''||theme.value==''||msg.value==''){
							ftip.innerHTML='信息不能为空';
							return false;
						}else{
							ftip.innerHTML='';
						}
				}
			}());
  </script>
</body>











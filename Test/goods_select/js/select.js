
var $wrap=$('#test2'),
goods={};
function attrcbClick(obj) {
	if($wrap.size()===0){
		$wrap=$('#test2');
	}
	result=$.extend(true,{},goods);
	var $this=$(obj),
		$tr=$this.closest('tr'),
		index=$tr.attr('id'),
		key=$this.attr('id'),
		name=$this.attr('data-name'),
		value=$this.val(),
		ischeck=$this.is(':checked'),
		count=0,
		j=0;
		if(index in result){
			if(ischeck){
				result[index][key]=value+'_'+name;
			}else{
				delete result[index][key];
			}
			if($.isEmptyObject(result[index])){
				delete result[index];
			}
		}else{
			result[index]={};
			result[index][key]=value+'_'+name;
		}
		 

		 
		var filter=[],map=[];
		for(var i in result){
		
			var subitem=(function(){
				var str=[],obj=result[i];
				for(var m in obj){
					str.push(obj[m]);
				}
				return str.slice(0);
			}()),
			subobj={};
			subobj[i]=subitem;
			map.push(subobj);
			
			filter.push(i);
			count++;
		}
		if(count>2){
			for(j;j<count - 2;j++){
					var itemkey=filter[j];
					
					//去除已选择
					$('#'+itemkey).find('input').each(function(){
						$(this).prop({
								'checked':false	
						});
					});
					//删除结果
					delete result[itemkey];
			}
			map.reverse();
			filter.reverse();
			map.length=2;
			filter.length=2;
			map.reverse();
			filter.reverse();
			count=2;
		}
		if(count===2){
			var row=[],
			column=[],
			columnitem=map[0][filter[0]],
			rowitem=map[1][filter[1]],
			columnlen=columnitem.length,
			rowlen=rowitem.length,
			rowhead='<th>名称：</th>',
			z=0,
			x=0,
			y=0;
			for(z;z<columnlen;z++){
				var tempcolumn=columnitem[z].split('_');
				column.push('<th>'+tempcolumn[1]+'</th>');
			}
			for(x;x<rowlen;x++){
				var temprow=rowitem[x].split('_');
				rowhead+='<th style="text-align:left;">'+temprow[1]+'</th>';
				row.push('<td>'+temprow[0]+'</td>');
			}
			rowhead='<tr>'+rowhead+'</tr>';
			for(y;y<columnlen;y++){
				var tempstr=column[y];
				column.splice(y,1,'<tr>'+tempstr+row.join('')+'</tr>');
			}
			$(rowhead+column.join('')).appendTo($wrap.html(''));
		}else{
			$wrap.html('');
		}
		goods=result;	
}
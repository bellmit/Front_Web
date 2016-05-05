// JavaScript Document
function fixEvent(evt) {
	if(!evt.target) {
		evt=window.event;
		evt.target = evt.srcElement;
		evt.preventDefault = fixEvent.preventDefault;
		evt.stopPropagation = fixEvent.stopPropagation;
		if (evt.type == "mouseover") {
			evt.relatedTarget = evt.fromElement;
		} else if (evt.type =="mouseout") {
			evt.relatedTarget = evt.toElement;
		}
		evt.charCode =  (evt.type=="keypress")?evt.keyCode:0;
		evt.eventPhase = 2;
		evt.timeStamp = (new Date()).getTime();
		evt.pageX = evt.clientX+document.documentElement.scrollLeft;
		evt.pageY = evt.clientY+document.documentElement.scrollTop;
		evt.layerX = evt.offsetX;
		evt.layerY = evt.offsetY;
	}
	return evt;
}
	
fixEvent.preventDefault=function(){
	this.returnValue=false;
};

fixEvent.stopPropagation=function(){
	this.cancelBubble = true;
};

function addEvent(obj,evtype,fn,useCapture){
	if(obj.addEventListener){
		obj.addEventListener(evtype,fn,!!useCapture);
	}else{
		if(!fn.__EventID){fn.__EventID = addEvent.__EventHandlesCounter++;}
		if(!obj.__EventHandles){obj.__EventHandles={};}
		if(!obj.__EventHandles[evtype]){
			obj.__EventHandles[evtype]=[];
			if(obj["on"+evtype]){
				(obj.__EventHandles[evtype][0]=obj["on"+evtype]).__EventID=0;
			}
			obj["on"+evtype]=addEvent.execEventHandles;
		}
	}
}
addEvent.__EventHandlesCounter=1;
addEvent.execEventHandles=function(evt){
	if(!this.__EventHandles){return true;}
	evt=evt || window.event;
	var fns=this.__EventHandles[evt.type];
	for(var i=0;i< fns.length;i++){
		if(fns[i] instanceof Function) {
			fns[i].call(this);
		}
	}
};

function delEvent(obj,evtype,fn,useCapture){
	if(obj.removeEventListener){
		obj.removeEventListener(evtype,fn,!!useCapture);
	}else{
		if(obj.__EventHandles){
			var fns=obj.__EventHandles[evtype];
			if(fns){delete fns[fn.__EventID];}
		}
	}
}

function addCSS(sheet,selectorText,declarations,index) {
	if(sheet.insertRule){
		sheet.insertRule(selectorText+" {"+declarations+"}",index);
	}else if(sheet.addRule) {
		sheet.addRule(selectorText,declarations,index);
	}
}

function delCSS(sheet,index) {
	if (sheet.deleteRule) {
		sheet.deleteRule(index);
	}else{
		sheet.removeRule(index);
	}
}


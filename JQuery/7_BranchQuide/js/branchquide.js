// JavaScript Document
$(document).ready(function(){
					 $('#wizard').smartWizard();	   
					 function onFinishCallback(){
					 $('#wizard').smartWizard('showMessage','Finish Clicked');
			  }   
		 });
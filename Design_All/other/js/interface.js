
_namespace_(
	{
		core:{
			data:{
				xml:(
					function(){
						var xmlDomFactory={
								_doc_:function(){/*xmlDom Factory;*/},
								_name_:"<Factory xmlDomFactory>",
								create:function(){
											return $try(arguments,
											function(){return new ActiveObject('MSXML2.DOMDocument4.0')},
											function(){return new ActiveObject('MSXML2.DOMDocument3.0')},
											function(){return new ActiveObject('MSXML2.DOMDocument')},
											function(){return new ActiveObject('Microsoft.XmlDOM')},
											function(){return document.implementation.createDocument("","doc",null)})||null;
												 }
										  }
						return {xmlDomFactory:xmlDomFactory,xmlDomFactory:xmlDomFactory,xmlDomFactory:xmlDomFactory}
							  }
					)()
				 }
			 }
	}
)




















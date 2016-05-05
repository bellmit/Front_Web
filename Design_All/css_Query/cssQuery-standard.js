/* cssQuery, version 2.0.3 */
cssQuery.addModule("css-standard", function() {
isMSIE = eval("false;/*@cc_on@if(@\x5fwin32)isMSIE=true@end@*/");
if (!isMSIE) {
	getElementsByTagName = function($node, $tagName, $namespace) {
		return $namespace ? $node.getElementsByTagNameNS("*", $tagName) :
			$node.getElementsByTagName($tagName);
	};

	compareNamespace = function($element, $namespace) {
		return !$namespace || ($namespace == "*") || ($element.prefix == $namespace);
	};

	isXML = document.contentType ? function($node) {
		return /xml/i.test(getDocument($node).contentType);
	} : function($node) {
		return getDocument($node).documentElement.tagName != "HTML";
	};

	getTextContent = function($element) {
		// mozilla || opera || other
		return $element.textContent || $element.innerText || _getTextContent($element);
	};

	function _getTextContent($element) {
		var $textContent = "", $node, i;
		for (i = 0; ($node = $element.childNodes[i]); i++) {
			switch ($node.nodeType) {
				case 11: // document fragment
				case 1: $textContent += _getTextContent($node); break;
				case 3: $textContent += $node.nodeValue; break;
			}
		}
		return $textContent;
	};
}
});

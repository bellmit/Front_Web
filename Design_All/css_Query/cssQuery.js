/*
	cssQuery, version 2.0.3 (http://dean.edwards.name/my/cssQuery)
	License: http://creativecommons.org/licenses/LGPL/2.1/
*/

/*定义cssQuery对象*/
var cssQuery = function() {
	var version = "2.0.3";
	cssQuery.uniqueIds = true;
	cssQuery.caching = false;
	var $COMMA = /\s*,\s*/;
	
	function cssQuery($selector, $$from) {
		try {
			var $match = [];
			var $useCache = cssQuery.caching && !$$from;
			var $base = $$from ? ($$from.constructor == Array) ? $$from : [$$from] : [document];
			var $$selectors = parseSelector($selector).split($COMMA),i;
			for (i = 0; i < $$selectors.length; i++) {
				$selector = _toStream($$selectors[i]);
				$$from = $base;
				if ($selector.slice(0, 3).join("") == " *#") {
					var id = $selector[3];
					if (cssQuery.uniqueIds && $base.length == 1 && $base[0].getElementById) {
						$$from = [$base[0].getElementById(id)];
						$selector = $selector.slice(4);
					} else if (isMSIE) {
						$$from = _msie_selectById([], $base, id);
						$selector = $selector.slice(4);
					}
				}
				var j = 0, $token, $filter, $arguments, $cacheSelector = "";
				while (j < $selector.length) {
					$token = $selector[j++];
					$filter = $selector[j++];
					$cacheSelector += $token + $filter;
					$arguments = "";
					if ($selector[j] == "(") {
						while ($selector[j++] != ")" && j < $selector.length) {
							$arguments += $selector[j];
						}
						$arguments = $arguments.slice(0, -1);
						$cacheSelector += "(" + $arguments + ")";
					}
					$$from = ($useCache && cache[$cacheSelector])?cache[$cacheSelector] : select($$from, $token, $filter, $arguments);
					if ($useCache){
						cache[$cacheSelector] = $$from;
					} 
				}
				$match = $match.concat($$from);
			}
			delete cssQuery.error;
			return $match;
		 } catch ($error) {
			cssQuery.error = $error;
			return [];
		 }
	};

		cssQuery.toString = function() {
			return "function cssQuery() {\n  [version " + version + "]\n}";
		};

		var cache = {};
		cssQuery.clearCache = function($selector) {
			if ($selector) {
				$selector = _toStream($selector).join("");
				delete cache[$selector];
			} else{
				cache = {}
			};
		};

		var modules = {};
		var loaded = false;
		cssQuery.addModule = function($name, $script) {
			if (loaded) eval("$script=" + String($script));
			modules[$name] = new $script();
		};

		cssQuery.valueOf = function($code) {
			return $code ? eval($code) : this;
		};
		
		var selectors = {};
		var pseudoClasses = {};

		var AttributeSelector = {match: /\[([\w-]+(\|[\w-]+)?)\s*(\W?=)?\s*([^\]]*)\]/};
		var attributeSelectors = [];
		selectors[" "] = function($results, $from, $tagName, $namespace) {
			var $element, i, j;
			for (i = 0; i < $from.length; i++) {
				var $subset = getElementsByTagName($from[i], $tagName, $namespace);
				for (j = 0; ($element = $subset[j]); j++) {
					if (thisElement($element) && compareNamespace($element, $namespace)){
						$results.push($element);
					}	
				}
			}
		};
		selectors["#"] = function($results, $from, $id) {
			var $element, j;
			for (j = 0; ($element = $from[j]); j++){
				if ($element.id == $id){
					$results.push($element);
				} 
			}
		};
		selectors["."] = function($results, $from, $className) {
			$className = new RegExp("(^|\\s)" + $className + "(\\s|$)");
			var $element, i;
			for (i = 0; ($element = $from[i]); i++){
				if ($className.test($element.className)){
					$results.push($element);
				}
			} 
		};
		selectors[":"] = function($results, $from, $pseudoClass, $arguments) {
			var $test = pseudoClasses[$pseudoClass], $element, i;
			if ($test) for (i = 0; ($element = $from[i]); i++){
				if ($test($element, $arguments)){
					$results.push($element);
				} 
			}
		};
		pseudoClasses["link"] = function($element) {
			var $links = getDocument($element).links;
			if ($links) for (var i = 0; i < $links.length; i++) {
				if ($links[i] == $element) return true;
			}
		};
		pseudoClasses["visited"] = function($element) {};	
		var thisElement = function($element) {
			return ($element && $element.nodeType == 1 && $element.tagName != "!") ? $element : null;
		};		
		var previousElementSibling = function($element) {
			while ($element && ($element = $element.previousSibling) && !thisElement($element)) continue;
			return $element;
		};		
		var nextElementSibling = function($element) {
			while ($element && ($element = $element.nextSibling) && !thisElement($element)) continue;
			return $element;
		};		
		var firstElementChild = function($element) {
			return thisElement($element.firstChild) || nextElementSibling($element.firstChild);
		};		
		var lastElementChild = function($element) {
			return thisElement($element.lastChild) || previousElementSibling($element.lastChild);
		};		
		var childElements = function($element) {
			var $childElements = [];
			$element = firstElementChild($element);
			while ($element) {
				$childElements.push($element);
				$element = nextElementSibling($element);
			}
			return $childElements;
		};		
		var isMSIE = true;		
		var isXML = function($element) {
			return !getDocument($element).write;
		};		
		var getDocument = function($node) {
			return $node.ownerDocument || $node.document || $node;
		};		
		var getElementsByTagName = function($node, $tagName, $namespace) {
			if (isXML($node) && $namespace) $tagName = $namespace + ":" + $tagName;
			return ($tagName == "*" && $node.all) ? $node.all : $node.getElementsByTagName($tagName);
		};		
		var compareTagName = function($element, $tagName, $namespace) {
			if ($tagName == "*") return thisElement($element);
			if (!compareNamespace($element, $namespace)) return false;
			if (!isXML($element)) $tagName = $tagName.toUpperCase();
			return $element.tagName == $tagName;
		};	
		var compareNamespace = function($element, $namespace) {
			if (isXML($element)) return true;
			return !$namespace || ($namespace == "*") || ($element.scopeName == $namespace);
		};	
		var getTextContent = function($element) {
			return $element.innerText;
		};	
		function _msie_selectById($results, $from, id) {
			var $match, i, j;
			for (i = 0; i < $from.length; i++) {
				if ($match = $from[i].all.item(id)) {
					if ($match.id == id) $results.push($match);
					else if ($match.length != null) {
						for (j = 0; j < $match.length; j++) {
							if ($match[j].id == id) $results.push($match[j]);
						}
					}
				}
			}
			return $results;
		};	
		if (![].push) Array.prototype.push = function() {
			for (var i = 0; i < arguments.length; i++) {
				this[this.length] = arguments[i];
			}
			return this.length;
		};	
		var $NAMESPACE = /\|/;
		function select($$from, $token, $filter, $arguments) {
			if ($NAMESPACE.test($filter)) {
				$filter = $filter.split($NAMESPACE);
				$arguments = $filter[0];
				$filter = $filter[1];
			}
			var $results = [];
			if (selectors[$token]) {
				selectors[$token]($results, $$from, $filter, $arguments);
			}
			return $results;
		};
		var STANDARD_SELECT = /^[^\s>+~]/;
		var STREAM = /[\s#.:>+~()@]|[^\s#.:>+~()@]+/g;
		function _toStream($selector) {
			if (STANDARD_SELECT.test($selector)) $selector = " " + $selector;
			return $selector.match(STREAM) || [];
		};
		var WHITESPACE = /\s*([\s>+~(),]|^|$)\s*/g;
		var IMPLIED_ALL = /([\s>+~,]|[^(]\+|^)([#.:@])/g;
		var parseSelector = function($selector) {
			return $selector.replace(WHITESPACE, "$1").replace(IMPLIED_ALL, "$1*$2");
		};
		var Quote = {
			toString: function() {return "'"},
			match: /^('[^']*')|("[^"]*")$/,
			test: function($string) {
				return this.match.test($string);
			},
			add: function($string) {
				return this.test($string) ? $string : this + $string + this;
			},
			remove: function($string) {
				return this.test($string) ? $string.slice(1, -1) : $string;
			}
		};
		var getText = function($text) {
			return Quote.remove($text);
		};
		var $ESCAPE = /([\/()[\]?{}|*+-])/g;
		function regEscape($string) {
			return $string.replace($ESCAPE, "\\$1");
		};
		loaded = true;
		var $document = (typeof Document == "function") ? Document.prototype : document; 
		$document.matchAll = function(selectors) {
			return cssQuery(selectors, [this]); 
		};
		$document.match = function(selectors) {
			return this.matchAll(selectors)[0]; 
		};
		return cssQuery;
}();

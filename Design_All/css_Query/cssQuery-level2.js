/* cssQuery, version 2.0.3
向名为cssQuery的对象添加名为"css-level2"的支持模块
*/
cssQuery.addModule("css-level2",function() {
		/*子选择器*/
		selectors[">"] = function($results, $from, $tagName, $namespace) {
			var $element, i, j;
			for (i = 0; i < $from.length; i++) {
				var $subset = childElements($from[i]);
				for (j = 0; ($element = $subset[j]); j++){
					if (compareTagName($element, $tagName, $namespace))
						$results.push($element);
				}	
			}
		};
		/*相邻选择器*/
		selectors["+"] = function($results, $from, $tagName, $namespace) {
			for (var i = 0; i < $from.length; i++) {
				var $element = nextElementSibling($from[i]);
				if ($element && compareTagName($element, $tagName, $namespace))
					$results.push($element);
			}
		};
		/*包含选择器*/
		selectors["@"] = function($results, $from, $attributeSelectorID) {
			var $test = attributeSelectors[$attributeSelectorID].test;
			var $element, i;
			for (i = 0; ($element = $from[i]); i++)
				if ($test($element)) $results.push($element);
		};
		/*第一个子选择器*/
		pseudoClasses["first-child"] = function($element) {
			return !previousElementSibling($element);
		};
		/*lang属性选择器*/
		pseudoClasses["lang"] = function($element, $code) {
			$code = new RegExp("^" + $code, "i");
			while ($element && !$element.getAttribute("lang")) $element = $element.parentNode;
			return $element && $code.test($element.getAttribute("lang"));
		};
		AttributeSelector.NS_IE = /\\:/g;
		AttributeSelector.PREFIX = "@";
		AttributeSelector.tests = {};
		AttributeSelector.replace = function($match, $attribute, $namespace, $compare, $value) {
			var $key = this.PREFIX + $match;
			if (!attributeSelectors[$key]) {
				$attribute = this.create($attribute, $compare || "", $value || "");
				attributeSelectors[$key] = $attribute;
				attributeSelectors.push($attribute);
			}
			return attributeSelectors[$key].id;
		};
		/*属性解析*/
		AttributeSelector.parse = function($selector) {
			$selector = $selector.replace(this.NS_IE, "|");
			var $match;
			while ($match = $selector.match(this.match)) {
				var $replace = this.replace($match[0], $match[1], $match[2], $match[3], $match[4]);
				$selector = $selector.replace(this.match, $replace);
			}
			return $selector;
		};
		AttributeSelector.create = function($propertyName, $test, $value) {
			var $attributeSelector = {};
			$attributeSelector.id = this.PREFIX + attributeSelectors.length;
			$attributeSelector.name = $propertyName;
			$test = this.tests[$test];
			$test = $test ? $test(this.getAttribute($propertyName), getText($value)) : false;
			$attributeSelector.test = new Function("e", "return " + $test);
			return $attributeSelector;
		};
		AttributeSelector.getAttribute = function($name) {
			switch ($name.toLowerCase()) {
				case "id":
					return "e.id";
				case "class":
					return "e.className";
				case "for":
					return "e.htmlFor";
				case "href":
					return "e.getAttribute('href',2)";
			}
			return "e.getAttribute('" + $name.replace($NAMESPACE, ":") + "')";
		};
		AttributeSelector.tests[""] = function($attribute) {
			return $attribute;
		};
		AttributeSelector.tests["="] = function($attribute, $value) {
			return $attribute + "==" + Quote.add($value);
		};
		AttributeSelector.tests["~="] = function($attribute, $value) {
			return "/(^| )" + regEscape($value) + "( |$)/.test(" + $attribute + ")";
		};
		AttributeSelector.tests["|="] = function($attribute, $value) {
			return "/^" + regEscape($value) + "(-|$)/.test(" + $attribute + ")";
		};
		var _parseSelector = parseSelector;
		parseSelector = function($selector) {
			return _parseSelector(AttributeSelector.parse($selector));
		};
});

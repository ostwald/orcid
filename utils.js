function log (s) {
  if (window.console)
    console.log(s);
}

function stringify (json) {
  return JSON.stringify(json,null,2)
}


function fetch_stored_json (key) {
    try {
        var data = localStorage.getItem(key);
        if (data == null)
            throw ("bad key: " + key);

        try {
            return JSON.parse(data);
        } catch (error) {
            throw ("data could not be parsed as JSON \"" + key + "\"");
        }
    }
    catch (error) {
        log ("fetch_json error for \"" + key + "\": " + error)
    }
    return null;
}

function store_json (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

/**
 * obtained from https://gist.github.com/kares/956897
 * modified to accept whole URL
 */
(function($) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decode = function(str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    };
    $.parseParams = function(query) {
        var params = {}, e;

        if (!query)
            return params;

        var i = query.indexOf('?');
        if (i != -1)
            query = query.substring(i+1);

        if (query) {
            if (query.substr(0, 1) == '?') {
                query = query.substr(1);
            }

            while (e = re.exec(query)) {
                var k = decode(e[1]);
                var v = decode(e[2]);
                if (params[k] !== undefined) {
                    if (!$.isArray(params[k])) {
                        params[k] = [params[k]];
                    }
                    params[k].push(v);
                } else {
                    params[k] = v;
                }
            }
        }
        return params;
    };
//    log ("$.parseParams defined");
    window.PARAMS = $.parseParams(window.location.href)
})(jQuery);


/**
convenience for creating DOM elements
*/
function $t (tag) {
	tag = tag || 'div';
	return $('<'+tag+'/>');
}

var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
// var SCRIPT_REGEX = /<script\\\b[^<]*(?:(?!<\\\/script>)<[^<]*)*<\\\/script>/gi;

/* see http://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression */
function stripScripts (text) {
	while (SCRIPT_REGEX.test(text)) {
		text = text.replace(SCRIPT_REGEX, "");
	}
	return text;
}

var TAG_REGEX = /<[^>]+>/ig;

/* see https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/ */
function stripTags(input) {
	if (input) {
		if (!$.isArray(input)) {
			input = input.replace(TAG_REGEX,"");
		}
		else {
			var i = input.length;
			var newInput = new Array();
			while(i--) {
				input[i] = input[i].replace(TAG_REGEX,"");
			}
		}
		return input;
	}
	//return false;
	return '';
}



function isString(obj) {
	return $.type(obj) === 'string';
}

function sanitize (s) {
	return stripTags(stripScripts(s));
}



// Handle json paths for repeating fields, fields with content (e.g. xml attributes), dc variations:
/* ported from DDS service JS client which used prototype */
function getContent(path,maxElms,matchesRegex) {
	try{
		var value = '';

		// If a single object:
		if(!path)
			value = '';
		else if(isString(path))
			value = sanitize(path)
		else if(path.content && isString(path.content))
			value = sanitize(path.content);
		if(matchesRegex && !matchesRegex.test(value))
			value = '';

		// If multiple objects:
		if($.isArray(path)) {
			value = '';
			for(var i in path) {
				var pathEle = path[i];
				var str = null;
				if(isString(pathEle))
					str = pathEle.strip();
				else if(pathEle.content && isString(pathEle.content))
					str = pathEle.content.strip();
				if(str != null && str.length > 0 && (!matchesRegex || matchesRegex.test(str))) {
					if(maxElms && maxElms == 1)
						value = sanitize(str);
					else
						value += '<div style="margin-bottom: 4px;">'+sanitize(str)+' </div>';

					if(maxElms && i+1 >= maxElms)
						break;
				}
			}
		}
		// log("getContent() returing: '" + value + "'");
		return value;
	} catch (e) {
		log("getContent() error: " + e);
		return '';
	}
}



// CLASS - see http://ejohn.org/blog/simple-javascript-inheritance/

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
	var _super = this.prototype;
   
	// Instantiate a base class (but only create the instance,
	// don't run the init constructor)
	initializing = true;
	var prototype = new this();
	initializing = false;
   
	// Copy the properties over onto the new prototype
	for (var name in prop) {
	  // Check if we're overwriting an existing function
	  prototype[name] = typeof prop[name] == "function" &&
		typeof _super[name] == "function" && fnTest.test(prop[name]) ?
		(function(name, fn){
		  return function() {
			var tmp = this._super;
		   
			// Add a new ._super() method that is the same method
			// but on the super-class
			this._super = _super[name];
		   
			// The method only need to be bound temporarily, so we
			// remove it when we're done executing
			var ret = fn.apply(this, arguments);        
			this._super = tmp;
		   
			return ret;
		  };
		})(name, prop[name]) :
		prop[name];
	}
   
	// The dummy class constructor
	function Class() {
	  // All construction is actually done in the init method
	  if ( !initializing && this.init )
		this.init.apply(this, arguments);
	}
   
	// Populate our constructed prototype object
	Class.prototype = prototype;
   
	// Enforce the constructor to be what we expect
	Class.prototype.constructor = Class;
 
	// And make this class extendable
	Class.extend = arguments.callee;
   
	return Class;
  };
})();

/**
matches pattern: [/d]{4}-[/d]{4}-[/d]{4}-[/d]{4}
e.g., /[\d]{4}-[\d]{4}-[\d]{4}-[\d]{4}/.exec('0000-0002-6789-8420')
*/
function getOrcidIdFromQ (q_param) {

    var m = /orcid\:([\d]{4}-[\d]{4}-[\d]{4}-[\d]{4})/.exec(q_param)
    if (m)
        return m[1]
    throw "ORCID_ID not found"

}
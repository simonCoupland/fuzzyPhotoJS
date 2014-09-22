ke = new Object;

/*
Function: ke.debug
	Writes a message to the browser's console if available.

Parameters:
	Variable number of arguments. These are concatenated with spaces when
	written to the console.

Example:
>	x = 6;
>	y = 8;
>	ke.debug('The value of x is', x, 'and the value of y is', y);
	will produce the following line on the browser's console:
>	The value of x is 6 and the value of y is eight
*/
ke.debug = function()
{
	if (window.console && window.console.log)
	{
		var line = '';
		for (var i = 0; i < arguments.length; i++)
		{
			if (line != '')
				line += ' ';
			line += arguments[i];
		}
		window.console.log(line);
	}
};

ke.debugTime = function()
{
	var d = new Date;
	var h = d.getHours();
	if (h < 10)
		h = '0' + h;
	var m = d.getMinutes();
	if (m < 10)
		m = '0' + m;
	var s = d.getSeconds();
	if (s < 10)
		s = '0' + s;
	var t = h + ':' + m + ':' + s + ':';
	var a = new Array;
	a.push(t);
	for (var i = 0; i < arguments.length; i++)
		a.push(arguments[i]);
	ke.debug.apply(this, a);
};

/*
Function: ke.get
	Executes a HTTP GET request using jQuery's ajax() function.
	This is similar to jQuery's own get() function but allows for 
	some error handling by throwing an exception.

Parameters:
	url - The URL to submit the request to.
	data - The data (in the form of a JavaScript Object) to submit.
	callback - A function to be called once the request is complete (optional).
*/
ke.get = function(url, data, callback)
{
	var undefined;

	if (typeof(data) == 'function')
	{
		callback = data;
		data = undefined;
	}

	var options = new Object;
	options.url = url;
	if (data !== undefined)
		options.data = data;
	if (callback !== undefined)
		options.success = callback;
	options.error = function(req, text, thrown)
	{
		alert('Error: ' + text);
		/*
		var error = new Error(text);
		throw error;
		*/
	};
	options.cache = false;

	jQuery.ajax(options);
}

/*
Function: ke.getParams
	Extracts the set of GET variables from the current URL.

Returns:
	An Object containing the GET variables and their values.

Example:
	For a URL of http://host/script?alpha=one&beta=two
	the function will return
	(start code)
	{
		"alpha": "one",
		"beta": "two"
	}
	(end)
*/
ke.getParams = function(url)
{
	if (! url)
		url = window.location.href;

	params = new Object

	var pos = url.indexOf('?');
	if (pos < 0)
		return params;

	var args = url.substr(pos + 1).split('&');
	for (var i = 0; i < args.length; i++)
	{
		var arg = args[i];
		var pos = arg.indexOf('=');
		var name;
		var value;
		if (pos < 0)
		{
			name = arg;
			value = true;
		}
		else
		{
			name = arg.substr(0, pos);
			value = arg.substr(pos + 1);
		}
		params[name] = value;
	}
	return params
}

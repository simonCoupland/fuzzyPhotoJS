imu = new Object;

imu.getCookie =function()
{
	var cookie = $.cookie('IMu');
	eval('cookie = ' + cookie);
	return cookie;
}

imu.getOptions = function(request)
{
	var options = new Object;
	options.request = request;
	return options;
}

imu.getRequest = function(request, params)
{
	var url = this.getURL();
	url += '?request=' + request;
	if (params)
		url += '&' + params;
	return url;
}

imu.getURL = function(params)
{
	var url = window.location.href.toString();
	url = url.replace(/\?request=.*$/, '');
	if (params)
		url += '&' + params;
	return url;
}

imu.cookie = imu.getCookie();
imu.user = imu.cookie.user;
imu.group = imu.cookie.group;
imu.lang = imu.cookie.lang;
imu.theme = imu.cookie.theme;
imu.javascript = imu.cookie.javascript == 'yes';

imu.langDir = $('html').attr('dir');

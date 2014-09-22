imu.setup = function()
{
	imu.setupTheme();
	imu.setupLanguage();
	imu.setupCheckboxes();
}

imu.setupCheckboxes = function()
{
	$('.group-checkbox').unbind('change').change(function()
	{
		var box = $(this);

		var url = imu.getURL();
		var options = imu.getOptions('group');
		if (box.attr('checked'))
			options.action = 'add';
		else
			options.action = 'remove';
		var boxClass = box.attr('class');
		var boxIrn = boxClass.match(/irn(\d+)/);
		if (boxIrn && boxIrn[1] != null)
			options.irn = boxIrn[1];
		options.module = box.attr('module');
		options.key = box.attr('key');
		ke.get(url, options);
	});

	$('.group-update').hide();
}

imu.setupLanguage = function()
{
	$('#header-language select').unbind('change').change(function()
	{
		var form = $(this).parents('form');
		form.submit();
	});
	$('#header-language input[type=submit]').hide();
}

imu.setupTheme = function()
{
	$('#header-theme select').unbind('change').change(function()
	{
		var form = $(this).parents('form');
		form.submit();
	});
	$('#header-theme input[type=submit]').hide();
}


$(document).ready(function()
{
	if (! imu.javascript)
		return;

	imu.setup();
	
});

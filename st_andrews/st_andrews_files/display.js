imu.display = new Object;

imu.display.current = null;
imu.display.previous = null;
imu.display.history = new Array;
imu.display.views = new Object;

/* Methods */
imu.display.setup = function()
{
	var _this = this;

	var content = $('.display-content');
	if (content.length == 0)
		return;

	var url = content.attr('url');
	this.history.add(url);

	var select = $('#collection select');
	select.unbind('change');
	select.change(function()
	{
		var form = $(this).parents('form');
		var url = imu.getURL() + '?' + form.serialize();
		ke.get(url, function()
		{
			var url = _this.current;
			_this.fadeIn(url, function()
			{
				_this.setupPage();
			});
		});
	});
	$('#collection input[type=submit]').hide();

	this.setupPage();
}

imu.display.setupPage = function()
{
	var _this = this;
	imu.display.setupBrowser();
	
	var region = $('.display-region');
	var content = $('.display-content');
	var w = region.width();
	var h = region.height();

	region.css('position', 'relative');
	content.css('position', 'absolute');
	content.css('left', 0);
	content.css('top', 0);
//	content.width(w);
	content.css('width', '100%');
//	content.height(h);
//	region.width(w);
	region.css('width', '100%');
//	region.height(h);
	region.height(content.height());

	this.previous = this.current;
	this.current = content.attr('url');
	var params = ke.getParams(this.current);

	var view = $('.display-view select');
	if ('view' in params)
		view.val(params.view);
	$('#list-view-return').hide();
	if(params.view == 'details')
		$('#list-view-return').show();
	view.unbind('change');
	view.change(function()
	{
		params.view = $(this).val();
		delete params.count;	// Ensure use default count
		if(params.view == 'list')
		{
			params.offset = (Math.floor(params.offset / params.listcount)) *  params.listcount;
		}
		if(params.view == 'lightbox')
		{
			params.offset = (Math.floor(params.offset / 6)) *  6;
		}
		var str = '';
		for (param in params)
		{
			if (str != '')
				str += '&';
			str += param + '=' + params[param];
		}
		var url = imu.getURL();
		if (str != '')
			url += '?' + str;
		_this.fadeIn(url, function()
		{
			_this.history.add(url);
			_this.setupPage();
		});
	});
	$('.display-view input[type=submit]').hide();

	/* link to get the user back to list view
	*/
	var back = $('.display-back');
	back.unbind('click');
	back.click(function()
	{
		params.view = 'list';
		delete params.count;	// Ensure use default count
		params.offset = (Math.floor(params.offset / params.listcount)) *  params.listcount;
		var str = '';
		for (param in params)
		{
			if (str != '')
				str += '&';
			str += param + '=' + params[param];
		}
		var url = imu.getURL();
		if (str != '')
			url += '?' + str;
		_this.fadeIn(url, function()
		{
			_this.history.add(url);
			_this.setupPage();
		});
	});

	/*
	var back = $('.display-back');
	back.show();
	back.removeAttr('href');
	back.unbind('click');
	if (this.history.index > 0)
	{
		var url = this.history[this.history.index - 1];
		back.attr('href', url);
		back.click(function()
		{
			var url = $(this).attr('href');
			_this.fadeIn(url, function()
			{
				_this.history.index--;
				_this.setupPage();
			});
			return false;
		});
	}

	var forward = $('.display-forward');
	forward.show();
	forward.unbind('click');
	forward.removeAttr('href');
	if (this.history.index < this.history.length - 1)
	{
		var url = this.history[this.history.index + 1];
		forward.attr('href', url);
		forward.click(function()
		{
			var url = $(this).attr('href');
			_this.fadeIn(url, function()
			{
				_this.history.index++;
				_this.setupPage();
			});
			return false;
		});
	}
	*/

	if (this.views[params.view] == undefined)
	{
		alert ("Error setting up page.\n" +
			"Please advise site owner that IMu view:" +
			params.view +
			" is undefined or broken and they need to check the installation\n" +
			"(missing javascript elements in search page?)" );
		return false;
	}
	else
		this.views[params.view].setupPage();

	$("a#popupimage").fancybox(
		{
			'type': 'image',
			'titlePosition': 'inside'
		}
	);
}

imu.display.fadeIn = function(url, callback)
{
	var _this = this;

	var region = $('.display-region');

	var oldContent = $('.display-content');
	var oldProps = new Object;
	oldProps.opacity = 'toggle';
	oldContent.animate(oldProps, 2000, function()
	{
		oldContent.remove();
	});

	ke.get(url, function(html)
	{
		var result = $(html);

		var newContent = result.find('.display-content');
		newContent.hide();

		newContent.css('position', 'absolute');
		newContent.css('left', 0);
		newContent.css('top', 0);
		newContent.width(region.width());

		/* This is a NASTY hack
		** Hide the Update button before any sizing calculation is done.
		*/
		newContent.find('.group-update').hide();

		region.append(newContent);

		var regionProps = new Object;
		regionProps.height = newContent.height();
		region.animate(regionProps, 2000, function()
		{
		});

		var newProps = new Object;
		newProps.opacity = 'toggle';
		newContent.animate(newProps, 2000, function()
		{
			if (callback)
				callback();
		});
	});
}

imu.display.views.setupNavigation = function()
{
	var _this = this;

	/*
	var modules = $('.display-module');
	for (var i = 0; i < modules.length; i++)
		this.setupNavigationModule($(modules[i]));
	*/

	var prev = $('.display-prev');
	prev.unbind('click');
	if (prev.attr('href'))
	{
		prev.click(function()
		{
			var url = $(this).attr('href');
			_this.slideIn(url, 'down', 0, function(page)
			{
				imu.display.history.add(url);
				imu.display.setupPage();
			});
			$('html, body').animate({ scrollTop: 0 }, 0);
			return false;
		});
	}

	var next = $('.display-next');
	next.unbind('click');
	if (next.attr('href'))
	{
		next.click(function()
		{
			var url = $(this).attr('href');
			_this.slideIn(url, 'up', 0, function(page)
			{
				imu.display.history.add(url);
				imu.display.setupPage();
			});
			$('html, body').animate({ scrollTop: 0 }, 0);
			return false;
		});
	}

	/* Adjust page size */
	var area = $('.display-area');
	var page = $('.display-page');

	area.css('position', 'relative');
	page.css('position', 'absolute');
	page.css('left', 0);
	page.css('top', 0);

	area.css('width', '100%');
	page.css('width', '100%');

	area.height(page.height());
}

/*
imu.display.views.setupNavigationModule = function(module)
{
	var _this = this;

	var url = module.attr('hits');
	if (! url)
		return;

	var text = module.text();
	if (text.match(/\s*\(\d+\)$/))
		return;

	var text = module.text().replace(/\s*\(.*$/, '');
	text += ' (...)';
	module.text(text);
	module.unbind('click');
	ke.get(url, function(result)
	{
		if (result < 0)
			module.hide();
		else
		{
			module.show();

			var text = module.text().replace(/\s*\(.*$/, '');
			text += ' (' + result + ')';
			module.text(text);
			if (result == 0)
			{
				module.removeAttr('href');
				module.removeClass('module-link');
			}	
			else
			{
				module.click(function()
				{
					var url = $(this).attr('href');
					_this.fadeIn(url, function(page)
					{
						imu.display.history.add(url);
						imu.display.setupPage();
					});
					return false;
				});
			}
		}
	});
}
*/

imu.display.views.fadeIn = function(url, callback)
{
	var _this = this;

	var area = $('.display-area');

	var oldPage = $('.display-page');
	var oldProps = new Object;
	oldProps.opacity = 'toggle';
	oldPage.animate(oldProps, 2000, function()
	{
		oldPage.remove();
	});

	ke.get(url, function(html)
	{
		var result = $(html);

		var newPage = result.find('.display-page');
		newPage.hide();

		newPage.css('position', 'absolute');
		newPage.css('left', 0);
		newPage.css('top', 0);
		newPage.width(area.width());

		/* This is a NASTY hack
		** Hide the Update button before any sizing calculation is done.
		newContent.find('.group-update').hide();
		*/

		area.append(newPage);

		var areaProps = new Object;
		areaProps.height = newPage.height();
		area.animate(areaProps, 2000, function()
		{
		});

		var newProps = new Object;
		newProps.opacity = 'toggle';
		newPage.animate(newProps, 2000, function()
		{
			var oldPrev = $('.display-prev');
			var newPrev = result.find('.display-prev');
			if (newPrev.attr('href'))
				oldPrev.attr('href', newPrev.attr('href'));
//			else
//				oldPrev.removeAttr('href');

			var oldNext = $('.display-next');
			var newNext = result.find('.display-next');
			if (newNext.attr('href'))
				oldNext.attr('href', newNext.attr('href'));
//			else
//				oldNext.removeAttr('href');

			if (callback)
				callback();
		});
	});
}

imu.display.views.slideIn = function(url, effect, duration, callback)
{
	if(typeof(duration) == 'function')
	{
        	callback = duration;
        	duration = 2000;
    	}
	
	var area = $('.display-area');
	area.css('overflow', 'hidden');

	var oldPage = $('.display-page');

	ke.get(url, function(html)
	{
		var result = $(html);

		var newPage = result.find('.display-page');
		newPage.hide();
		area.append(newPage);
/*
		var img = newPage.find('.details-image img');
		var elem = img.get(0);
		elem.onload = function()
		{
			alert('woo');
		};
//		elem.src = '/artdemo/imu.php?request=multimedia&irn=110057&bestfit=yes&width=300';
*/

		newPage.css('position', 'absolute');
		var oldProps = new Object;
		var newProps = new Object;
		if (effect == 'up')
		{
			newPage.css('left', 0);
			newPage.css('top', oldPage.height());
			newPage.width(area.width());

			oldProps.top = -oldPage.height();
			newProps.top = 0;
		}
		else if (effect == 'down')
		{
			newPage.css('left', 0);
			newPage.css('top', -newPage.height());
			newPage.width(area.width());

			oldProps.top = newPage.height();
			newProps.top = 0;
		}
		newPage.show();

		var areaProps = new Object;
		areaProps.height = newPage.height();
		area.animate(areaProps, duration, function()
		{
		});

		oldPage.animate(oldProps, duration, function()
		{
			oldPage.remove();
		});

		newPage.animate(newProps, duration, function()
		{
			var oldPrev = $('.display-prev');
			var newPrev = result.find('.display-prev');
			if (newPrev.attr('href'))
				oldPrev.attr('href', newPrev.attr('href'));
//			else
//				oldPrev.removeAttr('href');

			var oldNext = $('.display-next');
			var newNext = result.find('.display-next');
			if (newNext.attr('href'))
				oldNext.attr('href', newNext.attr('href'));
//			else
//				oldNext.removeAttr('href');

			if (callback)
				callback(newPage);
		});
	});
}

/* History */
imu.display.history.index = -1;

imu.display.history.add = function(url)
{
	this.push(url);
	this.index = this.length - 1;
}

imu.display.history.current = function()
{
	if (this.index < 0)
		return null;
	return this[this.index];
}



imu.display.setupBrowser = function()
{
        $('.ie7browser').hide();
        if($.browser.msie)
        {
                if( parseInt($.browser.version, 10) == 7)
                {
                        $('.otherbrowser').hide();
                        $('.ie7browser').show();
			var fieldset = $('.fs');
			fieldset.removeClass('.otherbrowserfieldset');
			fieldset.addClass('.ie7browserfieldset');
			$('.display-region').addClass('.ie7-display-region');
                }
        }
}


$(document).ready(function()
{
	if (! imu.javascript)
		return;

	imu.display.setup();
});

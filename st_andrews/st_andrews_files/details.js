imu.display.views.details = new Object;

imu.display.views.details.setupPage = function()
{
	imu.display.views.setupNavigation();
	imu.setupCheckboxes();
	this.setupBrowser();
	
	/*
	$('#browse-tree').treeview({
			collapsed: true
			});
	*/
	var recordlevel = $('.details-row').attr('recordlevel');
	if (recordlevel == 'Content')
		recordlevel = 'Image';
	var headertext = recordlevel + ' Details';
	$('.content-header').text(headertext);

	var subjects = $('.display-subject');
	subjects.unbind('click');
	subjects.click(function()
	{
		var url = $(this).attr('href');
		imu.display.fadeIn(url, function()
		{
			imu.display.history.add(url);
			imu.display.setupPage();
		});
		return false;
	});

	/* Markup the subjects with hits */
	subjects.each(function()
	{
		var subject = $(this);
		var url = subject.attr('href');
		url += '&redirect=no';
		ke.get(url, function(display)
		{
			var params = ke.getParams(display);
			var url = imu.getURL();
			var options = imu.getOptions('hits');
			options.port = params.port;
			options.id = params.id;
			ke.get(url, options, function(result)
			{
				if (result >= 0)
				{
					var text = subject.text();
					text += ' (' + result + ')';
					subject.text(text);
				}
				if (result >= 2)
					subject.attr('href', display);
				else
				{
					subject.removeAttr('href');
					subject.unbind('click');
				}
			});
		});
	});
}



imu.display.views.details.setupBrowser = function()
{
        $('.ie7browser').hide();
        if($.browser.msie)
        {
                if( parseInt($.browser.version, 10) == 7)
                {
                        $('.otherbrowser').hide();
                        $('.ie7browser').show();
			var fieldset = $('.fs');
			$(".fs").css("border-color", "#fff");
			var region = $('.display-region');
			region.addClass('ie7-display-region');
                }
        }
}


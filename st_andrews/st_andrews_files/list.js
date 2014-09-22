imu.display.views.list = new Object;

imu.display.views.list.setupPage = function(linkTitle)
{
	//this.setupBrowser();

	imu.display.views.setupNavigation();
	imu.setupCheckboxes();

		var titles = $('.list-title a');
		titles.unbind('click');
		titles.click(function()
		{
			var url = $(this).attr('href');
			imu.display.fadeIn(url, function()
			{
				imu.display.history.add(url);
				imu.display.setupPage();
			});
			return false;
		});

	var supplementary = $('.list-content');
	supplementary.unbind('click');
	supplementary.click(function()
	{
		$('.row').removeClass('list-selected');
		$(this).parent().parent().addClass('list-selected');	

		var irn = $(this).attr('irn');
		var listcnt = $(this).attr('listcount');
		var text = 'irn=';
		text += irn;
		text += '&view=details';
		text += '&ecatalogue=on';
		text += '&listcount=';
		text += listcnt;
		var region = $('.display-list-region');
		region.empty();
		var url = imu.getRequest('load', text);
		ke.get(url, function(html)
		{
			/* Convert the html text to a jQuery object */
			var result = $(html);

			/* Select any elements in this chunk of html 
			 * which have a class of "display-supplementary" */
			var newContent = result.find('.display-details-region');

			/* fiddle with the content if necessary */
			
			/* Add the content into the page itself */
			region.append(newContent);
			var area = $('.display-region');
			var page = $('.display-page')
			area.height(page.height());

			if ($(window).scrollTop() > page.offset().top)
			{
				region.css('margin-top', $(window).scrollTop() - page.offset().top);
			}
			else
			{
				region.css('margin-top', 0);
			}
			/*if($.browser.msie) 
			{
				region.fireEvent('onmove');
			}
			*/

		});

		return false;
	});

}



/*
imu.display.views.list.setupBrowser = function()
{
        $('.ie7browser').hide();
        if($.browser.msie)
        {
                if( parseInt($.browser.version, 10) == 7)
                {
                        $('.otherbrowser').hide();
                        $('.ie7browser').show();
                }
        }
}
*/



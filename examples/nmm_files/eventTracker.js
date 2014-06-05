jQuery(document).ready(function () {

    jQuery('a').mouseup(function () {
        href = jQuery(this).attr('href');
        href_lower = href.toLowerCase();
        if (href_lower.substr(-3) == "pdf" || href_lower.substr(-3) == "xls" || href_lower.substr(-3) == "doc" ||
  			   href_lower.substr(-3) == "mp3" || href_lower.substr(-3) == "mp4" || href_lower.substr(-3) == "flv" ||
  			   href_lower.substr(-3) == "txt" || href_lower.substr(-3) == "csv" || href_lower.substr(-3) == "zip") {
            _gaq.push(['_trackEvent', 'Downloads', href_lower.substr(-3), href]);
        }
        if (href_lower.substr(0, 4) == "http") {
            var domain = document.domain.replace("www.", '');
            if (href_lower.indexOf(domain) == -1) {
                href = href.replace("http://", '');
                href = href.replace("https://", '');
                _gaq.push(['_trackEvent', 'externals', href]);
            }
        }
    });
});

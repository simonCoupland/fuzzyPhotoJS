function inclusion() {

	this.userAgent = navigator.userAgent.toLowerCase();
	this.isSafari = ((this.userAgent.indexOf('safari')!=-1)&&(this.userAgent.indexOf('mac')!=-1))?true:false;
		
	if ( this.isSafari) {
    //Inclusion d'une feuille de style css pour Safari
    var css_style=document.createElement("link");
    css_style.setAttribute("rel", "stylesheet");
    css_style.setAttribute("type", "text/css");
    css_style.setAttribute("href", "fileadmin/templates/safari.css");
    document.getElementsByTagName("head")[0].appendChild(css_style);
	}
	if((new RegExp("opera")).test(this.userAgent)){
	 //Inclusion d'une feuille de style css pour Safari
    var css_style=document.createElement("link");
    css_style.setAttribute("rel", "stylesheet");
    css_style.setAttribute("type", "text/css");
    css_style.setAttribute("href", "fileadmin/templates/opera.css");
    document.getElementsByTagName("head")[0].appendChild(css_style);
	}

}
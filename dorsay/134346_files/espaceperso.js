function Album_Set_Cookie( name, value, expires, path, domain, secure ) {

	var today = new Date();
	today.setTime( today.getTime() );

	if ( expires ){
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" + escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
	( ( path ) ? ";path=" + path : "" ) + 
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}

function Album_Get_Cookie( name ) {
	
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) &&
			( name != document.cookie.substring( 0, name.length ) ) )
	{
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}

function Album_Ajout_Cookie(ref){
	
	if(!Album_Get_Cookie("orsay")){
		Album_Set_Cookie("orsay", "O:6:\"Cookie\":1:{s:9:\"Liste_uid\";s:0:\"\";}" ,365,"/","",0);
	}
	var cookie = Album_Get_Cookie("orsay");
	var liste_uid = Album_Get_Cookie("orsay").substr(37,Album_Get_Cookie( "orsay" ).length-3);
	var fin ="\";}";
	var ref2 = ";" + ref;
				
			
	if( (liste_uid.lastIndexOf(";"+ ref + ";"))==-1 && (liste_uid.lastIndexOf(ref + ";")!==0) && ((liste_uid.lastIndexOf(";" + ref))!== liste_uid.length - ref2.length) && (ref != "") ){	
		var temp = new Array();
		temp = (cookie.substring(34)).split(':');
		Album_Set_Cookie("orsay", cookie.substr(0,34) + parseInt( parseInt(temp[0],10) + ref.length +1 ,10) + cookie.substr(cookie.lastIndexOf(":"),cookie.length-3 - cookie.lastIndexOf(":")) + ref + ";" + fin,365,"/","",0);
		alert(lib_ajout_album); 
	}
	else{
		alert(lib_nonajout_album); 
	}		
}	


function Visite_Set_Cookie( name, value, expires, path, domain, secure ) {

	var today = new Date();
	today.setTime( today.getTime() );

	if ( expires ){
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" + escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
	( ( path ) ? ";path=" + path : "" ) + 
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}
					
function Visite_Get_Cookie( name ) {
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) &&
	( name != document.cookie.substring( 0, name.length ) ) )
	{
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}
				
function Visite_Ajout_Cookie(ref,string1,string2){
	if(!Visite_Get_Cookie("orsay_visite")){
		Visite_Set_Cookie("orsay_visite", "O:6:\"Cookie\":1:{s:9:\"Liste_uid\";s:0:\"\";}" ,365,"/","",0);
	}
	var cookie = Visite_Get_Cookie("orsay_visite");
	var liste_uid = Visite_Get_Cookie("orsay_visite").substr(37,Visite_Get_Cookie( "orsay_visite" ).length-3);
	var fin ="\";}";
	var ref2 = ";" + ref;
						
	if( (liste_uid.lastIndexOf(";"+ ref + ";"))==-1 && (liste_uid.lastIndexOf(ref + ";")!==0) && ((liste_uid.lastIndexOf(";" + ref))!== liste_uid.length - ref2.length) && (ref != "") ){	
		var temp = new Array();
		temp = (cookie.substring(34)).split(':');
		Visite_Set_Cookie("orsay_visite", cookie.substr(0,34) + parseInt( parseInt(temp[0],10) + ref.length +1 ,10) + cookie.substr(cookie.lastIndexOf(":"),cookie.length-3 - cookie.lastIndexOf(":")) + ref + ";" + fin,365,"/","",0);
		alert(lib_ajout_visite); 
	}
	else{
		alert(lib_nonajout_visite); 
	}		
}
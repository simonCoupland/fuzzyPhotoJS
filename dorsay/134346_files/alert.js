/* alertes */

function check(texte,mail,nom,msg,no_critera){
	var mess='';
	var ok=1;
	
	if(document.alert.email.value=='' || document.alert.name.value=='' || document.alert.message.value==''){
		mess = texte + " : " + "\n" + "\n";
	}
	if(document.alert.email.value==''){
		mess += mail + "\n"; 
		ok=0;
	}
	if(document.alert.name.value==''){
		mess += nom + "\n"; 
		ok=0;
	}
	if(document.alert.message.value==''){
		mess += msg + "\n"; 
		ok=0;
	}
	
	/* correction 1 */
	
	if( (document.alert.flag_avant_debut_event.checked != true) && (document.alert.flag_avant_fin_event.checked != true)){
		
mess += "\n" + no_critera + "\n";
		ok=0;
	}
		

	if(ok == 0){
		alert(mess);
		return false;
	}
	else{
		return true;
	}
}
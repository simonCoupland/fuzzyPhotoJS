
function form_focus(){

try {
var taille = document.forms[0].elements.length;
}
catch(e) {return;}
var name;
var i = 0;
var focus=0;
while((focus == 0) && (i<taille)){

if (document.forms[0].elements[i].type == "text") {
document.forms[0].elements[i].focus();
focus= 1;
}

i++;
}

}

window.onload = function() {
		initMenu();
		form_focus();
} 
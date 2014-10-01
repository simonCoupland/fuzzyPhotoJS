function GetId(id)
{
return document.getElementById(id);
}

var i=false; // La variable i nous dit si la bulle est visible ou non

 
function montre2(text) {
  if(i==false) {
  GetId("curseur").style.visibility="visible"; // Si il est cacher (la verif n'est qu'une securité) on le rend visible.
  GetId("curseur").innerHTML = text; // Cette fonction est a améliorer, il parait qu'elle n'est pas valide (mais elle marche)
  i=true;
  }
}
function cache2() {
if(i==true) {
GetId("curseur").style.visibility="hidden"; // Si la bulle etais visible on la cache
i=false;
}
}
			
var icureur=false; // La variable i nous dit si la bulle est visible ou non

function move(e) {
				  if(icureur) {  // Si la bulle est visible, on calcul en temps reel sa position ideale
				    if (navigator.appName!="Microsoft Internet Explorer") { // Si on est pas sous IE
				    GetId("curseur2").style.left=e.pageX + 5+"px";
				    GetId("curseur2").style.top=e.pageY + 10+"px";
				    }
				    else { // Modif proposé par TeDeum, merci à lui
				    GetId("curseur2").style.position="absolute";
				    if(document.documentElement.clientWidth>0) {

				        GetId("curseur2").style.left=20+event.clientX +document.documentElement.scrollLeft+"px";
				        GetId("curseur2").style.top=10+event.clientY +document.documentElement.scrollTop+"px";
				    }
				    else {
				        GetId("curseur2").style.left=20+event.clientX+document.body.scrollLeft+"px" // +540;
				        GetId("curseur2").style.top=10+event.clientY+document.body.scrollTop+"px"  // +85;
				    }
				    }
				  }
}
				
function montre(text) {
				  if(icureur==false) {
				  GetId("curseur2").style.visibility="visible"; // Si il est cacher (la verif n'est qu'une securité) on le rend visible.
				  GetId("curseur2").innerHTML = text; // Cette fonction est a améliorer, il parait qu'elle n'est pas valide (mais elle marche) 
				  icureur=true;
				  }
}

function cache() {
				if(icureur==true) {
				GetId("curseur2").style.visibility="hidden"; // Si la bulle etais visible on la cache
				icureur=false;
				}
}

document.onmousemove=move;

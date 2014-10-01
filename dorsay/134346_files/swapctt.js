function swapctt(id,title){
	var nom = "content"+id;
	var element = document.getElementById(nom);
	if (element.style.display == "block"){
	element.style.display="none";
	title.className="headerswapOff linkCat";
	}
	else{
	element.style.display="block";
	title.className="headerswap linkCat";
	}
	
}
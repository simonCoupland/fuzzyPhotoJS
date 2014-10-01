

/* notice d'oeuvre slide */

	function overOut(name,imgObj){

		if (document.getElementById(name))
			{document.getElementById(name).src = imgObj;}
	}
	
	var actNum=0;

	function slideNext(){
		var allli=document.getElementById('slideCtt').getElementsByTagName("li");
		if(actNum<(allli.length-7))
		{
			allli[actNum].style.display="none";
			actNum+=1;
		}
		chkBtt();
	}
	function slidePrev(){
		var allli=document.getElementById('slideCtt').getElementsByTagName("li");
		if (actNum>0)
		{	
			actNum-=1;			
			allli[actNum].style.display="inline";		
		}
		chkBtt();
	}
	
	function chkBtt(){
		var allli=document.getElementById('slideCtt').getElementsByTagName("li");
		document.getElementById('prevBtt').className=(actNum=='0')?"noBtt":"prevBtt";
		document.getElementById('nextBtt').className=(actNum==(allli.length-7))?"noBtt":"nextBtt";
	}
	
	function swpBtt(bttName, newClass)
	{
		bttName.className=bttName.className=="noBtt"?"noBtt":newClass;
	}
	
	
	function slideAdjust(val)
	{
		var allli=document.getElementById('slideCtt').getElementsByTagName("li");
		for(i = 0; i < val; i++){
			slideNext();
		}
		chkBtt();
	}




/* notice d'oeuvre slide  fin */

//
var w=null
var ReqLine;
var olddate;
var pertimm_langue=0;
/********************************************************/
function zse_to()
{
	var d=new Date();
	var i=d - olddate;
	if (i <500) return;
	s=ReqLine.value;
	s=s.trim();
	if (s=="") return;
	s=ReqLine.value
	i=s.lastIndexOf(',');
	if(i>0) {
		s=s.substring(i+1,s.length);
	}
	s=s.trim();
	if (s=="") return;
	s=s.replace(/\s+/, "_");
	zsi_xml_chmot(s);	
}
var last_timeout=null;
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
function zse_press(evt,func)
{
	try {clearTimeOut(last_timeout);} catch(e) {}
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
	ReqLine=(evt.target) ? evt.target : evt.srcElement;//evt.srcElement;
	var d=new Date();
	olddate=d;
	last_timeout=setTimeout(func, 500);
	}
}
function zse_quit()
{
	var d=new Date();
	olddate=d;
}
var cancel=0;
function zsi_xml_chmot(str)
{
	if(!pertimm_langue) pertimm_langue=0;
	
	if(str.length<3) return;
	cancel+=1;
	var requested=cancel;
	var f=document.forms.request;
	var opts="&zs_mw="+f.zs_mw.value;
	opts+="&zs_wf="+f.zs_wf.value;
	opts+="&zs_ah="+f.zs_ah.value;
	opts+="&zs_la="+f.zs_la.value;
	$("div#suggest").css("border","0px solid black");
	$("div#suggest").html('');
	$("div#suggest").html('<blink>...</blink>'+lib_recherche_suggestion+'<blink>...</blink>');
	
	$.get(zs_target_base_url+"/zsearch/zs/wordxml.php?pertimm_langue="+pertimm_langue+"&reqnum="+cancel+"&zsz=1&zs_word="+escape(str)+opts,function(xml){
      		var str='';
      		reqnum=$("reqnum",xml);
      		reqnum=reqnum.text();
      	
      		//if(reqnum != cancel) return;
      	
      	str+='<div style="float:left; max-width: 300px;">';
      		$("word",xml).each(
      			function(i) {
      				str+=zsi_suggest_build(this);
      			}
      		);
      	str+='</div><div style="float:right; max-width: 178px;">'+lib_suggestion_musee+'<br/><br/>';
      		$("mot",xml).each(
      			function(i) {
      				str+=zsi_suggest_build2(this);
      			}
      		);
      	str+='</div>';
      		if(str!='') {
      			
      			str='<div><div align="right"><span class="zspusehelp" align="right" onclick="$(\'div#suggest\').slideUp(\'slow\')" >'+lib_fermer+'</span></div>'+'<div>'+str+'</div></div>';
      			//str='<div style="float:right" onclick="$(\'div#suggest\').slideUp(\'slow\')" >Fermer</div>'+str;
			$("div#suggest").css("border","1px solid black");
		} else {
			str='<span color="red">'+lib_nosuggest+'</span>';
		}
		
		$("div#suggest").css("min-height","20px");
			 	try{
			 		$("div#suggest").css("height","inherit");
				} catch(e) {
					
				}
				
		$("div#suggest").html(str);
		$("div#suggest").slideDown("slow");
    	});
}
function zsi_suggest_build(xmlWord) {
	var cn=$("code",xmlWord).text();
	var cz=$("zone",xmlWord).text();
	var str="";
	if(!cn) return '';
		str += "<a>";
		if(cz) str += "["+cz+"] ";
		str+="<span class='zspusehelp' onclick='zsi_add(this)'>"+cn+"";
		str+="</span></a><br/>";
		
	return str;	
}
function zsi_suggest_build2(xmlWord) {
	var str='';
		var txt=$(xmlWord).text();
		if(!txt) return;
		str+= "<a>";
		str+="<span class='zspusehelp' onclick='zsi_add(this)'>"+txt+"";
		str+="</span></a><br/>";
		
	return str;	
}

/********************************************************/

/********************************************************/
function zse_xychmot(evt)
{
	var f=document.forms.request;
	if (!f.zs_mw) return
	var opts=f.zs_mw.value;
	if (opts==0) return;
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
	var col=(evt.target) ? evt.target : evt.srcElement;//event.srcElement;
	ReqLine=col;
	if (col.value=="") return;
	s=col.value.split(" ");
	zsi_chmot(s[s.length - 1]);
	}
}
function zsi_add(obj)
{
	var org="";
	var s=ReqLine.value;
	var t=s.lastIndexOf(",");
	if (t>0)
		org=s.substring(0, t)+', ';
	ReqLine.value = org+(obj.innerText || obj.textContent);	
	$("div#suggest").slideUp("slow");
	try {ReqLine.focus(); } catch(e) {}	
}


/********************************************************/
function zsi_chmot(str)
{
	var f=document.forms.request;
	var opts="&zs_mw="+f.zs_mw.value;
	opts+="&zs_wf="+f.zs_wf.value;
	opts+="&zs_ah="+f.zs_ah.value;
	opts+="&zs_la="+f.zs_la.value;
	submitwindow=window.open(zs_target_base_url+"/zsearch/word.php?zsz=1&zs_word="+escape(str)+opts,"wordwin","menubar=no, toolbar=no,directories=no, scrollbars=yes, left=500, top=0, screenX=500, screenY=0, height=400,width=250");
	submitwindow.focus();
}
/********************************************************/

function zsp_chdoc(str, no, oc)
{
	submitwindow=window.open(zs_target_base_url+"/index.php?id=notice&zsz=1&zs_doc="+str+"&zs_no="+no+"&zs_oc="+oc,"docwin","menubar=no, toolbar=no,directories=no, scrollbars=yes, left=100, top=0, screenX=0, screenY=0, height=600,width=800");
	submitwindow.focus();
}
function zsp_go_view(part)
{
	o=document.getElementById('towait')
	if (o) o.style.display='none';
	o=document.getElementById('prefs')
	if (o) o.style.display=(part==1?'':'none');
	o=document.getElementById('search');
	if (o) o.style.display=(part==2?'':'none');
	o=document.getElementById('result');
	if (o) o.style.display=(part==3?'':'none');
}
function readForm(postform) {
	var postparam='';
	var reg=new RegExp('(")', "g");
	var current='';
	$("input",postform).each( function(i) { 
		if(this.name == '') return;
		if(this.type=="checkbox" || this.type=="radio")
			if(!this.checked) return;
		if(this.type=="submit" || this.type=="image") return;
		current = this.value;
		current = current.replace(reg,'');
		
		postparam += " '" + this.name+'\' : "'+current+'" , ';
	});
	$("select",postform).each( function(i) { 
		if(this.name == '') return;
		postparam += " '" + this.name+'\' : "'+this.value+'" , ';
	});
	return postparam;
}
var histo=0;
function save_histo() {
alert(lib_memo);
if(histo) return;
histo=1;
$("histo").hide();
$("histo").html(lib_rechmemo);
$("histo").show();
$.post(zs_target_base_url+'/zsearch'+'/zs/histo.php','',
	function (xml) {
		$("histo").html(lib_rechmemook);
	}
);
}

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
function proxyhelpcol(postform,divid,waitmessage,moreparam,close, scn) {
	
	if (!scn) scn='proxyhelpcol';
	if(moreparam==undefined) moreparam=' ajaxme: "ajaxme" ';
	else {
		moreparam += ' ajaxme: "ajaxme" ';
	}
	var postparam=readForm(postform);
	try {
		$(divid).get(0).parentElement.focus();
	} catch(e) {
		try {
		$(divid).get(0).focus();
		} catch(e) {
		}
	}
	//$(divid).slideUp("fast");
	$(divid).css("border","0px solid black");
	$(divid).html(waitmessage);
	$(divid).show();
	
	postparam = 'postparam = { '+postparam+moreparam +' };';
	try { postparam=eval(postparam);
	} catch(e) {
		return;
	}
	$.post(zs_target_base_url+'/zsearch'+'/zs/'+scn+'.php',
		postparam,
		function(xml) {

			 if(forceclose==1 || close==1)
			 	xml='<div style="float:right; border-left:1px #000000 solid; border-bottom:1px #000000 solid" onclick="$(\''+divid+'\').hide()" class="zspusehelp">X</div>'+xml;
			 $(divid).css("border","1px solid black");
			 $(divid).css("min-height","20px");
			 	try{
			 		$(divid).css("height","inherit");
				} catch(e) {
					
				}
			 $(divid).html(xml); 
			 //$(divid).slideDown("fast"); 
		}
	);
}
function zsi_set_dummy_event_img(evt,key, value, divid, waitmessage,close, action,scn) {
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
		try { evt.stopPropagation(); } catch(e) {};
		try { evt.preventDefault(); } catch(e) {};
		try { evt.cancelBubble=true; } catch(e) {};
		try { evt.returnValue=false; } catch(e) {};
		var buttonclick = (evt.target) ? evt.target : evt.srcElement;
		var moreparam= '';
			moreparam += '\''+action+ '_x\' : "1" ,';
		zsi_set_dummy(key, value, divid, waitmessage, moreparam,close,scn);	
	}
	return false;
}
function zsi_set_dummy_event(evt,key, value, divid, waitmessage,close, moreparam,scn) {
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
		try { evt.stopPropagation(); } catch(e) {};
		try { evt.preventDefault(); } catch(e) {};
		try { evt.cancelBubble=true; } catch(e) {};
		try { evt.returnValue=false; } catch(e) {};
		var buttonclick = (evt.target) ? evt.target : evt.srcElement;
		var moreparam= '';
		if(buttonclick) if(buttonclick.type) if(buttonclick.type=="image")
			if(buttonclick.name)
			moreparam += '\''+buttonclick.name + '_x\' : "1" ,';
		zsi_set_dummy(key, value, divid, waitmessage, moreparam,close,scn);	
	}
	return false;
}
function zsi_set_help_event_img(evt,key, value, divid, waitmessage,close, action,scn) {
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
		try { evt.stopPropagation(); } catch(e) {};
		try { evt.preventDefault(); } catch(e) {};
		try { evt.cancelBubble=true; } catch(e) {};
		try { evt.returnValue=false; } catch(e) {};
		var buttonclick = (evt.target) ? evt.target : evt.srcElement;
		var moreparam= '';
		var hff='zs_'+value;
		o=eval("document.forms.request."+hff);
		var reg=new RegExp('(")', "g");
		var current = '';
		current = o.value.replace(reg,'');
			moreparam += '\''+action+ '_x\' : "'+current+'" ,';
		zsi_set_dummy(key, value, divid, waitmessage, moreparam,close,scn);	
	}
	return false;
}
function zsi_set_help_event(evt,key, value, divid, waitmessage,close, moreparam,scn) {
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
		try { evt.stopPropagation(); } catch(e) {};
		try { evt.preventDefault(); } catch(e) {};
		try { evt.cancelBubble=true; } catch(e) {};
		try { evt.returnValue=false; } catch(e) {};
		var buttonclick = (evt.target) ? evt.target : evt.srcElement;
		var moreparam= '';
		var hff='zs_'+value;
		o=eval("document.forms.request."+hff);
		var reg=new RegExp('(")', "g");
		var current = '';
		current = o.value.replace(reg,'');
		if(buttonclick) if(buttonclick.type) if(buttonclick.type=="image")
			if(buttonclick.name)
			moreparam += '\''+buttonclick.name + '_x\' : "'+current+'" ,';
		zsi_set_dummy(key, value, divid, waitmessage, moreparam,close,scn);	
	}
	return false;
}

/********************************************************/
function zsi_set_dummy(key, value, divid, waitmessage,moreparam,close,scn)
{
	moreparam += " "+ key + ': "'+value+'" , ';
	if(divid==undefined || !$(divid).get(0) ) {
			document.forms.request.action=zs_target_form+"&zsz=1&zs_aff=h";
			document.forms.request.dummy.name=key;
			document.forms.request.dummy.value=value;
			return true;
	}
	$("div[@class='genhelp']").hide();
	if(forceclose) close=1;
	proxyhelpcol(document.forms.request,divid,waitmessage,moreparam,close,scn);
	return false;
}

function zsp_use_help(obj, field,src)
{
	var f=eval("document.forms.request.zs_"+field);
	if (f)
		f.value=obj.innerText || obj.textContent;
	$("div[@class='genhelp']").hide();
	f.focus();
	return false;
}
function zsp_add_help_event(evt,obj,field) {
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
		try { evt.stopPropagation(); } catch(e) {};
		try { evt.preventDefault(); } catch(e) {};
		try { evt.cancelBubble=true; } catch(e) {};
		try { evt.returnValue=false; } catch(e) {};
	}
	zsp_add_help(obj, field);
	return false;
}
function zsp_add_help(obj, field)
{
	var f=eval("document.forms.request.zs_"+field);
	if (f)
	{
		if (f.value != "") f.value+=", ";
		//mboilley 03/11/2009 mantis  0141
		f.value /*+*/=obj.innerText || obj.textContent;
	}
	$("div[@class='genhelp']").hide();
	zsp_go_view(2);
	return false;
}

function zsp_call_help(obj, field, src, cpt)
{
	var moreparam ='';
	moreparam = ' zs_h2_'+src+'_x : "'+cpt+'" , ';

	if(zsi_set_dummy("zs_help",field,"div#genhelp"+(src.replace(/_[0-9]*$/,'')),"<blink>...</blink>"+lib_recherche_en_cours+"<blink>...</blink>",moreparam))
	{
		document.forms.request.dummy2.name="zs_h2_"+src+"_x";
		document.forms.request.dummy2.value=cpt;
		document.forms.request.submit();
	}
	return false;
}
function zsp_call_help2_event(evt,obj, field, src, cpt) {
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
		try { evt.stopPropagation(); } catch(e) {};
		try { evt.preventDefault(); } catch(e) {};
		try { evt.cancelBubble=true; } catch(e) {};
		try { evt.returnValue=false; } catch(e) {};
	}
	zsp_call_help2(obj, field, src, cpt);
	return false;
}
function zsp_call_help2(obj, field, src, cpt)
{
	var moreparam ='';
	moreparam = ' zs_h1_'+src+'_x : "'+cpt+'" , ';

	if(zsi_set_dummy("zs_help",field,"div#genhelp"+(src.replace(/_[0-9]*$/,'')),"<blink>...</blink>"+lib_recherche_en_cours+"<blink>...</blink>",moreparam))
	{
		document.forms.request.dummy2.name="zs_h1_"+src+"_x";
		document.forms.request.dummy2.value=cpt;
		document.forms.request.submit();
	}
	return false;
	
}

function zsp_toggle(obj)
{
	/*var s=obj.style.display;
	if (s=='' || s=='block') obj.style.display='none';
	else obj.style.display='block';*/
}
Array.prototype.in_array = function(valeur) {
 for (var i in this) {
   if (this[i] == valeur) return true;
 }
 return false;
}
function zsp_page_help_event(evt,field, start, src, filtre) {
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
		try { evt.stopPropagation(); } catch(e) {};
		try { evt.preventDefault(); } catch(e) {};
		try { evt.cancelBubble=true; } catch(e) {};
		try { evt.returnValue=false; } catch(e) {};
		zsp_page_help(field, start, src, filtre)
	}
	return false;
}
function zsp_page_help(field, start, src, filtre)
{
	var moreparam='';
	moreparam='zs_help :\"'+field+'\" , ';
	moreparam+='zs_sfh :\"'+start+'\" , ';
	moreparam+='zs_hf_'+src+'_x' +':\"'+filtre+'\" , ';
	ajaxme(moreparam,src);
	return false;
}
function callhelp(moreparam,src) {
	ajaxme(moreparam,src);
	return false;
}
function ajaxme(moreparam,src) {
	proxyhelpcol(document.forms.request,"div#genhelp"+src,'<blink>...</blink>'+lib_recherche_en_cours+'<blink>...</blink>',moreparam);
	return false;
}
function zsp_use_help_event(evt,obj,field,src) {
evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
		try { evt.stopPropagation(); } catch(e) {};
		try { evt.preventDefault(); } catch(e) {};
		try { evt.cancelBubble=true; } catch(e) {};
		try { evt.returnValue=false; } catch(e) {};
		zsp_use_help(obj,field,src);
	}
	return false;
}
function zsp_call_help_event(evt,obj, field, src, cpt) {
evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
		try { evt.stopPropagation(); } catch(e) {};
		try { evt.preventDefault(); } catch(e) {};
		try { evt.cancelBubble=true; } catch(e) {};
		try { evt.returnValue=false; } catch(e) {};
		zsp_call_help(obj, field, src, cpt);
	}
	return false;
}





function zsp_chdoc(str, no, oc)
{
	submitwindow=window.open(zs_target_base_url+"/index.php?id=notice&zsz=1&zs_doc="+str,"docwin","menubar=no, toolbar=no,directories=no, scrollbars=yes, left=100, top=0, screenX=0, screenY=0, height=600,width=800");
	submitwindow.focus();
}

	function overOut(name,imgObj){

		if (document.getElementById(name))
			{document.getElementById(name).src = imgObj;}
	}


	function divHover(divact, texte){
		if(divact.className.lastIndexOf(" hover")!=-1)
		{
			divact.className=divact.className.substring(0,divact.className.lastIndexOf(" hover"))
		}
		else
		{
			divact.className=divact.className + " hover"

		}
	}


			

				function montrePlan(id, color)
				{
				   if (GetId(id))
				   {
					GetId(id).style.backgroundColor = color;
				   }
				}

				
var forceclose=0;

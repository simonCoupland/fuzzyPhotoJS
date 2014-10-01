	if(!window.Node){
  var Node = {ELEMENT_NODE : 1, TEXT_NODE : 3};
}

function checkNode(node, filter){
  return (filter == null || node.nodeType == Node[filter] || node.nodeName.toUpperCase() == filter.toUpperCase());
}

function getChildren(node, filter){
  var result = new Array();
  var children = node.childNodes;
  for(var i = 0; i < children.length; i++){
    if(checkNode(children[i], filter)) result[result.length] = children[i];
  }
  return result;
}

function getChildrenByElement(node){
  return getChildren(node, "ELEMENT_NODE");
}

function getFirstChild(node, filter){
  var child;
  var children = node.childNodes;
  for(var i = 0; i < children.length; i++){
    child = children[i];
    if(checkNode(child, filter)) return child;
  }
  return null;
}

function getFirstChildByText(node){
  return getFirstChild(node, "TEXT_NODE");
}

function getNextSibling(node, filter){
  for(var sibling = node.nextSibling; sibling != null; sibling = sibling.nextSibling){
    if(checkNode(sibling, filter)) return sibling;
  }
  return null;
}
function getNextSiblingByElement(node){
        return getNextSibling(node, "ELEMENT_NODE");
}

// Menu Functions & Properties

var activeMenu = null;

function showMenu() {
  if(activeMenu){
    activeMenu.className = "";
    getNextSiblingByElement(activeMenu).style.display = "none";
  }
  if(this == activeMenu){
    activeMenu = null;
  } else {
    this.className = "active";
    getNextSiblingByElement(this).style.display = "block";
    activeMenu = this;
  }
  return false;
}

function initMenu(){
	inclusion();
	if (typeof(loadselect) != "undefined") setForm();
  var menus, menu, text, a, i;
  if (document.getElementById("menupro")) {
  menus = getChildrenByElement(document.getElementById("menupro"));
  for(i = 0; i < menus.length; i++){
    menu = menus[i];
    text = getFirstChildByText(menu);
    a = document.createElement("a");
    menu.replaceChild(a, text);
    a.appendChild(text);
    a.href = "#";
    a.onclick = showMenu;
    a.onfocus = function(){this.blur()};
  }
}
if (document.getElementById("menupar")) {
  menus = getChildrenByElement(document.getElementById("menupar"));
  for(i = 0; i < menus.length; i++){
    menu = menus[i];
    text = getFirstChildByText(menu);
    a = document.createElement("a");
    menu.replaceChild(a, text);
    a.appendChild(text);
    a.href = "#";
    a.onclick = showMenu;
    a.onfocus = function(){this.blur()};
  }
}
}

	function overOut(name,imgObj){

		if (document.getElementById(name))
			{document.getElementById(name).src = imgObj;}
	}


if(document.createElement) window.onload = initMenu;


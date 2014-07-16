// Initialises the fuzzyPhoto elements of the page

var g_records;

function initFP(m_id) 
{
	// Obtain any links from the fuzzyPhoto server
	var jqXHR = FPGetRecord(0, m_id);
	
	// Check if any file was found
	if(jqXHR.status == 200)
	{
	  // If so parse to JSON and render
	  var m_recordsStr = jqXHR.responseText;
	  m_recordsStr = FPXmlToJSON(m_recordsStr);
	  g_records = eval("(" + m_recordsStr + ")");
	  
	  // If any links are founds then ...
	  if(g_records.linksFound)
	  {
		 // add a link on the page to the modal window
		 $("#content dl").append("<dt>Links:</dt><dd>Click <span onclick='showFP();' style='text-decoration:underline;cursor:pointer;'>here</span> to view similar items from a range of collections.<a href='#' title='Similar photographs from a range of museums.'><img id='FPlogo' src='erps/FPlogo.png'></a></dd>");
		 
		 // add the content of the modal window
		 $("#FPTabbedModalContent").append("<ul></ul>");
		 if(g_records.linkCounts[0] > 0) 
		 {
			$("<li><a href='#FP_allFields'>All Fields</a></li>").appendTo("#FPTabbedModalContent ul");
			var str = "<div id='FP_allFields'>" + ERPSFormattedString(0, g_records.allFields, g_records.linkCounts[0]) + "</div>";
			$("#FPTabbedModalContent").append(str);
		 }
		 if(g_records.linkCounts[1] > 0) 
		 {
			$("<li><a href='#FP_title'>Title</a></li>").appendTo("#FPTabbedModalContent ul");
			var str = "<div id='FP_title'>" + ERPSFormattedString(0, g_records.title, g_records.linkCounts[1]) + "</div>";
			$("#FPTabbedModalContent").append(str);
		 }
		 if(g_records.linkCounts[2] > 0) 
		 {
			$("<li><a href='#FP_person'>Person</a></li>").appendTo("#FPTabbedModalContent ul");
			var str = "<div id='FP_person'>" + ERPSFormattedString(0, g_records.person, g_records.linkCounts[2]) + "</div>";
			$("#FPTabbedModalContent").append(str);
		}
		
		// Render the tabbed modal window
		$( "#FPTabbedModalContent" ).tabs({ active: 0 });
		$("#FPTabbedModalContent").prepend("<p><b>Similar items you may be interested in grouped by:</b></p>");
		$( "#FPTabbedModalContent" ).dialog({'modal':true,'minWidth':600, 'minHeight':400,'draggable':true,resizable: false });
		$( "#FPTabbedModalContent" ).dialog( "close" );
	  }
	}
};

function showFP()
{
	$( "#FPTabbedModalContent" ).dialog( "open" );
}

function ERPSFormattedString(m_groupIndex, m_linkArray, m_linkCount) 
{
	var l_str = "<div style='padding-top:10px;'>"; // an empty string
	// The start index of the link array
	var l_startIdx = Math.min(m_groupIndex*10, m_linkArray.length);
	// The end index of the math array - display 10 at one time
	var l_endIdx = Math.min((m_groupIndex+1)*10, m_linkArray.length);
	// Loop over the link array constructing content as we go
	
	for(i = l_startIdx;i < l_endIdx; i++)
	{
		var l_clipLength = 30; // Length before we clip each element of text
		
		var l_title = m_linkArray[i].title;
		if(l_title.length > l_clipLength) l_title = l_title.substr(0,l_clipLength-1) + "...";
		if(l_title.length == 0) l_title = "No known title";
		
		var l_person = m_linkArray[i].person;
		if(l_person.length > l_clipLength) l_person = l_person.substr(0,l_clipLength-1) + "...";
		if(l_person.length == 0) l_person = "Photographer not known";
		
		var l_blurb = l_title + ", " + l_person + ", " + m_linkArray[i].source;
		l_link = " <a href='" + m_linkArray[i].url + "' target='new'>Click here</a>";
		l_str += "<p>" + l_blurb + l_link + "</p>";			
	}
	// Add links to subsequent pages
	
	if(m_linkArray.length > 10)
	{
		// Write first two links
		l_str += "</div><div id='FP_viewMore'>View more: ";
		if(m_groupIndex == 0) {l_str += "1, ";}
		else {{l_str += "<a onClick='updateFP(0);'>1</a>, ";}}
		if(m_groupIndex == 1) {l_str += "2";}
		else {{l_str += "<a onClick='updateFP(1);'>2</a>";}}
		
		// Check if we need to write a third link
		if(m_linkArray.length > 20)
		{
			if(m_groupIndex == 2) {l_str += ", 3";}
			else {{l_str += ", <a onClick='updateFP(2);'>3</a>";}}
		}
		l_str += "</div>";
	}
	
	return l_str;
};

function updateFP(m_groupIndex)
{
	// Get the index of the currently active tab
	var m_active = $( "#FPTabbedModalContent" ).tabs( "option", "active" );
	// Update the appropriate tab
	if(m_active == 0) $( "#FP_allFields" ).html(ERPSFormattedString(m_groupIndex, g_records.allFields, g_records.linkCounts[0]));
	if(m_active == 1) $( "#FP_title" ).html(ERPSFormattedString(m_groupIndex, g_records.title, g_records.linkCounts[1]));
	if(m_active == 2) $( "#FP_person" ).html(ERPSFormattedString(m_groupIndex, g_records.person, g_records.linkCounts[2]));
}


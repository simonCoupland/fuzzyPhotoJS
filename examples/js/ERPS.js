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
		 $("#content dl").append("<dt>Links:</dt><dd>Click <span onclick='showFP();' style='text-decoration:underline;cursor:pointer;'>here</span> to view similar items from a range of collections.</dd>");
		 
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
	var m_str = "<div style='padding-top:10px;'>"; // an empty string
	// The start index of the link array
	var m_startIdx = Math.min(m_groupIndex*10, m_linkArray.length);
	// The end index of the math array - display 10 at one time
	var m_endIdx = Math.min((m_groupIndex+1)*10, m_linkArray.length);
	// Loop over the link array constructing content as we go
	
	for(i = m_startIdx;i < m_endIdx; i++)
	{
		var m_blurb = m_linkArray[i].title + ", " + m_linkArray[i].source;
		if(m_blurb.length > 50) m_blurb = m_blurb.substr(0,50) + "...";
		m_link = " <a href='" + m_linkArray[i].url + "' target='new'>Click here</a>";
		m_str += "<p>" + m_blurb + m_link + "</p>";			
	}
	// Add links to subsequent pages
	
	if(m_linkArray.length > 10)
	{
		// Write first two links
		m_str += "</div><div id='FP_viewMore'>View more: ";
		if(m_groupIndex == 0) {m_str += "1, ";}
		else {{m_str += "<a onClick='updateFP(0);'>1</a>, ";}}
		if(m_groupIndex == 1) {m_str += "2";}
		else {{m_str += "<a onClick='updateFP(1);'>2</a>";}}
		
		// Check if we need to write a third link
		if(m_linkArray.length > 20)
		{
			if(m_groupIndex == 2) {m_str += ", 3";}
			else {{m_str += ", <a onClick='updateFP(2);'>3</a>";}}
		}
		m_str += "</div>";
	}
	
	return m_str;
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


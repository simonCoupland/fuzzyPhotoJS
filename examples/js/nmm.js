// Initialises the fuzzyPhoto elements of the page
var g_records;

function initFP(m_id) 
{
	// Obtain any links from the fuzzyPhoto server
	var jqXHR = FPGetRecord(4, m_id);
	
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
		 // add an accordian widget to the page
		 $(".collection-image-show").append("<li style='clear:both;width:100%;'><div id='FP'><h3>View similar items in other collections <img id='FParrow' src='http://www.nationalmediamuseum.org.uk/img/NMeM/layout/bg_tickets_off.png'></h3><div><p></p></div></div></li>");
		 // Make some tweaks to change the arrow picture
		$('#FP h3').on({'click': function() {
			var currentSrc = $("#FParrow").attr("src");
			
			if (currentSrc.indexOf("bg_tickets_off.png") >= 0)
			{
				$("#FParrow").attr("src","nmm/bg_tickets_on.png");
				$("#FParrow").css("margin-top", "-6px");
				$("#FParrow").css("margin-right", "-10px");
			}
			else
			{
				$("#FParrow").attr("src","http://www.nationalmediamuseum.org.uk/img/NMeM/layout/bg_tickets_off.png");
				$("#FParrow").css("margin-top", "-6px");
				$("#FParrow").css("margin-right", "-18px");
			}
		}
		});
		 // add the content 
		 $(".collection-image-show p").append("<div style='text-align:right;padding-right:20px;padding-top:10px;'>Ordered by:<select onchange=\"updateFP(0);\"></select></div>");
		
		 // Populate options
		 if(g_records.linkCounts[0] > 0) $(".collection-image-show select").append("<option>All Fields</option>");
		 if(g_records.linkCounts[1] > 0) $(".collection-image-show select").append("<option>Title</option>");
		 if(g_records.linkCounts[2] > 0) $(".collection-image-show select").append("<option>Person</option>");
		 
		 // Populate links
		 if(g_records.linkCounts[0] > 0) 
		 {
			var str = "<div id='FP_allFields'>" + NMMFormattedString(0, g_records.allFields, g_records.linkCounts[0]) + "</div>";
			$(".collection-image-show p").append(str);
		 }
		 else
		 {
			$(".collection-image-show p").append("<div id='FP_allFields'></div>");
		 }
		 if(g_records.linkCounts[0] == 0 && g_records.linkCounts[1] > 0) 
		 {
			var str = "<div id='FP_title'>" + NMMFormattedString(0, g_records.title, g_records.linkCounts[1]) + "</div>";
			$(".collection-image-show p").append(str);
		 }
		 else
		 {
			$(".collection-image-show p").append("<div id='FP_title'></div>");
		 }
		 if(g_records.linkCounts[0] == 0 && g_records.linkCounts[1] == 0 && g_records.linkCounts[2] > 0) 
		 {
			var str = "<div id='FP_person'>" + NMMFormattedString(0, g_records.person, g_records.linkCounts[2]) + "</div>";
			$(".collection-image-show p").append(str);
		 }
		 else
		 {
			$(".collection-image-show p").append("<div id='FP_person'></div>");
		 }
		 
		 // Render the expandable element
		 $("#FP").accordion({collapsible: true, active: false });
	  }
	}
};

function NMMFormattedString(m_groupIndex, m_linkArray, m_linkCount) 
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
		l_str += "</div><div style='text-align:center'>View more: ";
		if(m_groupIndex == 0) {l_str += "1, ";}
		else {{l_str += "<a onClick='updateFP(0);' style='cursor:pointer;'>1</a>, ";}}
		if(m_groupIndex == 1) {l_str += "2";}
		else {{l_str += "<a onClick='updateFP(1);'  style='cursor:pointer;'>2</a>";}}
		
		// Check if we need to write a third link
		if(m_linkArray.length > 20)
		{
			if(m_groupIndex == 2) {l_str += ", 3";}
			else {{l_str += ", <a onClick='updateFP(2);'  style='cursor:pointer;'>3</a>";}}
		}
		l_str += "</div>";
	}
	
	return l_str;
};

function updateFP(m_groupIndex)
{
	// Clear all prevoius text
	$( "#FP_allFields" ).html("");
	$( "#FP_title" ).html("");
	$( "#FP_person" ).html("");
	// Get the text of the currently active selection
	var m_active = $(".collection-image-show select").val();
	// Update the appropriate div
	if(m_active == "All Fields") $( "#FP_allFields" ).html(NMMFormattedString(m_groupIndex, g_records.allFields, g_records.linkCounts[0]));
	if(m_active == "Title") $( "#FP_title" ).html(NMMFormattedString(m_groupIndex, g_records.title, g_records.linkCounts[1]));
	if(m_active == "Person") $( "#FP_person" ).html(NMMFormattedString(m_groupIndex, g_records.person, g_records.linkCounts[2]));
}






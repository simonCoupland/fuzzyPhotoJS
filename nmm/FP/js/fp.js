// Initialises the fuzzyPhoto elements of the page
var g_records;

function initFP(m_id) 
{
	// Obtain any links from the fuzzyPhoto server
	FPGetRecord(md5(''+m_id));
}

// Attempts a jsonp requesy to the links database
// Sets the g_records varible if request is successful
// Is not successful then no rendering is attempted
function FPGetRecord(m_objectID) 
{
   var m_xmlUrl = ""; // Url of the XML document to be retrieved
   m_xmlUrl = "http://146.227.222.201/links/nmem/" + m_objectID + '.json'; 

 	$.ajax(
	{
		url : m_xmlUrl,
		type:"GET", 
		jsonpCallback: 'FPCallback',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(json) {
		    g_records = json;
            renderFP();
		}
	});
 }
 
function renderFP()
{		   
	  // If any links are founds then ...
	  if(g_records.linksFound)
	  {
		 // add an accordian widget to the page
		 		 $(".collection-image-show").append("<li style='clear:both;width:100%;'><div id='FP'><h3>View similar items in other collections <span id=\"FParrowtext\"><a>open</a> <img id='FParrow' src='http://www.nationalmediamuseum.org.uk/img/NMeM/layout/bg_tickets_off.png'></span>  </h3><div><p></p></div></div></li>");
		 $('.FPlogo').on({'click': function() {
			window.open('http://fuzzyphoto.edublogs.org/', '_blank');
		}
		});
		
		 // Make some tweaks to change the arrow picture, text and border
		$('#FP h3').on({'click': function() {
			var currentSrc = $("#FParrow").attr("src");
			
			if (currentSrc.indexOf("bg_tickets_off.png") >= 0)
			{
				$("#FParrow").attr("src","http://www.nationalmediamuseum.org.uk/img/NMeM/layout/bg_tickets_on.png");
				$("#FParrowtext a").html("close");
				$("#ui-accordion-FP-panel-0").css({"border-bottom": "2px solid #DA9F1F"}); 
				$("#ui-accordion-FP-panel-0").css({"border-left": "2px solid #DA9F1F"});
				$("#ui-accordion-FP-panel-0").css({"border-right": "2px solid #DA9F1F"});
			}
			else
			{
				$("#FParrow").attr("src","http://www.nationalmediamuseum.org.uk/img/NMeM/layout/bg_tickets_off.png");
				$("#FParrowtext a").html("open");
				$("#ui-accordion-FP-panel-0").css({"border": "0"});
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
		 // Render the tooltips
		 $(function() {
			$( document ).tooltip();
		 });
		 
		if($.browser.chrome) // Some tweaks for chrome
		{
			$("#FParrow").height("39px");
			$("#FParrow").css({"margin-top": "-24px"});
			$( "#FP" ).on( "accordionactivate", function( event, ui ) {$("#FP").accordion("refresh");} );
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
		var l_clipLength = 25; // Length before we clip each element of text
		
		var l_title = m_linkArray[i].title;
		if(l_title.length > l_clipLength) l_title = l_title.substr(0,l_clipLength-1) + "...";
		if(l_title.length == 0) l_title = "No known title";

		var l_person = m_linkArray[i].person;
		if(l_person.length > l_clipLength) l_person = l_person.substr(0,l_clipLength-1) + "...";
		if(l_person.length == 0) l_person = "Photographer not known";
		
		var l_blurb = l_title + ", " + l_person + ", " + m_linkArray[i].source;
		l_link = " <a href='" + m_linkArray[i].link + "' target='_blank'>Click here</a>";
		l_str += "<p style='padding-left:10px;padding-right:5px;'>" + l_blurb + l_link + "</p>";			
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
	l_str += "<div id=\"FPBottomBar\"><p><a href='http://fuzzyphoto.edublogs.org/' target=\"_blank\" title='Connect to the FuzzyPhoto project that generated these links.'><img id='FPlogo' class='FPlogo' src='./FP/img/FPlogo.png' align='middle'></a> Connect to the FuzzyPhoto project that generated these links.</p></div>";
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
	// Refresh the accordion
	$("#FP").accordion("refresh");
}

function FPAdjustArrow()
{
	if ($('#FP').length){
		var l_height = $("#ui-accordion-FP-header-0").height() + 15.6;
		var l_height_str = l_height + "px";
		$("#FParrow").height(""+l_height_str);
		$("#FParrow").width("28px");
		var l_margin = 35.0 - l_height;
		$("#FParrow").css({"margin-top":""+l_margin+"px"});
	}
}






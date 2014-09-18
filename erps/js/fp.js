// Returns a jqXHR object which is response from a request for an XML file which contains the links associated with an object within an institution

// Institution ID is an internal number which accesses your institutions data
// 0: ERPS
// 1: British Library
// 2: Musee D'Orsay
// 3: St Andrews
// 4: National Media Museum
// 5: V & A

// Object ID is the ID for the object used by your institution


function FPGetRecord(m_institutionID, m_objectID) 
{
   var m_isValid = true; // are institution ID and object ID valid?
   var m_xmlUrl = ""; // Url of the XML document to be retrieved
   switch (m_institutionID)
   {
	 // These need updating for the live server
	case 0 : m_xmlUrl = "http://146.227.222.201/links/erps/"; break;
	case 1 : m_xmlUrl = "./bl/"; break;
	case 2 : m_xmlUrl = "./mo/"; break;
	case 3 : m_xmlUrl = "./sta/"; break;
	case 4 : m_xmlUrl = "./nmm/"; break;
	case 5 : m_xmlUrl = "./va/"; break;
	default : m_isValid = false; break; // Not a valid institution ID so set to invalid
   }
    
   if(m_isValid)
   {
        m_xmlUrl += m_objectID + '.json';
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
 }
	 
// Returns a JS Object which contains the links associated with an object within an institution
// m_xmlData should be the contents of the XML file obtained using FPGetRecord
// This is simply the response of the FPGetRecord call

function FPXmlToJSObject(m_xmlData) 
{
	var m_result = {linksFound:false, linkCounts:[0,0,0], allFields:[], title:[], person:[]};
	$(m_xmlData).find('matches').each(
		function(){
			var m_type = $(this).attr('type'); // Find each type of match: all fields, title, person
			$(this).children().each(function(){
				// For each match found extract source, title and the url
				var m_source = $(this).attr("institution");
				var m_title = $(this).find("title").text();
				var m_person = $(this).find("person").text();
				var m_url = $(this).find("url").text();

				// Add to the correct array
				if(m_type == "balanced")
				{
					var m_allFieldsElem = {title : m_title, source : m_source, person : m_person, url : m_url};
					m_result.allFields.push(m_allFieldsElem);
					m_result.linkCounts[0]++;
				}
				if(m_type == "title")
				{
					var m_titleElem = {title : m_title, source : m_source, person : m_person, url : m_url};
					m_result.title.push(m_titleElem);
					m_result.linkCounts[1]++;
				}
				if(m_type == "person")
				{
					var m_personElem = {title : m_title, source : m_source, person : m_person, url : m_url};
					m_result.person.push(m_personElem);
					m_result.linkCounts[2]++;
				}
			});
	});
	
	// have any links been found?
	if(m_result.linkCounts[0] > 0 || m_result.linkCounts[1] > 0 || m_result.linkCounts[2] > 0) {m_result.linksFound = true;}
	else {m_result.linksFound = false;}
	
	// Return the complete JS object
	return m_result;
}; 

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
	case 0 : m_xmlUrl = "./erps/"; break;
	case 1 : m_xmlUrl = "./bl/"; break;
	case 2 : m_xmlUrl = "./mo/"; break;
	case 3 : m_xmlUrl = "./sta/"; break;
	case 4 : m_xmlUrl = "./nmm/"; break;
	case 5 : m_xmlUrl = "./va/"; break;
	default : m_isValid = false; break; // Not a valid institution ID so set to invalid
   }
   if(typeof m_objectID !== 'number' || parseInt(m_objectID) != parseFloat(m_objectID)) m_isValid = false; // objectId is not an integer so set to invalid
   
   // If not valid return blank object
   if(!m_isValid) return FPNullEntry();
   
   // Otherwise carry on and attempt to retrieve XML file
   m_xmlUrl += m_objectID + '.xml';

   return $.ajax(m_xmlUrl, 
	{
		type:"GET", 
		dataType: "xml", 
		timeout: 2000,
		async: false,
	});
 }
	 
// Returns a JSON string which evaluated when contains the links associated with an object within an institution
// m_xmlData should be the contents of the XML file obtained using FPGetRecord
// This is simply the response text of the FPGetRecord call

function FPXmlToJSON(m_xmlData) 
{
	var m_result = "{ ";
	var m_linkCounts = new Array(0,0,0); // Array contains number of links return for [0] all fields, [1] title only and [2] person only
	var m_allFieldsStr = "\"allFields\" : ["; // String containing the JSON for the all fields array
	var m_titleStr = "\"title\" : ["; // String containing the JSON for the title array
	var m_personStr = "\"person\" : ["; // String containing the JSON for the person array
	
	$(m_xmlData).find('matches').each(
		function(){
			var m_type = $(this).attr('type'); // Find each type of match: all fields, title, person
			$(this).children().each(function(){
				// For each match found extract source, title and the url
				var m_source = $(this).attr("source");
				var m_title = $(this).find("title").text();
				var m_person = $(this).find("person").text();
				var m_url = $(this).find("url").text();
				

				// Add to the correct JSON string
				if(m_type == "balanced")
				{
					m_allFieldsStr += "{ \"title\":\"" + m_title + "\", ";
					m_allFieldsStr += "\"source\":\"" + m_source + "\", ";
					m_allFieldsStr += "\"person\":\"" + m_person + "\", ";
					m_allFieldsStr += "\"url\":\"" + m_url + "\" } , ";
					m_linkCounts[0]++;
				}
				if(m_type == "title")
				{
					m_titleStr += "{ \"title\":\"" + m_title + "\", ";
					m_titleStr += "\"source\":\"" + m_source + "\", ";
					m_titleStr += "\"person\":\"" + m_person + "\", ";
					m_titleStr += "\"url\":\"" + m_url + "\" } , ";
					m_linkCounts[1]++;
				}
				if(m_type == "person")
				{
					m_personStr += "{ \"title\":\"" + m_title + "\", ";
					m_personStr += "\"source\":\"" + m_source + "\", ";
					m_personStr += "\"person\":\"" + m_person + "\", ";
					m_personStr += "\"url\":\"" + m_url + "\" } , ";
					m_linkCounts[2]++;
				}
			});
	});
	
	// Replace last comma in each array string to a close square bracket
	if(m_linkCounts[0] > 0)
	{
		m_allFieldsStr = m_allFieldsStr.substr(0,m_allFieldsStr.length - 2);
		m_allFieldsStr += "], ";
	}
	
	if(m_linkCounts[1] > 0)
	{
		m_titleStr = m_titleStr.substr(0,m_titleStr.length - 2);
		m_titleStr += "], ";
	}
		
	if(m_linkCounts[2] > 0)
	{
		m_personStr = m_personStr.substr(0,m_personStr.length - 2);
		m_personStr += "]";
	}
	
	// have any links been found?
	if(m_linkCounts[0] > 0 || m_linkCounts[2] > 0 || m_linkCounts[2] > 0) {m_result += "\"linksFound\":true, ";}
	else {m_result+= "\"linksFound\":false, ";}
	
	// Add link counts
	m_result += "\"linkCounts\":[" + m_linkCounts[0] + ", " + m_linkCounts[1] + ", " + m_linkCounts[2] + "], ";
	
	// Add link arrays
	m_result += m_allFieldsStr;
	m_result += m_titleStr;
	m_result += m_personStr;
	
	// Close the object - end curly brace
	m_result += "}";
	// Return the complete JSON string
	return m_result;
}; 
Fuzzy Photo JS Readme
----------------------------------

Version 0.1

There is a single file which contains the fuzzy photo code - fp.js which can be found in the js directory.
This file does not currently access a server an instead only looks up local files.
The only file provided so far is ERPS/105998.xml.
This file contains some initial links to ERPS record 105598.
The examples directory contains two examples of fp.js being used:
- simple

	A simple HTML page which gets the XML file (locally).
	The response of the AJAX query which obtained the file is written to the browser.
	If the status code of the AJAX query is 200 a JSON string of the records assocaited with ERPS 105598 is also written to the browser.
	It is intended that this object will be used to render UI rather than the raw XML.

- erps

	A clone of the object page for ERPS 105598.
	This example uses JQuery UI tabs to render a model dialog box giving access to the linked records.
	
- nmm

	A mock-up of what the National Media Museum widget will look lioke.  The links for this aren't currently valid.  
	This is becuase of the trouble we have had obtaining links from the NMM data.
	This example uses JQuery UI accordian to render the collapsable widget.
	
To do:

Test fp.js

Add missing URLs to the XML file.
sjs
===
Server side JavaScript Framework
http://github.com/davetayls/sjs

Copyright (c) 2010 Dave Taylor (@davetayls), http://the-taylors.org
This source code is subject to terms and conditions of the New BSD License.
A copy of the license can be found in the license.txt file at the root of 
this distribution.

The aim of this project is to give a very simple server side JavaScript 
framework which will work across various platforms.

It will initially be compatible with Mozilla Rhino and Microsoft cscript.exe 
and will allow you to do the following:

Using cscript:
c:\project>cscript project.js arg1::var arg2::"foo bar"

Using rhino:
c:\project>java -jar js.jar project.js arg1::var arg2::"foo bar"

Simple File Operations
--------------------------

	var file = 
	sjs
		.file('test.txt')				// open text file
		.append('end of the doc\n')		// append string to end
		.prepend('new doc header\n')	// insert string at the beginning
		.append(3,'new line')			// insert string as new line at line 3
		.save()							// save changes to disk
		.save('test2.txt')				// save to new file
		.prepend('test 2 header\n')
		.save()
		.clear()
		.text('clear and set content of text file');
	
	sjs.print(file.readText());			// return cached file contents
	sjs.print(file.readText(true));		// read in saved file contents and return

Simple Argument Access
----------------------

	sjs
		.arguments()						// get arguments object
		.each(function(){					// run function for each
			sjs.print(
				this.key+'-'+this.values.join(',')
			);
		});



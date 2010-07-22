sjs
===

The aim of this project is to give a very simple server side JavaScript framework which will work across various platforms.

It will initially be compatible with Mozilla Rhino and Microsoft cscript.exe and will allow you to do the following:

	var fileContents = 
	sjs	
		.file('test.txt')				// open text file
		.append('end of the doc\n')		// append string to end
		.prepend('new doc header\n')	// insert string at the beginning
		.append(3,'new line')			// insert string as new line at line 3
		.save()							// save changes to disk
		.save('test2.txt')				// save to new file
		.prepend('test 2 header\n')		
		.save()
		.readText(true);				// return file contents
	
	sjs.print(fileContents);			//  print contents to output

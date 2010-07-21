sjs
===

The aim of this project is to give a very simple server side JavaScript framework which will work across various platforms.

It will initially be compatible with Mozilla Rhino and Microsoft cscript.exe and will allow you to do the following:

	var fileContents = 
	sjs
		.file('test.txt')
		.append('end of the doc\n')
		.prepend('new doc header\n')
		.append(3,'new line')
		.save()
		.save('test2.txt')
		.prepend('test 2 header\n')
		.save()
		.readText(true);
	
	sjs.print(f);

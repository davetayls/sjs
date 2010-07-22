/* load sjs */
var sjsLocation = 'sjs.js';
if (typeof load !== 'undefined'){load(sjsLocation);}else if (typeof ActiveXObject !== 'undefined'){
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var txt = fs.OpenTextFile(sjsLocation,1).ReadAll();
	eval(txt);
		
	}else{throw('sjs is compatible with either Rhino or cscript');}
/* end sjs load */

(function(global){
		
	var fileContents = 
	sjs
		.file('test.txt')
		//.append('end of the doc\n')
		//.prepend('new doc header\n')
		//.append(3,'new line')
		//.save()
		//.save('test2.txt')
		//.prepend('test 2 header\n')
		//.save()
		.readText(true);
	
	sjs.print(fileContents);

})(this);
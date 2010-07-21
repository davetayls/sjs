var sjsLoad = function(){
	if (typeof load !== 'undefined'){
		load('sjs.js');
	}else if (typeof ActiveXObject !== 'undefined'){
		var fs = new ActiveXObject("Scripting.FileSystemObject"); 
		return eval(fs.OpenTextFile('sjs.js',1).ReadAll());		
	}else{
		throw('sjs is compatible with either Rhino or cscript');
	}
}();
(function(global){
		
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

})(this);
(function(global){
		
	var java,
		javaFile,
		javaSystem;

	if (typeof global.java !== 'undefined'){
		java = global.java;
		javaFile = java.io.File,
		javaSystem = java.lang.System;		
	}
	
	// global setup
	var sjs = {
		version: '@SJS_VERSION',
		fileSeparator : javaSystem ? javaSystem.getProperty('file.separator') : '\\',
		file : function(path){
			return new sjs.io.File(path);
		},
		print : function(s){
			if (typeof print !== 'undefined'){
				print(s);
			} else if (global.WSH){
				global.WSH.Echo(s);
			}
		}
	};
	global.sjs = sjs;

	// io
	sjs.io = {};
	sjs.io.File = function(path){
		if (java){
			this.javaFile = new javaFile(path);
		}
		this.path = path;
		this.contents = this.readText();		
	};
	sjs.io.File.prototype = {
		contents: null,
		path: '',
		append: function(s){
			if (typeof arguments[0] === 'number'){
				var lineNumber = arguments[0] === 0 ? 0 : arguments[0] -1;
				return this.insertLine(lineNumber,arguments[1]);
			}else{			
				this.contents += s;
			}
			return this;
		},
		insertLine: function(index,s){
			var lines = this.readText().split('\n');
			lines.splice(index,0,s);
			this.contents = lines.join('\n');
			return this;
		},
		prepend: function(s){
			this.contents = s + this.contents;
			return this;
		},
		readText: function(force){
			if (!this.contents || force){
				this.contents = '';
				if (java){
					var reader = new java.io.FileReader(this.javaFile);
					var buffer = new java.io.BufferedReader(reader);
					while((line = buffer.readLine())){
				        this.contents += line + '\n';
					}
				}else if (ActiveXObject){
					var fs = new ActiveXObject("Scripting.FileSystemObject");
					this.contents = fs.OpenTextFile(this.path,1).ReadAll();					
				}
			}
			return this.contents;
		},
		save: function(newFile){
			if (java){
				if (typeof newFile === 'string'){
					this.javaFile = java.io.File(newFile);
				}
				var writer = new java.io.FileWriter(this.javaFile,false);
				var buffer = new java.io.BufferedWriter(writer);
				buffer.write(this.contents);
				buffer.close();
			}
			return this;
		}
	};
	
	
})(this);

(function(global){
		
	var commandLineArgs,
		java,
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
		arguments: function(){
			if (!commandLineArgs){
				if(java){
					commandLineArgs = new sjs.Args(global.arguments,'::');
				}else if(ActiveXObject){
					var items = [];
					for (var i=0;i<global.WSH.Arguments.length;i+=1){
						items.push(global.WSH.Arguments.Item(i));
					}
					commandLineArgs = new sjs.Args(items,'::');
				}				
			}
			return commandLineArgs;
		},
		file : function(path){
			return new sjs.io.File(path);
		},
		load: function(path){
			if (typeof load !== 'undefined'){
				load(sjsLocation);
			}else if (typeof ActiveXObject !== 'undefined'){
				eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(sjsLocation,1).ReadAll());
			}else{
				throw('sjs is not compatible with this JavaScript engine');
			}			
		},
		print : function(s){
			if (typeof print !== 'undefined'){
				print(s);
			} else if (global.WSH){
				global.WSH.Echo(s);
			}
		},
		workingDir: function(){
			if (java){
				return environment['user.dir'];
			}else if (WScript){
				return WScript.CreateObject("WScript.Shell").CurrentDirectory;
			}
		}
	};
	global.sjs = sjs;
	// arguments
	sjs.Args = function(args,separator){
		this.arguments = {};
		var length = args.length;
		for (var i = 0; i < length; i += 1) {
			var keyValue = args[i].split(separator);
			var arg = this.arguments[keyValue[0]] 
			if (!arg) {
				arg = new sjs.Arg(keyValue[0]);
			}
			arg.addValue(keyValue[1]);
			if (!this.arguments[keyValue[0]]){
				this.arguments[keyValue[0]] = arg;				
			}
		}
	};
	sjs.Args.prototype = {
		each: function(fn){
			for (key in this.arguments){
				if(fn.call(this.arguments[key]) === false){
					break;
				}					
			}
			return this;
		}
	};
	sjs.Arg = function(key){
		this.key = key;
		this.values = [];
	};
	sjs.Arg.prototype = {
		addValue: function(val){
			this.values.push(val);
		},
		join: function(separator){
			return this.values.join(separator);
		}
	};
	
	/* io */
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
		clear: function(){
			this.contents = '';
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
			if (typeof newFile === 'string'){
				this.path = newFile;
			}			
			if (java){
				if (typeof newFile === 'string'){
					this.javaFile = java.io.File(newFile);
				}
				var writer = new java.io.FileWriter(this.javaFile,false);
				var buffer = new java.io.BufferedWriter(writer);
				buffer.write(this.contents);
				buffer.close();
			}else if (ActiveXObject){
				var fso, f;
				var ForReading = 1, ForWriting = 2;
				fso = new ActiveXObject("Scripting.FileSystemObject");
				f = fso.OpenTextFile(this.path, ForWriting, true);
				f.Write(this.contents);
				f.Close();
			}
			return this;
		},
		text: function(text){
			this.contents = text;
			return this;
		}
	};
	
	
})(this);

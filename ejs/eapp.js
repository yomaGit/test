
(function(window){
	
	if(navigator.userAgent.indexOf("Android")>0){

		var scheme="eapp";
		var EAppNativeName="NativeApp";
		var EAppNative=window[EAppNativeName];
		var callbacks={};
		
		var EApp={
			globalCallbackId:0,
			callbacks:callbacks,
			isBrowser:false
		};
		
		if(window.navigator.platform=="Win32"){
			EApp.isBrowser=true;
	    }
		
		EApp.request2=function(url,parameters,success,fail,testInfo){
			var commands=parseUrl(url);
			if(commands!=null){
				var nowCallbackId="re_"+EApp.globalCallbackId++;
				var arguments=null;
				if(parameters!=null){
					arguments=JSON.stringify(parameters);
				}
				if(callbacks[nowCallbackId]==null){
					callbacks[nowCallbackId]={};
				}
				callbacks[nowCallbackId]={
						"success":success,
						"fail":fail
				};
				if((EApp.isBrowser==true && testInfo!=null) || (testInfo!=null && testInfo.test==true) ){
					if(testInfo.status=="success"){
						requestTest(nowCallbackId,0,testInfo.result,testInfo.keep);
					}else{
						requestTest(nowCallbackId,-1,testInfo.result,testInfo.keep);
					}
				}else{
					try{
						var execResult=EAppNative.exec(commands.actionName,commands.methodName,nowCallbackId,arguments);
					}catch(e){

					}
					//sendRequest(commands.actionName,commands.methodName,nowCallbackId,arguments);
				}
			}
			
		};
		
		EApp.request=function(request){
			EApp.request2(request.url, request.parameters, request.success, request.fail, request.testInfo);
		};
		
		EApp.callback=function(callbackId,status,message,keepCallback){
			var callback=EApp.callbacks[callbackId];
			if(message!=null) message=JSON.parse(message);
			if(callback){
				if(status==0){
					var fuc=callback.success;
					if(fuc!=null){
						fuc(message);
					}
				}else{
					var fuc=callback.fail;
					if(fuc!=null){
						fuc(message);
					}
				}
				if(!keepCallback){
					delete EApp.callbacks[callbackId];
				}
			}
		};
		
		function parseUrl(url){
			var url=url.substring(7);
			var commands=url.split("/");
			if(commands.length>=2){
				return {actionName:commands[0],methodName:commands[1]};
			}
			return null;
		}
		
		function sendRequest(actionName,methodName,callbackId,argument){
			var execResult=EAppNative.exec(actionName,methodName,callbackId,argument);
		}
		
		function requestTest(callbackId,status,message,keepCallback){
			setTimeout(function(){
				EApp.callback(callbackId, status, message, keepCallback)
			},500);
		}
		
		window.EApp=EApp;

	}else if(navigator.userAgent.indexOf("iPhone")>0){

		var scheme="eapp",
		callbackPrefix="re",
		commandSet={},
		callbacks={};
	
		var EApp={
			scheme:scheme,
			//use messge queue mode? synchronize or asynchronize
			//commandQueue:[],
			callbackId:0,
			//callbacks:callbacks,
			//commandSet:commandSet,
			runMode:"debug",
			isBrowser:false
		};
		
		var platform=window.navigator.platform;
		if(platform=="Win32" || platform=="MacIntel"){
			EApp.isBrowser=true;
	    }
		
		EApp.requestStatus={
			SUCCESS:1,
			FAIL:3
		};
		
		EApp.init=function(){
			if(EApp.breage==null){
				EApp.breage=createBreage();
			}
		};
		
		EApp.getRequestArgument=function(callbackId){
			var argument;
			if(commandSet!=null){
				if(callbackId!=null){
					argument=commandSet[callbackId];
				}else{
					argument=[];
					for(var cbId in commandSet){
						argument.push(commandSet[cbId]);
						delete commandSet[cbId];
					}
				}
			}
			if(argument) 
				return JSON.stringify(argument);
		};
		

		
		EApp.request=request;
		
		EApp.callback=callback;
		
		function request(requestInfo){
			var url=requestInfo.url,
				parameters=requestInfo.parameters,
				successCb=requestInfo.success,
				failCb=requestInfo.fail,
				progressCb=requestInfo.progress,
				testInfo=requestInfo.testInfo;

			var originCallbackId=requestInfo.originCallbackId;
			
			var promise;
			if(window.EApp.Promise!=null){
				promise=new window.EApp.Promise();
			}
			
			var parmValid=checkRequestParametersValid(parameters);
			if(parmValid==false){
				//todo:more action
				return;
			}
			var callbackId=createCallbackId();
			var requestUrl=url+"/"+callbackId;
	 
			commandSet[callbackId]={
				originCallbackId:originCallbackId,
				callbackId:callbackId,
				argument:parameters,
				requestUrl:requestUrl
			};
			
			var callbackInfo;
			if(promise){
				promise._callbackId=callbackId;
				callbackInfo={
					isPromise:true,
					promise:promise
				};
			}else{
				callbackInfo={
					success:successCb,
					fail:failCb,
					progress:progressCb
				};
			}
			callbacks[callbackId]=callbackInfo;
			
			
			if( (EApp.isBrowser==true && testInfo!=null) || (testInfo!=null && testInfo.test==true) ){
				requestTest(callbackId,testInfo);
			}else{
				var sendStatus=sendRequest(requestUrl);
			}
			
			return promise;
		};
		
		function callback(callbackId,response){
	 //alert(JSON.stringify(response)+"========="+JSON.stringify(callbacks));
			if(callbackId!=null && callbacks!=null){
				var callbackInfo=callbacks[callbackId];
				if(callbackInfo!=null){
					if(callbackInfo.isPromise){
						var promise=callbackInfo.promise;
						if(promise!=null){
							//todo:mark
							if(response.status==EApp.requestStatus.SUCCESS && !response.keepCallback){
								promise.resolve(response);
	                            delete callbacks[callbackId];
							}else if(response.status==EApp.requestStatus.SUCCESS && response.keepCallback){
								promise.progress(response);
							}else{
								promise.reject(response);
	                            delete callbacks[callbackId];
							}
						}
						
						//delete callbacks[callbackId];
					}else{
						//todo:mark
						var successCb=callbackInfo.success;
						var failCb=callbackInfo.fail;
						var progressCb=callbackInfo.progress;
						if(response.status==EApp.requestStatus.SUCCESS && !response.keepCallback && typeof successCb === 'function'){
							successCb(response);
	                        delete callbacks[callbackId];
						}else if(response.status==EApp.requestStatus.SUCCESS && response.keepCallback && typeof progressCb === 'function'){
							progressCb(response);
						}else if(typeof failCb === 'function'){
							failCb(response);
	                        delete callbacks[callbackId];
						}
						
						//delete callbacks[callbackId];
					}
				}
			}
		};
		
		function createBreage(){
			var breage = document.createElement("iframe");
			breage.setAttribute("style", "display:none;");
			breage.setAttribute("height","0px");
			breage.setAttribute("width","0px");
			breage.setAttribute("frameborder","0");
			document.documentElement.appendChild(breage);
			return breage;
		}
		
		function checkRequestParametersValid(parameter){
			if(typeof parameter === 'object'){
				return true;
			}
			return false;
		}
		
		function createCallbackId(){
			return callbackPrefix+"_"+(EApp.callbackId++)+"_"+getUniqueId();
		}
		
		function getUniqueId(){
			return Math.floor((new Date().getTime())*Math.random()*21).toString().substr(0,8);
		}
		
		function sendRequest(url){
			if(EApp.breage!=null){
				EApp.breage.src=url;
			}else{
				return false;
			}
			return true;
		}
		
		function requestTest(callbackId,testInfo){
			//todo:mark
			var requestStatus=testInfo.status=="success"?EApp.requestStatus.SUCCESS : EApp.requestStatus.FAIL;
			var response={
				status:requestStatus,
				result:testInfo.result
			};
			
			var delayTime=testInfo.delay || 500;
			setTimeout(function(){
				callback(callbackId,response);
			},delayTime);
		}

		/****************execute********************/
		EApp.init();
		
		window.EApp=EApp;

	}
	
})(window);


(function eappPromise(EApp){

	var Promise=EJS.Class.derive(EJS.Promise,function(func){
		//this._base=EJS.Promise.prototype;
		this.init(func);
	},{
		
		_originCallbackId:null,

		_callbackId:null,

		init:function(func){
			this._base.init.apply(this,[func]);
		}
		
	});
	
	EApp.Promise=Promise;
	
})(EApp);

(function(window,UserInfo,UIListener){

	////////////////////////////////////////
	var systemId="0";
	var systemName="system";

	var MessageType={
		text:1,
		audio:2,
		picture:3,
		map:4,
		medicinal:5,
		file:6,
		response:7,
		clientStatus:8,
		connect:9,
		revoke:10,
		ping:11,
		pushout:12,
		order:13,
		groupUser:14
	};

	var OppositeType={
		user:0,
		group:1
	};

	var UserType={
		normal:1,
		system:2
	};

	var PictureMsgContent={
		picUrl:"http://hyshop.hydee.cn/hwimg/df.png",
		fileTypeName:"",
	};

	var MedicinalMsgContent={
		id:"",
		name:"",
		picUrl:"",
		functional:""
	}

	var BaseMessage={
		mid:"",
		messageType:MessageType.text,
		oppositeType:OppositeType.user,
		fromUserId:"",
		fromUserName:"",
		toUserId:"",
		toUserName:"",
		groupId:null,
		content:""
	};
	///////////////////////////////////////////////////////

	function WSSocket(wsAddress,UserInfo,UIListener){
		this.socket=new WebSocket(wsAddress);
		this.userId=UserInfo.id;
		this.userName=UserInfo.name;

		var that=this;
		this.socket.onerror=function(event){
			console.log(event.data);
			// $(".loadingLogin").hide();
		};
		this.socket.onopen=function(event){
			that._sendConnectMessage();
			// $(".loadingLogin,.connectReset").hide();
		};
		this.socket.onmessage=function(event){
			that._receiveMessage(toJsonObj(event.data));
			// $(".loadingLogin").hide();
		};
		this.socket.onclose=function(event){
			console.log("close");
			// $(".loadingLogin").hide();

			// setTimeout(function(){
            //     if(typeof cf!="undefined"&&!cf.socketj){
            //         $(".connectReset").show();
            //     }
			// 	$(".connectReset").find("span").click();
			// },1000);
		};

		this.UIListener=UIListener;
	};
	WSSocket.prototype ={
		UIListener:null,

		MessageType:MessageType,

		sendMessage:function(data){
			var judgeName=data.toUserName;
			data.fromUserId=this.userId;
			data.fromUserName=this.userName;
			data.sendTime=getNowTimestamp();
			// var nowDom=$(".chating_main li[dataId='"+cf.nowSendMsgId+"']");
			// if(judgeName!="system"&&!cf.sendAgain){
			// 	cf.setLocalStorage(cf.nowSendMsg,"0",otherUserInfo.id,otherUserInfo.name);
			// }
			// cf.sendMsgJudgeId=data.mid;
			if(this.socket.readyState==1){
				this.socket.send(toJsonStr(data));
			}else{
				// nowDom.find(".sending").hide();
				// nowDom.find(".sendFalse").show();
			}

		},

		_sendConnectMessage:function(){
			var message={};
			var that=this;
			message.mid=this.createMid(systemId);
			message.OppositeType=OppositeType.user;
			message.messageType=MessageType.connect;
			message.fromUserId=this.userId;
			message.fromUserName=this.userName;
			message.toUserId=systemId;
			message.toUserName=systemName;
			message.sendTime=getNowTimestamp();
			message.content={
				userId:that.userId,
				timeStamp:getNowTimestamp(),
				userType:UserType.normal
			};

			this.sendMessage(message);
		},

		_sendResponseMessage:function(messageType,mid){
			var message={};
			message.mid=this.createMid(systemId);
			message.messageType=MessageType.response;
			message.OppositeType=OppositeType.user;
			message.fromUserId=this.userId;
			message.fromUserName=this.userName;
			message.toUserId=systemId;
			message.toUserName=systemName;
			message.sendTime=getNowTimestamp();
			message.content={
				rpMessageType:messageType,
				rpMid:mid
			};

			this.sendMessage(message);
		},

		_receiveMessage:function(data){
			switch(data.messageType){
				case MessageType.response:
					if(this.UIListener.sendSuccess!=null){
						var contentData=toJsonObj(data.content);
						this.UIListener.sendSuccess(contentData.rpMid);
					}
					this._sendResponseMessage(data.messageType,data.mid);
					break;

				case MessageType.text:
					if(this.UIListener.newMessage!=null){
						this.UIListener.newMessage(data);
					}
					this._sendResponseMessage(data.messageType,data.mid);
					break;

				case MessageType.picture:
					if(this.UIListener.newMessage!=null){
						this.UIListener.newMessage(data);
					}
					this._sendResponseMessage(data.messageType,data.mid);
					break;

				case MessageType.medicinal:
					if(this.UIListener.newMessage!=null){
						this.UIListener.newMessage(data);
					}
					this._sendResponseMessage(data.messageType,data.mid);
					break;

				case MessageType.audio:
					if(this.UIListener.newMessage!=null){
						this.UIListener.newMessage(data);
					}
					this._sendResponseMessage(data.messageType,data.mid);
					break;

				case MessageType.map:
					if(this.UIListener.newMessage!=null){
						this.UIListener.newMessage(data);
					}
					this._sendResponseMessage(data.messageType,data.mid);
					break;
			}
		},

		createMid:function(toUserId){
			return mid="m"+this.userId+toUserId+getNowTimestamp()+getRandom(6);
		}
	};

	window.WSSocket=WSSocket;

	/////////////////////////////////////////
	function toJsonStr(obj){
		return JSON.stringify(obj);
	}

	function toJsonObj(jsonStr){
		return JSON.parse(jsonStr);
	}

	function getRandom(n){
		return Math.floor(Math.random()*Math.pow(10,n));
	}

	function getNowTimestamp(){
		return new Date().getTime();
	}

	function clone(obj){
		var o;
		switch(typeof obj){
			case 'undefined': break;
			case 'string'   : o = obj + '';break;
			case 'number'   : o = obj - 0;break;
			case 'boolean'  : o = obj;break;
			case 'object'   :
				if(obj === null){
					o = null;
				}else{
					if(obj instanceof Array){
						o = [];
						for(var i = 0, len = obj.length; i < len; i++){
							o.push(clone(obj[i]));
						}
					}else{
						o = {};
						for(var k in obj){
							o[k] = clone(obj[k]);
						}
					}
				}
				break;
			default:
				o = obj;break;
		}
		return o;
	}

})(window);
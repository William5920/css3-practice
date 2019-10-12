//获取css样式
function getStyle(obj,attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,1)[attr];
}

function sport(obj,json,fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var stop = true;
		for(var attr in json) {
			//1.获取初始值
			var cur = 0;
			if(attr == "opacity") {
				cur = parseInt(parseFloat(getStyle(obj,attr)) * 100);
			} else {
				cur = parseInt(getStyle(obj,attr));
			}

			//2.设置速度
			var speed = (json[attr] - cur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			//3.检测停止
			if(json[attr] != cur) {
				stop = false;
			}

			//4.运动
			if(attr == "opacity") {
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = "alpha(opacity=" + (cur + speed) + ")";
			} else {
				obj.style[attr] = cur + speed + "px";
			}
		}

		if(stop) {
			clearInterval(obj.timer);
			fn && fn();
		}
	},30)
}
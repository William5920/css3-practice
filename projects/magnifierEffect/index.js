//通过ID获取DOM对象
function $(id) {
	return document.getElementById(id);
}



window.onload = function() {

	var oSmallBox = $("small-box");
	var oSmallImg = oSmallBox.getElementsByTagName("img");

	var oMiddleImg = $('middle-img');
	var oLargeImg = $('large-img');

	var oMiddleBox = $('middle-box');
	var oLargeBox = $('large-box');
	var oShadow = $('shadow');
	var oBox = $('box');


	//缩略图选项卡的效果
	for(var i = 0; i<oSmallImg.length; i++) {
		oSmallImg[i].onmouseenter = function() {
			//清空其他小图片的边框
			for(var j = 0; j<oSmallImg.length; j++) {
				oSmallImg[j].className = '';
			}

			//添加目标图片的边框
			this.className = 'current';

			//修改中型图片和大型图片的src
			oMiddleImg.src = this.src;
			oLargeImg.src = this.src;
		}
	}

	//鼠标进入middle-box,显示遮罩层和右侧大图区域
	oMiddleBox.onmouseenter = function() {
		oLargeBox.style.display = 'block';
		oShadow.style.display = 'block';
	}

	//鼠标离开middle-box,隐藏遮罩层和右侧大图区域
	oMiddleBox.onmouseleave = function() {
		oLargeBox.style.display = 'none';
		oShadow.style.display = 'none';
	}

	//给middle-box添加鼠标移事件
	oMiddleBox.onmousemove = function(e) {
		var ev = e || window.event;
		var iL = ev.clientX - oShadow.offsetWidth/2 -oBox.offsetLeft;
		var iT = ev.clientY - oShadow.offsetHeight/2 -oBox.offsetTop;

		//限定左侧方向
		if(iL < 0) {
			iL = 0;
		}

		//限定上侧方向
		if(iT < 0) {
			iT = 0;
		}

		var iMaxL = oMiddleBox.offsetWidth - oShadow.offsetWidth;
		var iMaxT = oMiddleBox.offsetHeight - oShadow.offsetHeight;

		//限定右侧方向
		if(iL > iMaxL) {
			iL = iMaxL;
		}

		//限定下侧方向
		if(iT > iMaxT) {
			iT = iMaxT;
		}

		oShadow.style.left = iL + 'px';
		oShadow.style.top = iT + 'px';


		//比例：iShadowL / iShadowMaxL = iLargeImgL / iLargeImgMaxL
		//计算大图片所移动的left值

		var iLargeImgL = iL * (oLargeImg.offsetWidth - oLargeBox.offsetWidth) / iMaxL;
		var iLargeImgT = iT * (oLargeImg.offsetHeight - oLargeBox.offsetHeight) / iMaxT;

		oLargeImg.style.left = - iLargeImgL + 'px';
		oLargeImg.style.top = - iLargeImgT + 'px';
	}


}
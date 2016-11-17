function dropButton() {

	// 获取节点
	var block = document.getElementById("dropButton"); //整个按钮
	var close = document.getElementById("dropClose"); //关闭按钮 点击  收缩按钮
	var menu = document.getElementById("dropMenu"); //菜单  点击  展开按钮 
	var num = block.getElementsByTagName("li").length - 1; //获取li的数量-1
	var dropUl=document.getElementById("dropUl");
	
	if(num == 0) {
		num = 1;
	}
	var oW, oH;

	var liWidth =block.getElementsByTagName("li")[0].offsetWidth; // li的固定宽度

	var timer; //定时器

	var lettime = 0; //记录按下时间
	dropUl.style.width = liWidth *num + "px";

	// 绑定监听touchstart事件
	block.addEventListener("touchstart", function(e) {
		var touches = e.touches[0];

		oW = touches.clientX - block.offsetLeft;

		oH = touches.clientY - block.offsetTop;

		lettime = 0;
		timer = setInterval(function() {
			lettime = lettime + 50;
		}, 50)

		// 阻止页面的滑动默认事件
		document.addEventListener("touchmove", defaultEvent, false);
	}, false)

	//  绑定监听touchmove事件
	block.addEventListener("touchmove", function(e) {
		//按钮的宽度 = 一个 li 的宽度
		block.style.width = liWidth + "px";

		//菜单显示 
		menu.style.display = "inline-block";
		var touches = e.touches[0];

		//计算X轴移动的距离
		var oLeft = touches.clientX - oW;
		//计算Y轴移动的距离
		var oTop = touches.clientY - oH;

		if(oLeft < 0) {
			oLeft = 0;
		} else if(oLeft > document.documentElement.clientWidth - block.offsetWidth) {
			oLeft = (document.documentElement.clientWidth - block.offsetWidth);
		}

		if(oTop < 0) {
			oTop = 0;
		} else if(oTop > document.documentElement.clientHeight - block.offsetHeight) {
			oTop = (document.documentElement.clientHeight - block.offsetHeight);
		}

		block.style.left = oLeft + "px";
		block.style.top = oTop + "px";


	}, false);

	//  绑定监听touchend事件
	block.addEventListener("touchend", function(e) {
		clearInterval(timer);
		//  触发时间小于100毫秒---点击事件
		if(lettime < 100) {

			//  按钮展开
			block.style.width = liWidth * num + "px"; // 按钮展开

			//  主菜单隐藏	
			menu.style.display = "none";
			//  判断屏幕宽度-按钮的left值是否小于等于按钮的宽度
			if((document.documentElement.clientWidth - block.style.left.split('p')[0]) <= liWidth * num) {

				// 按钮的left值= 判断屏幕宽度-按钮扩展开的宽度
				block.style.left = document.documentElement.clientWidth - liWidth * num + "px"; //

			}
		}

		document.removeEventListener("touchmove", defaultEvent, false);
	}, false);

	//关闭按钮
	close.addEventListener("click", function(e) {

		block.style.width = liWidth + "px";
		
		//  判断屏幕宽度-按钮的left值是否小于等于按钮的宽度
		if((document.documentElement.clientWidth - block.style.left.split('p')[0]) <= liWidth * num) {

			// 按钮的left值= 判断屏幕宽度-按钮缩小的宽度
			block.style.left = document.documentElement.clientWidth - liWidth + "px";
		}
		menu.style.display = "inline-block";

	})

	function defaultEvent(e) {
		e.preventDefault();
	}
}

// 回调
dropButton();

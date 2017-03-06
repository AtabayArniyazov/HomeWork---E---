"use strict";


var wrapper = document.getElementById("wrapper"),
	dragImage = null, //какая картинка сейчас перетаскивается
	dragShiftX,
	dragShiftY;

wrapper.addEventListener("mouseover", mouseOver, false);
wrapper.addEventListener("mouseout", mouseOut, false);
wrapper.addEventListener("mousedown", dragStart, false);


function mouseOver(EO) {
	EO = EO || window.event;
	console.log("mouseover - мышь теперь над самим элементом " + EO.target.id);

	console.log(EO.target.id);
}

function mouseOut(EO) {
	EO = EO || window.event;
	console.log("mouseout - мышь теперь НЕ над самим элементом " + EO.target.id);
}

function dragStart (EO) {
	EO = EO || window.event;

	dragImage = EO.target;

//браузер имеет свой собственный Drag’n’Drop, который автоматически запускается и вступает в конфликт с нашим. Отключаем собственный Drag’n’Drop
	dragImage.ondragstart = function() {
  		return false;
	};

// Картинка, перетаскивание которой началось, должна оказываться выше (ближе к глазам), чем остальные.
	var childWrapp = wrapper.getElementsByTagName('img');

	for (var i = 0; i < childWrapp.length; i++) {
		childWrapp[i].style.zIndex = 0;
	}

	dragImage.style.zIndex = 1; // ближе к глазам, над другими элементами

	dragImage.style.position = "absolute";
	// console.log(dragImage);

	var mouseX = EO.pageX;
	var mouseY = EO.pageY;
	// console.log(mouseX);
	// console.log(mouseY);

	var imageX = dragImage.offsetLeft;
	var imageY = dragImage.offsetTop;
	// console.log(imageX);
	// console.log(imageY);

	dragShiftX = mouseX - imageX;
	dragShiftY = mouseY - imageY;
	// console.log(dragShiftX);
	// console.log(dragShiftY);	

	window.onmousemove = dragMove;
	window.onmouseup = dragStop;
}

function dragStop () {
	window.onmousemove = null;
	window.onmouseup = null;
}

function dragMove (EO) {
	EO = EO || window.event;

	var mouseX = EO.pageX;
	var mouseY = EO.pageY;

	var imageX = mouseX - dragShiftX;
	var imageY = mouseY - dragShiftY;

	dragImage.style.left = imageX + "px";
	dragImage.style.top = imageY + "px";
}
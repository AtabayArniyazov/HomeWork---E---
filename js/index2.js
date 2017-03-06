"use strict";

var wrapper = document.getElementById("wrapper"),
  dragImage = null, //какая картинка сейчас перетаскивается
  dragShiftX,
  dragShiftY;

var childWrapp = wrapper.getElementsByTagName('img');

  for (var i = 0; i < childWrapp.length; i++) {
    AddEventHandler(childWrapp[i], "mousedown", dragStart, false);
    AddEventHandler(childWrapp[i], "mouseover", mouseOver, false);
    AddEventHandler(childWrapp[i], "mouseout", mouseOut, false);
  }


function mouseOver(EO) {
  EO = EO || window.event;
  PreventDefault(EO);

  EO.target.style.border = "1px dashed red";
}


function mouseOut(EO) {
  EO = EO || window.event;
  PreventDefault(EO);

  EO.target.style.border = "none";
}

function dragStart (EO) {
  EO = EO || window.event;
  PreventDefault(EO);

  dragImage = EO.target;


// Картинка, перетаскивание которой началось, должна оказываться выше (ближе к глазам), чем остальные.  
  wrapper.appendChild(dragImage);

  dragImage.style.border = "3px solid red";
  dragImage.style.position = "absolute";

  var mouseX = EO.pageX,
      mouseY = EO.pageY,
      imageX = dragImage.offsetLeft,
      imageY = dragImage.offsetTop;

  dragShiftX = mouseX - imageX;
  dragShiftY = mouseY - imageY;

  window.onmousemove = dragMove;
  window.onmouseup = dragStop;
}


function dragMove (EO) {
  EO = EO || window.event;
  PreventDefault(EO);

  var mouseX = EO.pageX,
      mouseY = EO.pageY,
      imageX = mouseX - dragShiftX,
      imageY = mouseY - dragShiftY;

  dragImage.style.left = imageX + "px";
  dragImage.style.top = imageY + "px";
}


function dragStop () {
  window.onmousemove = null;
  window.onmouseup = null;

  dragImage.style.border = "none";
}


// установка обработчика событий
function AddEventHandler(Elem,EventName,HandlerFunc,CaptureFlag) {
  if ( Elem.addEventListener )
    Elem.addEventListener(EventName,HandlerFunc,CaptureFlag); // современные браузеры и IE >=9
  else
    if ( !CaptureFlag ) // перехват вообще невозможен
    {
      var EventName2='on'+EventName;
      if ( Elem.attachEvent ) // IE <=8
      {
        // создаём обёртку для обработчика, чтобы обработчику правильно передавался this
        var IEHandlerF=function() { HandlerFunc.call(Elem); } 
        Elem.attachEvent(EventName2,IEHandlerF);
        var StoreName="__IEHandlerF_"+EventName;
        Elem[StoreName]=IEHandlerF; // сохраняем ссылку на обёртку, чтобы найти её при удалении обработчика
      }
      else // устаревшие браузеры
        if ( !Elem[EventName2] )
          Elem[EventName2]=HandlerFunc; // не сработает если несколько обработчиков одного события
    }
}

// отмена обработки события по умолчанию
// EO - объект события
function PreventDefault(EO) {
  if ( EO.preventDefault )
      EO.preventDefault(); 
  else
      EO.returnValue=false;
}
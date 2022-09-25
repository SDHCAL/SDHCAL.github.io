/*
 @licstart  The following is the entire license notice for the JavaScript code in this file.
 The code below is based on SVGPan Library 1.2 and was modified for doxygen
 to support both zooming and panning via the mouse and via embedded buttons.

 This code is licensed under the following BSD license:

 Copyright 2009-2010 Andrea Leofreddi <a.leofreddi@itcharm.com>. All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are
 permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this list of
       conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice, this list
       of conditions and the following disclaimer in the documentation and/or other materials
       provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY Andrea Leofreddi ``AS IS'' AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Andrea Leofreddi OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 The views and conclusions contained in the software and documentation are those of the
 authors and should not be interpreted as representing official policies, either expressed
 or implied, of Andrea Leofreddi.

 @licend  The above is the entire license notice for the JavaScript code in this file
 */
function show(){window.innerHeight?(windowWidth=window.innerWidth,windowHeight=window.innerHeight):document.documentElement.clientWidth&&(windowWidth=document.documentElement.clientWidth,windowHeight=document.documentElement.clientHeight),windowWidth&&windowHeight||(windowWidth=800,windowHeight=600),minZoom=Math.min(Math.min(viewHeight,windowHeight)/viewHeight,Math.min(viewWidth,windowWidth)/viewWidth),maxZoom=minZoom+1.5,zoomInFactor=Math.pow(maxZoom/minZoom,1/zoomSteps),zoomOutFactor=1/zoomInFactor;var e=svgDoc.getElementById("viewport");try{e.getBBox();var t=(windowWidth-viewWidth*minZoom+8)/(2*minZoom),o=viewHeight+(windowHeight-viewHeight*minZoom)/(2*minZoom),n="scale("+minZoom+") rotate(0) translate("+t+" "+o+")";e.setAttribute("transform",n)}catch(i){}}function init(e){svgDoc=e.target.ownerDocument;try{top.window&&top.window.registerShow&&top.window.registerShow(sectionId,show)}catch(t){}show(),setAttributes(root,{onmousedown:"handleMouseDown(evt)",onmousemove:"handleMouseMove(evt)",onmouseup:"handleMouseUp(evt)"}),window.addEventListener&&(navigator.userAgent.toLowerCase().indexOf("webkit")>=0||navigator.userAgent.toLowerCase().indexOf("opera")>=0||-1!=navigator.appVersion.indexOf("MSIE")?window.addEventListener("mousewheel",handleMouseWheel,!1):window.addEventListener("DOMMouseScroll",handleMouseWheel,!1))}function getEventPoint(e){var t=root.createSVGPoint();return t.x=e.clientX,t.y=e.clientY,t}function setCTM(e,t){var o="matrix("+t.a+","+t.b+","+t.c+","+t.d+","+t.e+","+t.f+")";e.setAttribute("transform",o)}function setAttributes(e,t){for(i in t)e.setAttributeNS(null,i,t[i])}function doZoom(e,t,o){var n=t.matrixTransform(e.getCTM().inverse()),i=root.createSVGMatrix().translate(n.x,n.y).scale(o).translate(-n.x,-n.y),r=e.getCTM().multiply(i),a=Math.max(r.a,r.d);a>maxZoom?r=r.translate(n.x,n.y).scale(maxZoom/a).translate(-n.x,-n.y):a<minZoom&&(r=r.translate(n.x,n.y).scale(minZoom/a).translate(-n.x,-n.y)),setCTM(e,r),stateTf=stateTf.multiply(r.inverse())}function handleMouseWheel(e){var t;(e||(e=window.evt),e.shiftKey)&&(e.preventDefault&&e.preventDefault(),e.returnValue=!1,"pan"!=state&&(t=e.wheelDelta?e.wheelDelta/7200:e.detail/-180,doZoom(e.target.ownerDocument.getElementById("viewport"),getEventPoint(e),1+t)))}function handleMouseMove(e){e.preventDefault&&e.preventDefault(),e.returnValue=!1;var t=svgDoc.getElementById("viewport");if("pan"==state){var o=getEventPoint(e).matrixTransform(stateTf);setCTM(t,stateTf.inverse().translate(o.x-stateOrigin.x,o.y-stateOrigin.y))}}function handleMouseDown(e){e.preventDefault&&e.preventDefault(),e.returnValue=!1;var t=svgDoc.getElementById("viewport");state="pan",stateTf=t.getCTM().inverse(),stateOrigin=getEventPoint(e).matrixTransform(stateTf),t.style.cursor=cursorGrab}function handleMouseUp(e){e.preventDefault&&e.preventDefault(),e.returnValue=!1,svgDoc.getElementById("viewport").style.cursor="default",state=""}function dumpMatrix(e){return"[ "+e.a+", "+e.c+", "+e.e+"\n  "+e.b+", "+e.d+", "+e.f+"\n  0, 0, 1 ]"}function handlePan(e,t){var o=svgDoc.getElementById("viewport");setCTM(o,o.getCTM().translate(20*e/minZoom,20*t/minZoom))}function handleReset(){show()}function handleZoom(e,t){var o=svgDoc.getElementById("viewport"),n="in"==t?zoomInFactor:zoomOutFactor,i=(o.getCTM(),root.createSVGPoint());i.x=windowWidth/2,i.y=windowHeight/2,doZoom(o,i,n)}function serializeXmlNode(e){return"undefined"!=typeof window.XMLSerializer?(new window.XMLSerializer).serializeToString(e):"undefined"!=typeof e.xml?e.xml:""}function handlePrint(e){e.returnValue=!1;var t=serializeXmlNode(svgDoc.getElementById("graph"));try{var o=window.open("about:blank","_blank","width="+windowWidth+",height="+windowHeight+",toolbar=0,status=0,menubar=0,scrollbars=0,resizable=0,location=0,directories=0").document;o.write('<html xmlns="http://www.w3.org/1999/xhtml" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'),o.write("<head><title>Print SVG</title></head>"),o.write('<body style="margin: 0px; padding: 0px;" onload="window.print();">'),o.write('<div id="svg" style="width:'+windowWidth+"px; height:"+windowHeight+'px;">'+t+"</div>"),o.write("</body>"),o.write("</html>"),o.close()}catch(n){alert("Failed to open popup window needed for printing!\n"+n.message)}}var stateOrigin,zoomInFactor,zoomOutFactor,windowWidth,windowHeight,svgDoc,minZoom,maxZoom,root=document.documentElement,state="none",stateTf=root.createSVGMatrix(),cursorGrab=' url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFAAAA////////c3ilYwAAAAN0Uk5T//8A18oNQQAAAD1JREFUeNp0zlEKACAIA9Bt9z90bZBZkQj29qFBEuBOzQHSnWTTyckEfqUuZgFvslH4ch3qLCO/Kr8cAgwATw4Ax6XRCcoAAAAASUVORK5CYII="), move',zoomSteps=10;window||(window=this),window.onresize=function(){svgDoc&&show()};
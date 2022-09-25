/*
 @licstart  The following is the entire license notice for the JavaScript code in this file.

 The MIT License (MIT)

 Copyright (C) 1997-2020 by Dimitri van Heesch

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 and associated documentation files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, merge, publish, distribute,
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or
 substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 @licend  The above is the entire license notice for the JavaScript code in this file
 */
function toggleVisibility(e){var s=$(e).attr("id"),t=$("#"+s+"-summary"),i=$("#"+s+"-content"),r=$("#"+s+"-trigger"),o=$(r).attr("src");return!0===i.is(":visible")?(i.hide(),t.show(),$(e).addClass("closed").removeClass("opened"),$(r).attr("src",o.substring(0,o.length-8)+"closed.png")):(i.show(),t.hide(),$(e).removeClass("closed").addClass("opened"),$(r).attr("src",o.substring(0,o.length-10)+"open.png")),!1}function updateStripes(){$("table.directory tr").removeClass("even").filter(":visible:even").addClass("even"),$("table.directory tr").removeClass("odd").filter(":visible:odd").addClass("odd")}function toggleLevel(e){$("table.directory tr").each(function(){var s=this.id.split("_").length-1,t=$("#img"+this.id.substring(3)),i=$("#arr"+this.id.substring(3));s<e+1?(t.removeClass("iconfopen iconfclosed").addClass("iconfopen"),i.html("&#9660;"),$(this).show()):s==e+1?(t.removeClass("iconfclosed iconfopen").addClass("iconfclosed"),i.html("&#9658;"),$(this).show()):$(this).hide()}),updateStripes()}function toggleFolder(e){var s=$("#row_"+e),t=s.nextAll("tr"),i=new RegExp("^row_"+e+"\\d+_$","i"),r=t.filter(function(){return this.id.match(i)});if(!0===r.filter(":first").is(":visible")){(o=s.find("span")).filter(".iconfopen").removeClass("iconfopen").addClass("iconfclosed"),o.filter(".arrow").html("&#9658;"),t.filter("[id^=row_"+e+"]").hide()}else{var o;(o=s.find("span")).filter(".iconfclosed").removeClass("iconfclosed").addClass("iconfopen"),o.filter(".arrow").html("&#9660;");var n=r.find("span");n.filter(".iconfopen").removeClass("iconfopen").addClass("iconfclosed"),n.filter(".arrow").html("&#9658;"),r.show()}updateStripes()}function toggleInherit(e){var s=$("tr.inherit."+e),t=$("tr.inherit_header."+e+" img"),i=$(t).attr("src");!0===s.filter(":first").is(":visible")?(s.css("display","none"),$(t).attr("src",i.substring(0,i.length-8)+"closed.png")):(s.css("display","table-row"),$(t).attr("src",i.substring(0,i.length-10)+"open.png"))}$(document).ready(function(){$(".code,.codeRef").each(function(){$(this).data("powertip",$("#a"+$(this).attr("href").replace(/.*\//,"").replace(/[^a-z_A-Z0-9]/g,"_")).html()),$.fn.powerTip.smartPlacementLists.s=["s","n","ne","se"],$(this).powerTip({placement:"s",smartPlacement:!0,mouseOnToPopup:!0})})});
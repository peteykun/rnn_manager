define("ace/ext/statusbar",["require","exports","module","ace/lib/dom","ace/lib/lang"],function(e,t){"use strict";var i=e("ace/lib/dom"),n=e("ace/lib/lang"),s=function(e,t){this.element=i.createElement("div"),this.element.className="ace_status-indicator",this.element.style.cssText="display: inline-block;",t.appendChild(this.element);var s=n.delayedCall(function(){this.updateStatus(e)}.bind(this)).schedule.bind(null,100);e.on("changeStatus",s),e.on("changeSelection",s),e.on("keyboardActivity",s)};(function(){this.updateStatus=function(e){function t(e,t){e&&i.push(e,t||"|")}var i=[];t(e.keyBinding.getStatusText(e)),e.commands.recording&&t("REC");var n=e.selection,s=n.lead;if(!n.isEmpty()){var o=e.getSelectionRange();t("("+(o.end.row-o.start.row)+":"+(o.end.column-o.start.column)+")"," ")}t(s.row+":"+s.column," "),n.rangeCount&&t("["+n.rangeCount+"]"," "),i.pop(),this.element.textContent=i.join("")}}).call(s.prototype),t.StatusBar=s}),function(){window.require(["ace/ext/statusbar"],function(){})}();
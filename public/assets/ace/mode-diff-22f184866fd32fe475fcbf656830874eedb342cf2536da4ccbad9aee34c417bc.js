define("ace/mode/diff_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,r=function(){this.$rules={start:[{regex:"^(?:\\*{15}|={67}|-{3}|\\+{3})$",token:"punctuation.definition.separator.diff",name:"keyword"},{regex:"^(@@)(\\s*.+?\\s*)(@@)(.*)$",token:["constant","constant.numeric","constant","comment.doc.tag"]},{regex:"^(\\d+)([,\\d]+)(a|d|c)(\\d+)([,\\d]+)(.*)$",token:["constant.numeric","punctuation.definition.range.diff","constant.function","constant.numeric","punctuation.definition.range.diff","invalid"],name:"meta."},{regex:"^(\\-{3}|\\+{3}|\\*{3})( .+)$",token:["constant.numeric","meta.tag"]},{regex:"^([!+>])(.*?)(\\s*)$",token:["support.constant","text","invalid"]},{regex:"^([<\\-])(.*?)(\\s*)$",token:["support.function","string","invalid"]},{regex:"^(diff)(\\s+--\\w+)?(.+?)( .+)?$",token:["variable","variable","keyword","variable"]},{regex:"^Index.+$",token:"variable"},{regex:"^\\s+$",token:"text"},{regex:"\\s*$",token:"invalid"},{defaultToken:"invisible",caseInsensitive:!0}]}};n.inherits(r,i),t.DiffHighlightRules=r}),define("ace/mode/folding/diff",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t){"use strict";var n=e("../../lib/oop"),i=e("./fold_mode").FoldMode,r=e("../../range").Range,o=t.FoldMode=function(e,t){this.regExpList=e,this.flag=t,this.foldingStartMarker=RegExp("^("+e.join("|")+")",this.flag)};n.inherits(o,i),function(){this.getFoldWidgetRange=function(e,t,n){for(var i=e.getLine(n),o={row:n,column:i.length},s=this.regExpList,a=1;a<=s.length;a++){var l=RegExp("^("+s.slice(0,a).join("|")+")",this.flag);if(l.test(i))break}for(var c=e.getLength();++n<c&&(i=e.getLine(n),!l.test(i)););return n!=o.row+1?r.fromPoints(o,{row:n-1,column:i.length}):void 0}}.call(o.prototype)}),define("ace/mode/diff",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/diff_highlight_rules","ace/mode/folding/diff"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text").Mode,r=e("./diff_highlight_rules").DiffHighlightRules,o=e("./folding/diff").FoldMode,s=function(){this.HighlightRules=r,this.foldingRules=new o(["diff","index","\\+{3}","@@|\\*{5}"],"i")};n.inherits(s,i),function(){this.$id="ace/mode/diff"}.call(s.prototype),t.Mode=s});
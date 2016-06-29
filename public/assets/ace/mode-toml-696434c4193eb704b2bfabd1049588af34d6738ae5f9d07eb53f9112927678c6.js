define("ace/mode/toml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=function(){var e=this.createKeywordMapper({"constant.language.boolean":"true|false"},"identifier"),t="[a-zA-Z\\$_\xa1-\uffff][a-zA-Z\\d\\$_\xa1-\uffff]*\\b";this.$rules={start:[{token:"comment.toml",regex:/#.*$/},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:["variable.keygroup.toml"],regex:"(?:^\\s*)(\\[\\[([^\\]]+)\\]\\])"},{token:["variable.keygroup.toml"],regex:"(?:^\\s*)(\\[([^\\]]+)\\])"},{token:e,regex:t},{token:"support.date.toml",regex:"\\d{4}-\\d{2}-\\d{2}(T)\\d{2}:\\d{2}:\\d{2}(Z)"},{token:"constant.numeric.toml",regex:"-?\\d+(\\.?\\d+)?"}],qqstring:[{token:"string",regex:"\\\\$",next:"qqstring"},{token:"constant.language.escape",regex:'\\\\[0tnr"\\\\]'},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}]}};n.inherits(o,r),t.TomlHighlightRules=o}),define("ace/mode/folding/ini",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var n=e("../../lib/oop"),r=e("../../range").Range,o=e("./fold_mode").FoldMode,i=t.FoldMode=function(){};n.inherits(i,o),function(){this.foldingStartMarker=/^\s*\[([^\])]*)]\s*(?:$|[;#])/,this.getFoldWidgetRange=function(e,t,n){var o=this.foldingStartMarker,i=e.getLine(n),a=i.match(o);if(a){for(var s=a[1]+".",l=i.length,c=e.getLength(),u=n,d=n;++n<c;)if(i=e.getLine(n),!/^\s*$/.test(i)){if(a=i.match(o),a&&0!==a[1].lastIndexOf(s,0))break;d=n}if(d>u){var g=e.getLine(d).length;return new r(u,l,d,g)}}}}.call(i.prototype)}),define("ace/mode/toml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/toml_highlight_rules","ace/mode/folding/ini"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text").Mode,o=e("./toml_highlight_rules").TomlHighlightRules,i=e("./folding/ini").FoldMode,a=function(){this.HighlightRules=o,this.foldingRules=new i};n.inherits(a,r),function(){this.lineCommentStart="#",this.$id="ace/mode/toml"}.call(a.prototype),t.Mode=a});
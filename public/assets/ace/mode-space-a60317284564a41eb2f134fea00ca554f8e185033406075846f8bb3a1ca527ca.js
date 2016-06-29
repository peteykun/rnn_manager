define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t){"use strict";var n=e("../../lib/oop"),r=e("./fold_mode").FoldMode,o=e("../../range").Range,i=t.FoldMode=function(){};n.inherits(i,r),function(){this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;var i=/\S/,a=e.getLine(n),s=a.search(i);if(-1!=s&&"#"==a[s]){for(var l=a.length,c=e.getLength(),u=n,d=n;++n<c;){a=e.getLine(n);var g=a.search(i);if(-1!=g){if("#"!=a[g])break;d=n}}if(d>u){var m=e.getLine(d).length;return new o(u,l,d,m)}}},this.getFoldWidget=function(e,t,n){var r=e.getLine(n),o=r.search(/\S/),i=e.getLine(n+1),a=e.getLine(n-1),s=a.search(/\S/),l=i.search(/\S/);if(-1==o)return e.foldWidgets[n-1]=-1!=s&&l>s?"start":"","";if(-1==s){if(o==l&&"#"==r[o]&&"#"==i[o])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(s==o&&"#"==r[o]&&"#"==a[o]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return-1!=s&&o>s?e.foldWidgets[n-1]="start":e.foldWidgets[n-1]="",l>o?"start":""}}.call(i.prototype)}),define("ace/mode/space_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"empty_line",regex:/ */,next:"key"},{token:"empty_line",regex:/$/,next:"key"}],key:[{token:"variable",regex:/\S+/},{token:"empty_line",regex:/$/,next:"start"},{token:"keyword.operator",regex:/ /,next:"value"}],value:[{token:"keyword.operator",regex:/$/,next:"start"},{token:"string",regex:/[^$]/}]}};n.inherits(o,r),t.SpaceHighlightRules=o}),define("ace/mode/space",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/folding/coffee","ace/mode/space_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text").Mode,o=e("./folding/coffee").FoldMode,i=e("./space_highlight_rules").SpaceHighlightRules,a=function(){this.HighlightRules=i,this.foldingRules=new o};n.inherits(a,r),function(){this.$id="ace/mode/space"}.call(a.prototype),t.Mode=a});
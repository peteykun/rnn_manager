define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,r=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},r.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};n.inherits(r,i),r.getTagRule=function(){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},r.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},r.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=r}),define("ace/mode/csharp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./doc_comment_highlight_rules").DocCommentHighlightRules,r=e("./text_highlight_rules").TextHighlightRules,o=function(){var e=this.createKeywordMapper({"variable.language":"this",keyword:"abstract|event|new|struct|as|explicit|null|switch|base|extern|object|this|bool|false|operator|throw|break|finally|out|true|byte|fixed|override|try|case|float|params|typeof|catch|for|private|uint|char|foreach|protected|ulong|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|ushort|continue|in|return|using|decimal|int|sbyte|virtual|default|interface|sealed|volatile|delegate|internal|short|void|do|is|sizeof|while|double|lock|stackalloc|else|long|static|enum|namespace|string|var|dynamic","constant.language":"null|true|false"},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},i.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:/'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))'/},{token:"string",start:'"',end:'"|$',next:[{token:"constant.language.escape",regex:/\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/},{token:"invalid",regex:/\\./}]},{token:"string",start:'@"',end:'"',next:[{token:"constant.language.escape",regex:'""'}]},{token:"string",start:/\$"/,end:'"|$',next:[{token:"constant.language.escape",regex:/\\(:?$)|{{/},{token:"constant.language.escape",regex:/\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/},{token:"invalid",regex:/\\./}]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"keyword",regex:"^\\s*#(if|else|elif|endif|define|undef|warning|error|line|region|endregion|pragma)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}]},this.embedRules(i,"doc-",[i.getEndRule("start")]),this.normalizeRules()};n.inherits(o,r),t.CSharpHighlightRules=o}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var n=e("../range").Range,i=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var i=e.getLine(t),r=i.match(/^(\s*\})/);if(!r)return 0;var o=r[1].length,s=e.findMatchingBracket({row:t,column:o});if(!s||s.row==t)return 0;var a=this.$getIndent(e.getLine(s.row));e.replace(new n(t,0,t,o-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype),t.MatchingBraceOutdent=i}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){"use strict";var n,i=e("../../lib/oop"),r=e("../behaviour").Behaviour,o=e("../../token_iterator").TokenIterator,s=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],l=["text","paren.rparen","punctuation.operator","comment"],c={},h=function(e){var t=-1;return e.multiSelect&&(t=e.selection.index,c.rangeCount!=e.multiSelect.rangeCount&&(c={rangeCount:e.multiSelect.rangeCount})),c[t]?n=c[t]:void(n=c[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},u=function(e,t,n,i){var r=e.end.row-e.start.row;return{text:n+t+i,selection:[0,e.start.column+1,r,e.end.column+(r?0:1)]}},d=function(){this.add("braces","insertion",function(e,t,i,r,o){var a=i.getCursorPosition(),l=r.doc.getLine(a.row);if("{"==o){h(i);var c=i.getSelectionRange(),g=r.doc.getTextRange(c);if(""!==g&&"{"!==g&&i.getWrapBehavioursEnabled())return u(c,g,"{","}");if(d.isSaneInsertion(i,r))return/[\]\}\)]/.test(l[a.column])||i.inMultiSelectMode?(d.recordAutoInsert(i,r,"}"),{text:"{}",selection:[1,1]}):(d.recordMaybeInsert(i,r,"{"),{text:"{",selection:[1,1]})}else if("}"==o){h(i);var p=l.substring(a.column,a.column+1);if("}"==p){var m=r.$findOpeningBracket("}",{column:a.column+1,row:a.row});if(null!==m&&d.isAutoInsertedClosing(a,l,o))return d.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==o||"\r\n"==o){h(i);var f="";d.isMaybeInsertedClosing(a,l)&&(f=s.stringRepeat("}",n.maybeInsertedBrackets),d.clearMaybeInsertedClosing());var p=l.substring(a.column,a.column+1);if("}"===p){var C=r.findMatchingBracket({row:a.row,column:a.column+1},"}");if(!C)return null;var v=this.$getIndent(r.getLine(C.row))}else{if(!f)return void d.clearMaybeInsertedClosing();var v=this.$getIndent(l)}var b=v+r.getTabString();return{text:"\n"+b+"\n"+v+f,selection:[1,b.length,1,b.length]}}d.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,i,r,o){var s=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==s){h(i);var a=r.doc.getLine(o.start.row),l=a.substring(o.end.column,o.end.column+1);if("}"==l)return o.end.column++,o;n.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,i,r){if("("==r){h(n);var o=n.getSelectionRange(),s=i.doc.getTextRange(o);if(""!==s&&n.getWrapBehavioursEnabled())return u(o,s,"(",")");if(d.isSaneInsertion(n,i))return d.recordAutoInsert(n,i,")"),{text:"()",selection:[1,1]}}else if(")"==r){h(n);var a=n.getCursorPosition(),l=i.doc.getLine(a.row),c=l.substring(a.column,a.column+1);if(")"==c){var g=i.$findOpeningBracket(")",{column:a.column+1,row:a.row});if(null!==g&&d.isAutoInsertedClosing(a,l,r))return d.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,i,r){var o=i.doc.getTextRange(r);if(!r.isMultiLine()&&"("==o){h(n);var s=i.doc.getLine(r.start.row),a=s.substring(r.start.column+1,r.start.column+2);if(")"==a)return r.end.column++,r}}),this.add("brackets","insertion",function(e,t,n,i,r){if("["==r){h(n);var o=n.getSelectionRange(),s=i.doc.getTextRange(o);if(""!==s&&n.getWrapBehavioursEnabled())return u(o,s,"[","]");if(d.isSaneInsertion(n,i))return d.recordAutoInsert(n,i,"]"),{text:"[]",selection:[1,1]}}else if("]"==r){h(n);var a=n.getCursorPosition(),l=i.doc.getLine(a.row),c=l.substring(a.column,a.column+1);if("]"==c){var g=i.$findOpeningBracket("]",{column:a.column+1,row:a.row});if(null!==g&&d.isAutoInsertedClosing(a,l,r))return d.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,i,r){var o=i.doc.getTextRange(r);if(!r.isMultiLine()&&"["==o){h(n);var s=i.doc.getLine(r.start.row),a=s.substring(r.start.column+1,r.start.column+2);if("]"==a)return r.end.column++,r}}),this.add("string_dquotes","insertion",function(e,t,n,i,r){if('"'==r||"'"==r){h(n);var o=r,s=n.getSelectionRange(),a=i.doc.getTextRange(s);if(""!==a&&"'"!==a&&'"'!=a&&n.getWrapBehavioursEnabled())return u(s,a,o,o);if(!a){var l=n.getCursorPosition(),c=i.doc.getLine(l.row),d=c.substring(l.column-1,l.column),g=c.substring(l.column,l.column+1),p=i.getTokenAt(l.row,l.column),m=i.getTokenAt(l.row,l.column+1);if("\\"==d&&p&&/escape/.test(p.type))return null;var f,C=p&&/string|escape/.test(p.type),v=!m||/string|escape/.test(m.type);if(g==o)f=C!==v;else{if(C&&!v)return null;if(C&&v)return null;var b=i.$mode.tokenRe;b.lastIndex=0;var x=b.test(d);b.lastIndex=0;var w=b.test(d);if(x||w)return null;if(g&&!/[\s;,.})\]\\]/.test(g))return null;f=!0}return{text:f?o+o:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,i,r){var o=i.doc.getTextRange(r);if(!r.isMultiLine()&&('"'==o||"'"==o)){h(n);var s=i.doc.getLine(r.start.row),a=s.substring(r.start.column+1,r.start.column+2);if(a==o)return r.end.column++,r}})};d.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),i=new o(t,n.row,n.column);if(!this.$matchTokenType(i.getCurrentToken()||"text",a)){var r=new o(t,n.row,n.column+1);if(!this.$matchTokenType(r.getCurrentToken()||"text",a))return!1}return i.stepForward(),i.getCurrentTokenRow()!==n.row||this.$matchTokenType(i.getCurrentToken()||"text",l)},d.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},d.recordAutoInsert=function(e,t,i){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,o,n.autoInsertedLineEnd[0])||(n.autoInsertedBrackets=0),n.autoInsertedRow=r.row,n.autoInsertedLineEnd=i+o.substr(r.column),n.autoInsertedBrackets++},d.recordMaybeInsert=function(e,t,i){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,o)||(n.maybeInsertedBrackets=0),n.maybeInsertedRow=r.row,n.maybeInsertedLineStart=o.substr(0,r.column)+i,n.maybeInsertedLineEnd=o.substr(r.column),n.maybeInsertedBrackets++},d.isAutoInsertedClosing=function(e,t,i){return n.autoInsertedBrackets>0&&e.row===n.autoInsertedRow&&i===n.autoInsertedLineEnd[0]&&t.substr(e.column)===n.autoInsertedLineEnd},d.isMaybeInsertedClosing=function(e,t){return n.maybeInsertedBrackets>0&&e.row===n.maybeInsertedRow&&t.substr(e.column)===n.maybeInsertedLineEnd&&t.substr(0,e.column)==n.maybeInsertedLineStart},d.popAutoInsertedClosing=function(){n.autoInsertedLineEnd=n.autoInsertedLineEnd.substr(1),n.autoInsertedBrackets--},d.clearMaybeInsertedClosing=function(){n&&(n.maybeInsertedBrackets=0,n.maybeInsertedRow=-1)},i.inherits(d,r),t.CstyleBehaviour=d}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var n=e("../../lib/oop"),i=e("../../range").Range,r=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(o,r),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var i=e.getLine(n);if(this.singleLineBlockCommentRe.test(i)&&!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return"";var r=this._getFoldWidgetBase(e,t,n);return!r&&this.startRegionRe.test(i)?"start":r},this.getFoldWidgetRange=function(e,t,n,i){var r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);var o=r.match(this.foldingStartMarker);if(o){var s=o.index;if(o[1])return this.openingBracketBlock(e,o[1],n,s);var a=e.getCommentFoldRange(n,s+o[0].length,1);return a&&!a.isMultiLine()&&(i?a=this.getSectionRange(e,n):"all"!=t&&(a=null)),a}if("markbegin"!==t){var o=r.match(this.foldingStopMarker);if(o){var s=o.index+o[0].length;return o[1]?this.closingBracketBlock(e,o[1],n,s):e.getCommentFoldRange(n,s,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),o=t,s=n.length;t+=1;for(var a=t,l=e.getLength();++t<l;){n=e.getLine(t);var c=n.search(/\S/);if(-1!==c){if(r>c)break;var h=this.getFoldWidgetRange(e,"all",t);if(h){if(h.start.row<=o)break;if(h.isMultiLine())t=h.end.row;else if(r==c)break}a=t}}return new i(o,s,a,e.getLine(a).length)},this.getCommentRegionBlock=function(e,t,n){for(var r=t.search(/\s*$/),o=e.getLength(),s=n,a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;++n<o;){t=e.getLine(n);var c=a.exec(t);if(c&&(c[1]?l--:l++,!l))break}var h=n;return h>s?new i(s,r,h,t.length):void 0}}.call(o.prototype)}),define("ace/mode/folding/csharp",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/cstyle"],function(e,t){"use strict";var n=e("../../lib/oop"),i=e("../../range").Range,r=e("./cstyle").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(o,r),function(){this.usingRe=/^\s*using \S/,this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var i=this.getFoldWidgetBase(e,t,n);if(!i){var r=e.getLine(n);if(/^\s*#region\b/.test(r))return"start";var o=this.usingRe;if(o.test(r)){var s=e.getLine(n-1),a=e.getLine(n+1);if(!o.test(s)&&o.test(a))return"start"}}return i},this.getFoldWidgetRange=function(e,t,n){var i=this.getFoldWidgetRangeBase(e,t,n);if(i)return i;var r=e.getLine(n);return this.usingRe.test(r)?this.getUsingStatementBlock(e,r,n):/^\s*#region\b/.test(r)?this.getRegionBlock(e,r,n):void 0},this.getUsingStatementBlock=function(e,t,n){for(var r=t.match(this.usingRe)[0].length-1,o=e.getLength(),s=n,a=n;++n<o;)if(t=e.getLine(n),!/^\s*$/.test(t)){if(!this.usingRe.test(t))break;a=n}if(a>s){var l=e.getLine(a).length;return new i(s,r,a,l)}},this.getRegionBlock=function(e,t,n){for(var r=t.search(/\s*$/),o=e.getLength(),s=n,a=/^\s*#(end)?region\b/,l=1;++n<o;){t=e.getLine(n);var c=a.exec(t);if(c&&(c[1]?l--:l++,!l))break}var h=n;return h>s?new i(s,r,h,t.length):void 0}}.call(o.prototype)}),define("ace/mode/csharp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/csharp_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/csharp"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text").Mode,r=e("./csharp_highlight_rules").CSharpHighlightRules,o=e("./matching_brace_outdent").MatchingBraceOutdent,s=e("./behaviour/cstyle").CstyleBehaviour,a=e("./folding/csharp").FoldMode,l=function(){this.HighlightRules=r,this.$outdent=new o,this.$behaviour=new s,this.foldingRules=new a};n.inherits(l,i),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var i=this.$getIndent(t),r=this.getTokenizer().getLineTokens(t,e),o=r.tokens;if(o.length&&"comment"==o[o.length-1].type)return i;if("start"==e){var s=t.match(/^.*[\{\(\[]\s*$/);s&&(i+=n)}return i},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(){return null},this.$id="ace/mode/csharp"}.call(l.prototype),t.Mode=l});
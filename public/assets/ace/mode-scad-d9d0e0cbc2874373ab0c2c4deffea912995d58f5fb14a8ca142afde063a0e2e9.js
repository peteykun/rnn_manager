define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},o.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};n.inherits(o,r),o.getTagRule=function(){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},o.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},o.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=o}),define("ace/mode/scad_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=(e("../lib/lang"),e("./doc_comment_highlight_rules").DocCommentHighlightRules),o=e("./text_highlight_rules").TextHighlightRules,i=function(){var e=this.createKeywordMapper({"variable.language":"this",keyword:"module|if|else|for","constant.language":"NULL"},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},r.getStartRule("start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant",regex:"<[a-zA-Z0-9.]+>"},{token:"keyword",regex:"(?:use|include)"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",regex:".+"}]},this.embedRules(r,"doc-",[r.getEndRule("start")])};n.inherits(i,o),t.scadHighlightRules=i}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var n=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){"use strict";var n,r=e("../../lib/oop"),o=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,a=e("../../lib/lang"),s=["text","paren.rparen","punctuation.operator"],l=["text","paren.rparen","punctuation.operator","comment"],c={},u=function(e){var t=-1;return e.multiSelect&&(t=e.selection.index,c.rangeCount!=e.multiSelect.rangeCount&&(c={rangeCount:e.multiSelect.rangeCount})),c[t]?n=c[t]:void(n=c[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},d=function(e,t,n,r){var o=e.end.row-e.start.row;return{text:n+t+r,selection:[0,e.start.column+1,o,e.end.column+(o?0:1)]}},g=function(){this.add("braces","insertion",function(e,t,r,o,i){var s=r.getCursorPosition(),l=o.doc.getLine(s.row);if("{"==i){u(r);var c=r.getSelectionRange(),m=o.doc.getTextRange(c);if(""!==m&&"{"!==m&&r.getWrapBehavioursEnabled())return d(c,m,"{","}");if(g.isSaneInsertion(r,o))return/[\]\}\)]/.test(l[s.column])||r.inMultiSelectMode?(g.recordAutoInsert(r,o,"}"),{text:"{}",selection:[1,1]}):(g.recordMaybeInsert(r,o,"{"),{text:"{",selection:[1,1]})}else if("}"==i){u(r);var p=l.substring(s.column,s.column+1);if("}"==p){var h=o.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==h&&g.isAutoInsertedClosing(s,l,i))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==i||"\r\n"==i){u(r);var f="";g.isMaybeInsertedClosing(s,l)&&(f=a.stringRepeat("}",n.maybeInsertedBrackets),g.clearMaybeInsertedClosing());var p=l.substring(s.column,s.column+1);if("}"===p){var _=o.findMatchingBracket({row:s.row,column:s.column+1},"}");if(!_)return null;var x=this.$getIndent(o.getLine(_.row))}else{if(!f)return void g.clearMaybeInsertedClosing();var x=this.$getIndent(l)}var b=x+o.getTabString();return{text:"\n"+b+"\n"+x+f,selection:[1,b.length,1,b.length]}}g.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,r,o,i){var a=o.doc.getTextRange(i);if(!i.isMultiLine()&&"{"==a){u(r);var s=o.doc.getLine(i.start.row),l=s.substring(i.end.column,i.end.column+1);if("}"==l)return i.end.column++,i;n.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){u(n);var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return d(i,a,"(",")");if(g.isSaneInsertion(n,r))return g.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){u(n);var s=n.getCursorPosition(),l=r.doc.getLine(s.row),c=l.substring(s.column,s.column+1);if(")"==c){var m=r.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==m&&g.isAutoInsertedClosing(s,l,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){u(n);var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(")"==s)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){u(n);var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return d(i,a,"[","]");if(g.isSaneInsertion(n,r))return g.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){u(n);var s=n.getCursorPosition(),l=r.doc.getLine(s.row),c=l.substring(s.column,s.column+1);if("]"==c){var m=r.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==m&&g.isAutoInsertedClosing(s,l,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){u(n);var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if("]"==s)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){u(n);var i=o,a=n.getSelectionRange(),s=r.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return d(a,s,i,i);if(!s){var l=n.getCursorPosition(),c=r.doc.getLine(l.row),g=c.substring(l.column-1,l.column),m=c.substring(l.column,l.column+1),p=r.getTokenAt(l.row,l.column),h=r.getTokenAt(l.row,l.column+1);if("\\"==g&&p&&/escape/.test(p.type))return null;var f,_=p&&/string|escape/.test(p.type),x=!h||/string|escape/.test(h.type);if(m==i)f=_!==x;else{if(_&&!x)return null;if(_&&x)return null;var b=r.$mode.tokenRe;b.lastIndex=0;var k=b.test(g);b.lastIndex=0;var v=b.test(g);if(k||v)return null;if(m&&!/[\s;,.})\]\\]/.test(m))return null;f=!0}return{text:f?i+i:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){u(n);var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(s==i)return o.end.column++,o}})};g.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new i(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",s)){var o=new i(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",s))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",l)},g.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},g.recordAutoInsert=function(e,t,r){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isAutoInsertedClosing(o,i,n.autoInsertedLineEnd[0])||(n.autoInsertedBrackets=0),n.autoInsertedRow=o.row,n.autoInsertedLineEnd=r+i.substr(o.column),n.autoInsertedBrackets++},g.recordMaybeInsert=function(e,t,r){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isMaybeInsertedClosing(o,i)||(n.maybeInsertedBrackets=0),n.maybeInsertedRow=o.row,n.maybeInsertedLineStart=i.substr(0,o.column)+r,n.maybeInsertedLineEnd=i.substr(o.column),n.maybeInsertedBrackets++},g.isAutoInsertedClosing=function(e,t,r){return n.autoInsertedBrackets>0&&e.row===n.autoInsertedRow&&r===n.autoInsertedLineEnd[0]&&t.substr(e.column)===n.autoInsertedLineEnd},g.isMaybeInsertedClosing=function(e,t){return n.maybeInsertedBrackets>0&&e.row===n.maybeInsertedRow&&t.substr(e.column)===n.maybeInsertedLineEnd&&t.substr(0,e.column)==n.maybeInsertedLineStart},g.popAutoInsertedClosing=function(){n.autoInsertedLineEnd=n.autoInsertedLineEnd.substr(1),n.autoInsertedBrackets--},g.clearMaybeInsertedClosing=function(){n&&(n.maybeInsertedBrackets=0,n.maybeInsertedRow=-1)},r.inherits(g,o),t.CstyleBehaviour=g}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var n=e("../../lib/oop"),r=e("../../range").Range,o=e("./fold_mode").FoldMode,i=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(i,o),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var o=this._getFoldWidgetBase(e,t,n);return!o&&this.startRegionRe.test(r)?"start":o},this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var i=o.match(this.foldingStartMarker);if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,a);var s=e.getCommentFoldRange(n,a+i[0].length,1);return s&&!s.isMultiLine()&&(r?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t){var i=o.match(this.foldingStopMarker);if(i){var a=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,a):e.getCommentFoldRange(n,a,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),o=n.search(/\S/),i=t,a=n.length;t+=1;for(var s=t,l=e.getLength();++t<l;){n=e.getLine(t);var c=n.search(/\S/);if(-1!==c){if(o>c)break;var u=this.getFoldWidgetRange(e,"all",t);if(u){if(u.start.row<=i)break;if(u.isMultiLine())t=u.end.row;else if(o==c)break}s=t}}return new r(i,a,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,n){for(var o=t.search(/\s*$/),i=e.getLength(),a=n,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;++n<i;){t=e.getLine(n);var c=s.exec(t);if(c&&(c[1]?l--:l++,!l))break}var u=n;return u>a?new r(a,o,u,t.length):void 0}}.call(i.prototype)}),define("ace/mode/scad",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/scad_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text").Mode,o=e("./scad_highlight_rules").scadHighlightRules,i=e("./matching_brace_outdent").MatchingBraceOutdent,a=(e("../range").Range,e("./behaviour/cstyle").CstyleBehaviour),s=e("./folding/cstyle").FoldMode,l=function(){this.HighlightRules=o,this.$outdent=new i,this.$behaviour=new a,this.foldingRules=new s};n.inherits(l,r),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),i=o.tokens,a=o.state;if(i.length&&"comment"==i[i.length-1].type)return r;if("start"==e){var s=t.match(/^.*[\{\(\[]\s*$/);s&&(r+=n)}else if("doc-start"==e){if("start"==a)return"";var s=t.match(/^\s*(\/?)\*/);s&&(s[1]&&(r+=" "),r+="* ")}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/scad"}.call(l.prototype),t.Mode=l});
define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var n=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r}),define("ace/mode/livescript",["require","exports","module","ace/tokenizer","ace/mode/matching_brace_outdent","ace/mode/text"],function(e,t){function n(e,t){function n(){}return n.prototype=(e.superclass=t).prototype,(e.prototype=new n).constructor=e,"function"==typeof t.extended&&t.extended(e),e}function r(e,t){var n={}.hasOwnProperty;for(var r in t)n.call(t,r)&&(e[r]=t[r]);return e}var o,i,a,s;o="(?![\\d\\s])[$\\w\\xAA-\\uFFDC](?:(?!\\s)[$\\w\\xAA-\\uFFDC]|-[A-Za-z])*",t.Mode=i=function(t){function i(){var t;this.$tokenizer=new(e("../tokenizer").Tokenizer)(i.Rules),(t=e("../mode/matching_brace_outdent"))&&(this.$outdent=new t.MatchingBraceOutdent),this.$id="ace/mode/livescript"}var a,s=n((r(i,t).displayName="LiveScriptMode",i),t).prototype;return a=RegExp("(?:[({[=:]|[-~]>|\\b(?:e(?:lse|xport)|d(?:o|efault)|t(?:ry|hen)|finally|import(?:\\s*all)?|const|var|let|new|catch(?:\\s*"+o+")?))\\s*$"),s.getNextLineIndent=function(e,t,n){var r,o;return r=this.$getIndent(t),o=this.$tokenizer.getLineTokens(t,e).tokens,o.length&&"comment"===o[o.length-1].type||"start"===e&&a.test(t)&&(r+=n),r},s.lineCommentStart="#",s.blockComment={start:"###",end:"###"},s.checkOutdent=function(e,t,n){var r;return null!=(r=this.$outdent)?r.checkOutdent(t,n):void 0},s.autoOutdent=function(e,t,n){var r;return null!=(r=this.$outdent)?r.autoOutdent(t,n):void 0},i}(e("../mode/text").Mode),a="(?![$\\w]|-[A-Za-z]|\\s*:(?![:=]))",s={defaultToken:"string"},i.Rules={start:[{token:"keyword",regex:"(?:t(?:h(?:is|row|en)|ry|ypeof!?)|c(?:on(?:tinue|st)|a(?:se|tch)|lass)|i(?:n(?:stanceof)?|mp(?:ort(?:\\s+all)?|lements)|[fs])|d(?:e(?:fault|lete|bugger)|o)|f(?:or(?:\\s+own)?|inally|unction)|s(?:uper|witch)|e(?:lse|x(?:tends|port)|val)|a(?:nd|rguments)|n(?:ew|ot)|un(?:less|til)|w(?:hile|ith)|o[fr]|return|break|let|var|loop)"+a},{token:"constant.language",regex:"(?:true|false|yes|no|on|off|null|void|undefined)"+a},{token:"invalid.illegal",regex:"(?:p(?:ackage|r(?:ivate|otected)|ublic)|i(?:mplements|nterface)|enum|static|yield)"+a},{token:"language.support.class",regex:"(?:R(?:e(?:gExp|ferenceError)|angeError)|S(?:tring|yntaxError)|E(?:rror|valError)|Array|Boolean|Date|Function|Number|Object|TypeError|URIError)"+a},{token:"language.support.function",regex:"(?:is(?:NaN|Finite)|parse(?:Int|Float)|Math|JSON|(?:en|de)codeURI(?:Component)?)"+a},{token:"variable.language",regex:"(?:t(?:hat|il|o)|f(?:rom|allthrough)|it|by|e)"+a},{token:"identifier",regex:o+"\\s*:(?![:=])"},{token:"variable",regex:o},{token:"keyword.operator",regex:"(?:\\.{3}|\\s+\\?)"},{token:"keyword.variable",regex:"(?:@+|::|\\.\\.)",next:"key"},{token:"keyword.operator",regex:"\\.\\s*",next:"key"},{token:"string",regex:"\\\\\\S[^\\s,;)}\\]]*"},{token:"string.doc",regex:"'''",next:"qdoc"},{token:"string.doc",regex:'"""',next:"qqdoc"},{token:"string",regex:"'",next:"qstring"},{token:"string",regex:'"',next:"qqstring"},{token:"string",regex:"`",next:"js"},{token:"string",regex:"<\\[",next:"words"},{token:"string.regex",regex:"//",next:"heregex"},{token:"comment.doc",regex:"/\\*",next:"comment"},{token:"comment",regex:"#.*"},{token:"string.regex",regex:"\\/(?:[^[\\/\\n\\\\]*(?:(?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[\\/\\n\\\\]*)*)\\/[gimy$]{0,4}",next:"key"},{token:"constant.numeric",regex:"(?:0x[\\da-fA-F][\\da-fA-F_]*|(?:[2-9]|[12]\\d|3[0-6])r[\\da-zA-Z][\\da-zA-Z_]*|(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[\\w$]*)"},{token:"lparen",regex:"[({[]"},{token:"rparen",regex:"[)}\\]]",next:"key"},{token:"keyword.operator",regex:"[\\^!|&%+\\-]+"},{token:"text",regex:"\\s+"}],heregex:[{token:"string.regex",regex:".*?//[gimy$?]{0,4}",next:"start"},{token:"string.regex",regex:"\\s*#{"},{token:"comment.regex",regex:"\\s+(?:#.*)?"},{defaultToken:"string.regex"}],key:[{token:"keyword.operator",regex:"[.?@!]+"},{token:"identifier",regex:o,next:"start"},{token:"text",regex:"",next:"start"}],comment:[{token:"comment.doc",regex:".*?\\*/",next:"start"},{defaultToken:"comment.doc"}],qdoc:[{token:"string",regex:".*?'''",next:"key"},s],qqdoc:[{token:"string",regex:'.*?"""',next:"key"},s],qstring:[{token:"string",regex:"[^\\\\']*(?:\\\\.[^\\\\']*)*'",next:"key"},s],qqstring:[{token:"string",regex:'[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',next:"key"},s],js:[{token:"string",regex:"[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",next:"key"},s],words:[{token:"string",regex:".*?\\]>",next:"key"},s]}});
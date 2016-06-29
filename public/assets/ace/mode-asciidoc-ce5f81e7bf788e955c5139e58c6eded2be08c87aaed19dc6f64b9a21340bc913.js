define("ace/mode/asciidoc_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,o=function(){function e(e){var t=/\w/.test(e)?"\\b":"(?:\\B|^)";return t+e+"[^"+e+"].*?"+e+"(?![\\w*])"}var t="[a-zA-Z\xa1-\uffff]+\\b";this.$rules={start:[{token:"empty",regex:/$/},{token:"literal",regex:/^\.{4,}\s*$/,next:"listingBlock"},{token:"literal",regex:/^-{4,}\s*$/,next:"literalBlock"},{token:"string",regex:/^\+{4,}\s*$/,next:"passthroughBlock"},{token:"keyword",regex:/^={4,}\s*$/},{token:"text",regex:/^\s*$/},{token:"empty",regex:"",next:"dissallowDelimitedBlock"}],dissallowDelimitedBlock:[{include:"paragraphEnd"},{token:"comment",regex:"^//.+$"},{token:"keyword",regex:"^(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION):"},{include:"listStart"},{token:"literal",regex:/^\s+.+$/,next:"indentedBlock"},{token:"empty",regex:"",next:"text"}],paragraphEnd:[{token:"doc.comment",regex:/^\/{4,}\s*$/,next:"commentBlock"},{token:"tableBlock",regex:/^\s*[|!]=+\s*$/,next:"tableBlock"},{token:"keyword",regex:/^(?:--|''')\s*$/,next:"start"},{token:"option",regex:/^\[.*\]\s*$/,next:"start"},{token:"pageBreak",regex:/^>{3,}$/,next:"start"},{token:"literal",regex:/^\.{4,}\s*$/,next:"listingBlock"},{token:"titleUnderline",regex:/^(?:={2,}|-{2,}|~{2,}|\^{2,}|\+{2,})\s*$/,next:"start"},{token:"singleLineTitle",regex:/^={1,5}\s+\S.*$/,next:"start"},{token:"otherBlock",regex:/^(?:\*{2,}|_{2,})\s*$/,next:"start"},{token:"optionalTitle",regex:/^\.[^.\s].+$/,next:"start"}],listStart:[{token:"keyword",regex:/^\s*(?:\d+\.|[a-zA-Z]\.|[ixvmIXVM]+\)|\*{1,5}|-|\.{1,5})\s/,next:"listText"},{token:"meta.tag",regex:/^.+(?::{2,4}|;;)(?: |$)/,next:"listText"},{token:"support.function.list.callout",regex:/^(?:<\d+>|\d+>|>) /,next:"text"},{token:"keyword",regex:/^\+\s*$/,next:"start"}],text:[{token:["link","variable.language"],regex:/((?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+)(\[.*?\])/},{token:"link",regex:/(?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+/},{token:"link",regex:/\b[\w\.\/\-]+@[\w\.\/\-]+\b/},{include:"macros"},{include:"paragraphEnd"},{token:"literal",regex:/\+{3,}/,next:"smallPassthrough"},{token:"escape",regex:/\((?:C|TM|R)\)|\.{3}|->|<-|=>|<=|&#(?:\d+|x[a-fA-F\d]+);|(?: |^)--(?=\s+\S)/},{token:"escape",regex:/\\[_*'`+#]|\\{2}[_*'`+#]{2}/},{token:"keyword",regex:/\s\+$/},{token:"text",regex:t},{token:["keyword","string","keyword"],regex:/(<<[\w\d\-$]+,)(.*?)(>>|$)/},{token:"keyword",regex:/<<[\w\d\-$]+,?|>>/},{token:"constant.character",regex:/\({2,3}.*?\){2,3}/},{token:"keyword",regex:/\[\[.+?\]\]/},{token:"support",regex:/^\[{3}[\w\d =\-]+\]{3}/},{include:"quotes"},{token:"empty",regex:/^\s*$/,next:"start"}],listText:[{include:"listStart"},{include:"text"}],indentedBlock:[{token:"literal",regex:/^[\s\w].+$/,next:"indentedBlock"},{token:"literal",regex:"",next:"start"}],listingBlock:[{token:"literal",regex:/^\.{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"constant.numeric",regex:"<\\d+>"},{token:"literal",regex:"[^<]+"},{token:"literal",regex:"<"}],literalBlock:[{token:"literal",regex:/^-{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"constant.numeric",regex:"<\\d+>"},{token:"literal",regex:"[^<]+"},{token:"literal",regex:"<"}],passthroughBlock:[{token:"literal",regex:/^\+{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"literal",regex:t+"|\\d+"},{include:"macros"},{token:"literal",regex:"."}],smallPassthrough:[{token:"literal",regex:/[+]{3,}/,next:"dissallowDelimitedBlock"},{token:"literal",regex:/^\s*$/,next:"dissallowDelimitedBlock"},{token:"literal",regex:t+"|\\d+"},{include:"macros"}],commentBlock:[{token:"doc.comment",regex:/^\/{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"doc.comment",regex:"^.*$"}],tableBlock:[{token:"tableBlock",regex:/^\s*\|={3,}\s*$/,next:"dissallowDelimitedBlock"},{token:"tableBlock",regex:/^\s*!={3,}\s*$/,next:"innerTableBlock"},{token:"tableBlock",regex:/\|/},{include:"text",noEscape:!0}],innerTableBlock:[{token:"tableBlock",regex:/^\s*!={3,}\s*$/,next:"tableBlock"},{token:"tableBlock",regex:/^\s*|={3,}\s*$/,next:"dissallowDelimitedBlock"},{token:"tableBlock",regex:/\!/}],macros:[{token:"macro",regex:/{[\w\-$]+}/},{token:["text","string","text","constant.character","text"],regex:/({)([\w\-$]+)(:)?(.+)?(})/},{token:["text","markup.list.macro","keyword","string"],regex:/(\w+)(footnote(?:ref)?::?)([^\s\[]+)?(\[.*?\])?/},{token:["markup.list.macro","keyword","string"],regex:/([a-zA-Z\-][\w\.\/\-]*::?)([^\s\[]+)(\[.*?\])?/},{token:["markup.list.macro","keyword"],regex:/([a-zA-Z\-][\w\.\/\-]+::?)(\[.*?\])/},{token:"keyword",regex:/^:.+?:(?= |$)/}],quotes:[{token:"string.italic",regex:/__[^_\s].*?__/},{token:"string.italic",regex:e("_")},{token:"keyword.bold",regex:/\*\*[^*\s].*?\*\*/},{token:"keyword.bold",regex:e("\\*")},{token:"literal",regex:e("\\+")},{token:"literal",regex:/\+\+[^+\s].*?\+\+/},{token:"literal",regex:/\$\$.+?\$\$/},{token:"literal",regex:e("`")},{token:"keyword",regex:e("^")},{token:"keyword",regex:e("~")},{token:"keyword",regex:/##?/},{token:"keyword",regex:/(?:\B|^)``|\b''/}]};var n={macro:"constant.character",tableBlock:"doc.comment",titleUnderline:"markup.heading",singleLineTitle:"markup.heading",pageBreak:"string",option:"string.regexp",otherBlock:"markup.list",literal:"support.function",optionalTitle:"constant.numeric",escape:"constant.language.escape",link:"markup.underline.list"};for(var i in this.$rules)for(var o=this.$rules[i],r=o.length;r--;){var s=o[r];if(s.include||"string"==typeof s){var a=[r,1].concat(this.$rules[s.include||s]);s.noEscape&&(a=a.filter(function(e){return!e.next})),o.splice.apply(o,a)}else s.token in n&&(s.token=n[s.token])}};n.inherits(o,i),t.AsciidocHighlightRules=o}),define("ace/mode/folding/asciidoc",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t){"use strict";var n=e("../../lib/oop"),i=e("./fold_mode").FoldMode,o=e("../../range").Range,r=t.FoldMode=function(){};n.inherits(r,i),function(){this.foldingStartMarker=/^(?:\|={10,}|[\.\/=\-~^+]{4,}\s*$|={1,5} )/,this.singleLineHeadingRe=/^={1,5}(?=\s+\S)/,this.getFoldWidget=function(e,t,n){var i=e.getLine(n);return this.foldingStartMarker.test(i)?"="==i[0]?this.singleLineHeadingRe.test(i)?"start":e.getLine(n-1).length!=e.getLine(n).length?"":"start":"dissallowDelimitedBlock"==e.bgTokenizer.getState(n)?"end":"start":""},this.getFoldWidgetRange=function(e,t,n){function i(t){return u=e.getTokens(t)[0],u&&u.type}function r(){var t=u.value.match(p);if(t)return t[0].length;var i=d.indexOf(u.value[0])+1;return 1==i&&e.getLine(n-1).length!=e.getLine(n).length?1/0:i}var s=e.getLine(n),a=s.length,l=e.getLength(),c=n,h=n;if(s.match(this.foldingStartMarker)){var u,d=["=","-","~","^","+"],g="markup.heading",p=this.singleLineHeadingRe;if(i(n)==g){for(var f=r();++n<l;)if(i(n)==g){var m=r();if(f>=m)break}var v=u&&u.value.match(this.singleLineHeadingRe);if(h=v?n-1:n-2,h>c)for(;h>c&&(!i(h)||"["==u.value[0]);)h--;if(h>c){var C=e.getLine(h).length;return new o(c,a,h,C)}}else{var A=e.bgTokenizer.getState(n);if("dissallowDelimitedBlock"==A){for(;n-- >0&&-1!=e.bgTokenizer.getState(n).lastIndexOf("Block"););if(h=n+1,c>h){var C=e.getLine(n).length;return new o(h,5,c,a-5)}}else{for(;++n<l&&"dissallowDelimitedBlock"!=e.bgTokenizer.getState(n););if(h=n,h>c){var C=e.getLine(n).length;return new o(c,5,h,C-5)}}}}}}.call(r.prototype)}),define("ace/mode/asciidoc",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/asciidoc_highlight_rules","ace/mode/folding/asciidoc"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text").Mode,o=e("./asciidoc_highlight_rules").AsciidocHighlightRules,r=e("./folding/asciidoc").FoldMode,s=function(){this.HighlightRules=o,this.foldingRules=new r};n.inherits(s,i),function(){this.type="text",this.getNextLineIndent=function(e,t){if("listblock"==e){var n=/^((?:.+)?)([-+*][ ]+)/.exec(t);return n?new Array(n[1].length+1).join(" ")+n[2]:""}return this.$getIndent(t)},this.$id="ace/mode/asciidoc"}.call(s.prototype),t.Mode=s});
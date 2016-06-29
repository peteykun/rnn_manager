define("ace/mode/sh_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=t.reservedKeywords="!|{|}|case|do|done|elif|else|esac|fi|for|if|in|then|until|while|&|;|export|local|read|typeset|unset|elif|select|set|function|declare|readonly",i=t.languageConstructs="[|]|alias|bg|bind|break|builtin|cd|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|source|suspend|test|times|trap|type|ulimit|umask|unalias|wait",a=function(){var e=this.createKeywordMapper({keyword:o,"support.function.builtin":i,"invalid.deprecated":"debugger"},"identifier"),t="(?:(?:[1-9]\\d*)|(?:0))",n="(?:\\.\\d+)",r="(?:\\d+)",a="(?:(?:"+r+"?"+n+")|(?:"+r+"\\.))",s="(?:(?:"+a+"|"+r+"))",l="(?:"+s+"|"+a+")",c="(?:&"+r+")",u="[a-zA-Z_][a-zA-Z0-9_]*",d="(?:"+u+"=)",g="(?:\\$(?:SHLVL|\\$|\\!|\\?))",h="(?:"+u+"\\s*\\(\\))";this.$rules={start:[{token:"constant",regex:/\\./},{token:["text","comment"],regex:/(^|\s)(#.*)$/},{token:"string",regex:'"',push:[{token:"constant.language.escape",regex:/\\(?:[$`"\\]|$)/},{include:"variables"},{token:"keyword.operator",regex:/`/},{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"string",regex:"\\$'",push:[{token:"constant.language.escape",regex:/\\(?:[abeEfnrtv\\'"]|x[a-fA-F\d]{1,2}|u[a-fA-F\d]{4}([a-fA-F\d]{4})?|c.|\d{1,3})/},{token:"string",regex:"'",next:"pop"},{defaultToken:"string"}]},{regex:"<<<",token:"keyword.operator"},{stateName:"heredoc",regex:"(<<-?)(\\s*)(['\"`]?)([\\w\\-]+)(['\"`]?)",onMatch:function(e,t,n){var r="-"==e[2]?"indentedHeredoc":"heredoc",o=e.split(this.splitRegex);return n.push(r,o[4]),[{type:"constant",value:o[1]},{type:"text",value:o[2]},{type:"string",value:o[3]},{type:"support.class",value:o[4]},{type:"string",value:o[5]}]},rules:{heredoc:[{onMatch:function(e,t,n){return e===n[1]?(n.shift(),n.shift(),this.next=n[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}],indentedHeredoc:[{token:"string",regex:"^	+"},{onMatch:function(e,t,n){return e===n[1]?(n.shift(),n.shift(),this.next=n[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}]}},{regex:"$",token:"empty",next:function(e,t){return"heredoc"===t[0]||"indentedHeredoc"===t[0]?t[0]:e}},{token:["keyword","text","text","text","variable"],regex:/(declare|local|readonly)(\s+)(?:(-[fixar]+)(\s+))?([a-zA-Z_][a-zA-Z0-9_]*\b)/},{token:"variable.language",regex:g},{token:"variable",regex:d},{include:"variables"},{token:"support.function",regex:h},{token:"support.function",regex:c},{token:"string",start:"'",end:"'"},{token:"constant.numeric",regex:l},{token:"constant.numeric",regex:t+"\\b"},{token:e,regex:"[a-zA-Z_][a-zA-Z0-9_]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!=|[%&|`]"},{token:"punctuation.operator",regex:";"},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]]"},{token:"paren.rparen",regex:"[\\)\\}]",next:"pop"}],variables:[{token:"variable",regex:/(\$)(\w+)/},{token:["variable","paren.lparen"],regex:/(\$)(\()/,push:"start"},{token:["variable","paren.lparen","keyword.operator","variable","keyword.operator"],regex:/(\$)(\{)([#!]?)(\w+|[*@#?\-$!0_])(:[?+\-=]?|##?|%%?|,,?\/|\^\^?)?/,push:"start"},{token:"variable",regex:/\$[*@#?\-$!0_]/},{token:["variable","paren.lparen"],regex:/(\$)(\{)/,push:"start"}]},this.normalizeRules()};n.inherits(a,r),t.ShHighlightRules=a}),define("ace/mode/makefile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules","ace/mode/sh_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=e("./sh_highlight_rules"),i=function(){var e=this.createKeywordMapper({keyword:o.reservedKeywords,"support.function.builtin":o.languageConstructs,"invalid.deprecated":"debugger"},"string");this.$rules={start:[{token:"string.interpolated.backtick.makefile",regex:"`",next:"shell-start"},{token:"punctuation.definition.comment.makefile",regex:/#(?=.)/,next:"comment"},{token:["keyword.control.makefile"],regex:"^(?:\\s*\\b)(\\-??include|ifeq|ifneq|ifdef|ifndef|else|endif|vpath|export|unexport|define|endef|override)(?:\\b)"},{token:["entity.name.function.makefile","text"],regex:"^([^\\t ]+(?:\\s[^\\t ]+)*:)(\\s*.*)"}],comment:[{token:"punctuation.definition.comment.makefile",regex:/.+\\/},{token:"punctuation.definition.comment.makefile",regex:".+",next:"start"}],"shell-start":[{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"string",regex:"\\w+"},{token:"string.interpolated.backtick.makefile",regex:"`",next:"start"}]}};n.inherits(i,r),t.MakefileHighlightRules=i}),define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t){"use strict";var n=e("../../lib/oop"),r=e("./fold_mode").FoldMode,o=e("../../range").Range,i=t.FoldMode=function(){};n.inherits(i,r),function(){this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;var i=/\S/,a=e.getLine(n),s=a.search(i);if(-1!=s&&"#"==a[s]){for(var l=a.length,c=e.getLength(),u=n,d=n;++n<c;){a=e.getLine(n);var g=a.search(i);if(-1!=g){if("#"!=a[g])break;d=n}}if(d>u){var h=e.getLine(d).length;return new o(u,l,d,h)}}},this.getFoldWidget=function(e,t,n){var r=e.getLine(n),o=r.search(/\S/),i=e.getLine(n+1),a=e.getLine(n-1),s=a.search(/\S/),l=i.search(/\S/);if(-1==o)return e.foldWidgets[n-1]=-1!=s&&l>s?"start":"","";if(-1==s){if(o==l&&"#"==r[o]&&"#"==i[o])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(s==o&&"#"==r[o]&&"#"==a[o]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return-1!=s&&o>s?e.foldWidgets[n-1]="start":e.foldWidgets[n-1]="",l>o?"start":""}}.call(i.prototype)}),define("ace/mode/makefile",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/makefile_highlight_rules","ace/mode/folding/coffee"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text").Mode,o=e("./makefile_highlight_rules").MakefileHighlightRules,i=e("./folding/coffee").FoldMode,a=function(){this.HighlightRules=o,this.foldingRules=new i};n.inherits(a,r),function(){this.lineCommentStart="#",this.$indentWithTabs=!0,this.$id="ace/mode/makefile"}.call(a.prototype),t.Mode=a});
define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,r=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},r.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};n.inherits(r,i),r.getTagRule=function(){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},r.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},r.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=r}),define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){"use strict";function n(){var e=s.replace("\\d","\\d\\-"),t={onMatch:function(e,t,n){var i="/"==e.charAt(1)?2:1;return 1==i?(t!=this.nextState?n.unshift(this.next,this.nextState,0):n.unshift(this.next),n[2]++):2==i&&t==this.nextState&&(n[1]--,(!n[1]||n[1]<0)&&(n.shift(),n.shift())),[{type:"meta.tag.punctuation."+(1==i?"":"end-")+"tag-open.xml",value:e.slice(0,i)},{type:"meta.tag.tag-name.xml",value:e.substr(i)}]},regex:"</?"+e,next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(t);var n={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[n,t,{include:"reference"},{defaultToken:"string"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(e,t,n){return t==n[0]&&n.shift(),2==e.length&&(n[0]==this.nextState&&n[1]--,(!n[1]||n[1]<0)&&n.splice(0,2)),this.next=n[0]||"start",[{type:this.token,value:e}]},nextState:"jsx"},n,i("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:e},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},t],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}function i(e){return[{token:"comment",regex:/\/\*/,next:[o.getTagRule(),{token:"comment",regex:"\\*\\/",next:e||"pop"},{defaultToken:"comment",caseInsensitive:!0}]},{token:"comment",regex:"\\/\\/",next:[o.getTagRule(),{token:"comment",regex:"$|^",next:e||"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}var r=e("../lib/oop"),o=e("./doc_comment_highlight_rules").DocCommentHighlightRules,a=e("./text_highlight_rules").TextHighlightRules,s="[a-zA-Z\\$_\xa1-\uffff][a-zA-Z\\d\\$_\xa1-\uffff]*\\b",l=function(e){var t=this.createKeywordMapper({"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},"identifier"),r="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",a="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)";this.$rules={no_regex:[o.getStartRule("doc-start"),i("no_regex"),{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/[+-]?\d[\d_]*(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator"],regex:"("+s+")(\\.)(prototype)(\\.)("+s+")(\\s*)(=)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+s+")(\\.)("+s+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+s+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+s+")(\\.)("+s+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+s+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+s+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:"(?:"+r+")\\b",next:"start"},{token:["support.constant"],regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/},{token:t,regex:s},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?\:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+s+")(\\.)("+s+")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:s},{regex:"",token:"empty",next:"no_regex"}],start:[o.getStartRule("doc-start"),i("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],function_arguments:[{token:"variable.parameter",regex:s},{token:"punctuation.operator",regex:"[, ]+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:a},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:a},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},e&&e.noES6||(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(e,t,n){if(this.next="{"==e?this.nextState:"","{"==e&&n.length)n.unshift("start",t);else if("}"==e&&n.length&&(n.shift(),this.next=n.shift(),-1!=this.next.indexOf("string")||-1!=this.next.indexOf("jsx")))return"paren.quasi.end";return"{"==e?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:a},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]}),e&&e.noJSX||n.call(this)),this.embedRules(o,"doc-",[o.getEndRule("no_regex")]),this.normalizeRules()};r.inherits(l,a),t.JavaScriptHighlightRules=l}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var n=e("../range").Range,i=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var i=e.getLine(t),r=i.match(/^(\s*\})/);if(!r)return 0;var o=r[1].length,a=e.findMatchingBracket({row:t,column:o});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,o-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype),t.MatchingBraceOutdent=i}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){"use strict";var n,i=e("../../lib/oop"),r=e("../behaviour").Behaviour,o=e("../../token_iterator").TokenIterator,a=e("../../lib/lang"),s=["text","paren.rparen","punctuation.operator"],l=["text","paren.rparen","punctuation.operator","comment"],c={},u=function(e){var t=-1;return e.multiSelect&&(t=e.selection.index,c.rangeCount!=e.multiSelect.rangeCount&&(c={rangeCount:e.multiSelect.rangeCount})),c[t]?n=c[t]:void(n=c[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},d=function(e,t,n,i){var r=e.end.row-e.start.row;return{text:n+t+i,selection:[0,e.start.column+1,r,e.end.column+(r?0:1)]}},h=function(){this.add("braces","insertion",function(e,t,i,r,o){var s=i.getCursorPosition(),l=r.doc.getLine(s.row);if("{"==o){u(i);var c=i.getSelectionRange(),g=r.doc.getTextRange(c);if(""!==g&&"{"!==g&&i.getWrapBehavioursEnabled())return d(c,g,"{","}");if(h.isSaneInsertion(i,r))return/[\]\}\)]/.test(l[s.column])||i.inMultiSelectMode?(h.recordAutoInsert(i,r,"}"),{text:"{}",selection:[1,1]}):(h.recordMaybeInsert(i,r,"{"),{text:"{",selection:[1,1]})}else if("}"==o){u(i);var p=l.substring(s.column,s.column+1);if("}"==p){var m=r.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==m&&h.isAutoInsertedClosing(s,l,o))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==o||"\r\n"==o){u(i);var f="";h.isMaybeInsertedClosing(s,l)&&(f=a.stringRepeat("}",n.maybeInsertedBrackets),h.clearMaybeInsertedClosing());var p=l.substring(s.column,s.column+1);if("}"===p){var x=r.findMatchingBracket({row:s.row,column:s.column+1},"}");if(!x)return null;var b=this.$getIndent(r.getLine(x.row))}else{if(!f)return void h.clearMaybeInsertedClosing();var b=this.$getIndent(l)}var v=b+r.getTabString();return{text:"\n"+v+"\n"+b+f,selection:[1,v.length,1,v.length]}}h.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,i,r,o){var a=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==a){u(i);var s=r.doc.getLine(o.start.row),l=s.substring(o.end.column,o.end.column+1);if("}"==l)return o.end.column++,o;n.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,i,r){if("("==r){u(n);var o=n.getSelectionRange(),a=i.doc.getTextRange(o);if(""!==a&&n.getWrapBehavioursEnabled())return d(o,a,"(",")");if(h.isSaneInsertion(n,i))return h.recordAutoInsert(n,i,")"),{text:"()",selection:[1,1]}}else if(")"==r){u(n);var s=n.getCursorPosition(),l=i.doc.getLine(s.row),c=l.substring(s.column,s.column+1);if(")"==c){var g=i.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==g&&h.isAutoInsertedClosing(s,l,r))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,i,r){var o=i.doc.getTextRange(r);if(!r.isMultiLine()&&"("==o){u(n);var a=i.doc.getLine(r.start.row),s=a.substring(r.start.column+1,r.start.column+2);if(")"==s)return r.end.column++,r}}),this.add("brackets","insertion",function(e,t,n,i,r){if("["==r){u(n);var o=n.getSelectionRange(),a=i.doc.getTextRange(o);if(""!==a&&n.getWrapBehavioursEnabled())return d(o,a,"[","]");if(h.isSaneInsertion(n,i))return h.recordAutoInsert(n,i,"]"),{text:"[]",selection:[1,1]}}else if("]"==r){u(n);var s=n.getCursorPosition(),l=i.doc.getLine(s.row),c=l.substring(s.column,s.column+1);if("]"==c){var g=i.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==g&&h.isAutoInsertedClosing(s,l,r))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,i,r){var o=i.doc.getTextRange(r);if(!r.isMultiLine()&&"["==o){u(n);var a=i.doc.getLine(r.start.row),s=a.substring(r.start.column+1,r.start.column+2);if("]"==s)return r.end.column++,r}}),this.add("string_dquotes","insertion",function(e,t,n,i,r){if('"'==r||"'"==r){u(n);var o=r,a=n.getSelectionRange(),s=i.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return d(a,s,o,o);if(!s){var l=n.getCursorPosition(),c=i.doc.getLine(l.row),h=c.substring(l.column-1,l.column),g=c.substring(l.column,l.column+1),p=i.getTokenAt(l.row,l.column),m=i.getTokenAt(l.row,l.column+1);if("\\"==h&&p&&/escape/.test(p.type))return null;var f,x=p&&/string|escape/.test(p.type),b=!m||/string|escape/.test(m.type);if(g==o)f=x!==b;else{if(x&&!b)return null;if(x&&b)return null;var v=i.$mode.tokenRe;v.lastIndex=0;var k=v.test(h);v.lastIndex=0;var C=v.test(h);if(k||C)return null;if(g&&!/[\s;,.})\]\\]/.test(g))return null;f=!0}return{text:f?o+o:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,i,r){var o=i.doc.getTextRange(r);if(!r.isMultiLine()&&('"'==o||"'"==o)){u(n);var a=i.doc.getLine(r.start.row),s=a.substring(r.start.column+1,r.start.column+2);if(s==o)return r.end.column++,r}})};h.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),i=new o(t,n.row,n.column);if(!this.$matchTokenType(i.getCurrentToken()||"text",s)){var r=new o(t,n.row,n.column+1);if(!this.$matchTokenType(r.getCurrentToken()||"text",s))return!1}return i.stepForward(),i.getCurrentTokenRow()!==n.row||this.$matchTokenType(i.getCurrentToken()||"text",l)},h.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},h.recordAutoInsert=function(e,t,i){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,o,n.autoInsertedLineEnd[0])||(n.autoInsertedBrackets=0),n.autoInsertedRow=r.row,n.autoInsertedLineEnd=i+o.substr(r.column),n.autoInsertedBrackets++},h.recordMaybeInsert=function(e,t,i){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,o)||(n.maybeInsertedBrackets=0),n.maybeInsertedRow=r.row,n.maybeInsertedLineStart=o.substr(0,r.column)+i,n.maybeInsertedLineEnd=o.substr(r.column),n.maybeInsertedBrackets++},h.isAutoInsertedClosing=function(e,t,i){return n.autoInsertedBrackets>0&&e.row===n.autoInsertedRow&&i===n.autoInsertedLineEnd[0]&&t.substr(e.column)===n.autoInsertedLineEnd},h.isMaybeInsertedClosing=function(e,t){return n.maybeInsertedBrackets>0&&e.row===n.maybeInsertedRow&&t.substr(e.column)===n.maybeInsertedLineEnd&&t.substr(0,e.column)==n.maybeInsertedLineStart},h.popAutoInsertedClosing=function(){n.autoInsertedLineEnd=n.autoInsertedLineEnd.substr(1),n.autoInsertedBrackets--},h.clearMaybeInsertedClosing=function(){n&&(n.maybeInsertedBrackets=0,n.maybeInsertedRow=-1)},i.inherits(h,r),t.CstyleBehaviour=h}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var n=e("../../lib/oop"),i=e("../../range").Range,r=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(o,r),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var i=e.getLine(n);if(this.singleLineBlockCommentRe.test(i)&&!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return"";var r=this._getFoldWidgetBase(e,t,n);return!r&&this.startRegionRe.test(i)?"start":r},this.getFoldWidgetRange=function(e,t,n,i){var r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);var o=r.match(this.foldingStartMarker);if(o){var a=o.index;if(o[1])return this.openingBracketBlock(e,o[1],n,a);var s=e.getCommentFoldRange(n,a+o[0].length,1);return s&&!s.isMultiLine()&&(i?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t){var o=r.match(this.foldingStopMarker);if(o){var a=o.index+o[0].length;return o[1]?this.closingBracketBlock(e,o[1],n,a):e.getCommentFoldRange(n,a,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),o=t,a=n.length;t+=1;for(var s=t,l=e.getLength();++t<l;){n=e.getLine(t);var c=n.search(/\S/);if(-1!==c){if(r>c)break;var u=this.getFoldWidgetRange(e,"all",t);if(u){if(u.start.row<=o)break;if(u.isMultiLine())t=u.end.row;else if(r==c)break}s=t}}return new i(o,a,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,n){for(var r=t.search(/\s*$/),o=e.getLength(),a=n,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;++n<o;){t=e.getLine(n);var c=s.exec(t);if(c&&(c[1]?l--:l++,!l))break}var u=n;return u>a?new i(a,r,u,t.length):void 0}}.call(o.prototype)}),define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text").Mode,r=e("./javascript_highlight_rules").JavaScriptHighlightRules,o=e("./matching_brace_outdent").MatchingBraceOutdent,a=(e("../range").Range,e("../worker/worker_client").WorkerClient),s=e("./behaviour/cstyle").CstyleBehaviour,l=e("./folding/cstyle").FoldMode,c=function(){this.HighlightRules=r,this.$outdent=new o,this.$behaviour=new s,this.foldingRules=new l};n.inherits(c,i),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var i=this.$getIndent(t),r=this.getTokenizer().getLineTokens(t,e),o=r.tokens,a=r.state;if(o.length&&"comment"==o[o.length-1].type)return i;if("start"==e||"no_regex"==e){var s=t.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);s&&(i+=n)}else if("doc-start"==e){if("start"==a||"no_regex"==a)return"";var s=t.match(/^\s*(\/?)\*/);s&&(s[1]&&(i+=" "),i+="* ")}return i},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=new a(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return t.attachToDocument(e.getDocument()),t.on("annotate",function(t){e.setAnnotations(t.data)}),t.on("terminate",function(){e.clearAnnotations()}),t},this.$id="ace/mode/javascript"}.call(c.prototype),t.Mode=c}),define("ace/mode/gobstones_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./doc_comment_highlight_rules").DocCommentHighlightRules,r=e("./text_highlight_rules").TextHighlightRules,o=function(){var e="program|procedure|function|interactive|if|then|else|switch|repeat|while|foreach|in|not|div|mod|Skip|return",t="False|True",n="Poner|Sacar|Mover|IrAlBorde|VaciarTablero|nroBolitas|hayBolitas|puedeMover|siguiente|previo|opuesto|minBool|maxBool|minDir|maxDir|minColor|maxColor",r="Verde|Rojo|Azul|Negro|Norte|Sur|Este|Oeste",o=this.createKeywordMapper({keyword:e,"constant.language":t,"support.function":n,"support.type":r},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},{token:"comment",regex:"\\-\\-.*$"},{token:"comment",regex:"#.*$"},i.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/},{token:"constant.numeric",regex:/[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/},{token:"constant.language.boolean",regex:"(?:True|False)\\b"},{token:"keyword.operator",regex:":=|\\.\\.|,|;|\\|\\||\\/\\/|\\+|\\-|\\^|\\*|>|<|>=|=>|==|&&"},{token:o,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}]},this.embedRules(i,"doc-",[i.getEndRule("start")])};n.inherits(o,r),t.GobstonesHighlightRules=o}),define("ace/mode/gobstones",["require","exports","module","ace/lib/oop","ace/mode/javascript","ace/mode/gobstones_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./javascript").Mode,r=e("./gobstones_highlight_rules").GobstonesHighlightRules,o=function(){i.call(this),this.HighlightRules=r};n.inherits(o,i),function(){this.createWorker=function(){return null},this.$id="ace/mode/gobstones"}.call(o.prototype),t.Mode=o});
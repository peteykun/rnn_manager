define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=function(){var e="[_:a-zA-Z\xc0-\uffff][-_:.a-zA-Z0-9\xc0-\uffff]*";this.$rules={start:[{token:"string.cdata.xml",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:["punctuation.xml-decl.xml","keyword.xml-decl.xml"],regex:"(<\\?)(xml)(?=[\\s])",next:"xml_decl",caseInsensitive:!0},{token:["punctuation.instruction.xml","keyword.instruction.xml"],regex:"(<\\?)("+e+")",next:"processing_instruction"},{token:"comment.xml",regex:"<\\!--",next:"comment"},{token:["xml-pe.doctype.xml","xml-pe.doctype.xml"],regex:"(<\\!)(DOCTYPE)(?=[\\s])",next:"doctype",caseInsensitive:!0},{include:"tag"},{token:"text.end-tag-open.xml",regex:"</"},{token:"text.tag-open.xml",regex:"<"},{include:"reference"},{defaultToken:"text.xml"}],xml_decl:[{token:"entity.other.attribute-name.decl-attribute-name.xml",regex:"(?:"+e+":)?"+e},{token:"keyword.operator.decl-attribute-equals.xml",regex:"="},{include:"whitespace"},{include:"string"},{token:"punctuation.xml-decl.xml",regex:"\\?>",next:"start"}],processing_instruction:[{token:"punctuation.instruction.xml",regex:"\\?>",next:"start"},{defaultToken:"instruction.xml"}],doctype:[{include:"whitespace"},{include:"string"},{token:"xml-pe.doctype.xml",regex:">",next:"start"},{token:"xml-pe.xml",regex:"[-_a-zA-Z0-9:]+"},{token:"punctuation.int-subset",regex:"\\[",push:"int_subset"}],int_subset:[{token:"text.xml",regex:"\\s+"},{token:"punctuation.int-subset.xml",regex:"]",next:"pop"},{token:["punctuation.markup-decl.xml","keyword.markup-decl.xml"],regex:"(<\\!)("+e+")",push:[{token:"text",regex:"\\s+"},{token:"punctuation.markup-decl.xml",regex:">",next:"pop"},{include:"string"}]}],cdata:[{token:"string.cdata.xml",regex:"\\]\\]>",next:"start"},{token:"text.xml",regex:"\\s+"},{token:"text.xml",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment.xml",regex:"-->",next:"start"},{defaultToken:"comment.xml"}],reference:[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],attr_reference:[{token:"constant.language.escape.reference.attribute-value.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],tag:[{token:["meta.tag.punctuation.tag-open.xml","meta.tag.punctuation.end-tag-open.xml","meta.tag.tag-name.xml"],regex:"(?:(<)|(</))((?:"+e+":)?"+e+")",next:[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:"start"}]}],tag_whitespace:[{token:"text.tag-whitespace.xml",regex:"\\s+"}],whitespace:[{token:"text.whitespace.xml",regex:"\\s+"}],string:[{token:"string.xml",regex:"'",push:[{token:"string.xml",regex:"'",next:"pop"},{defaultToken:"string.xml"}]},{token:"string.xml",regex:'"',push:[{token:"string.xml",regex:'"',next:"pop"},{defaultToken:"string.xml"}]}],attributes:[{token:"entity.other.attribute-name.xml",regex:"(?:"+e+":)?"+e},{token:"keyword.operator.attribute-equals.xml",regex:"="},{include:"tag_whitespace"},{include:"attribute_value"}],attribute_value:[{token:"string.attribute-value.xml",regex:"'",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"attr_reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"attr_reference"},{defaultToken:"string.attribute-value.xml"}]}]},this.constructor===o&&this.normalizeRules()};(function(){this.embedTagRules=function(e,t,n){this.$rules.tag.unshift({token:["meta.tag.punctuation.tag-open.xml","meta.tag."+n+".tag-name.xml"],regex:"(<)("+n+"(?=\\s|>|$))",next:[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:t+"start"}]}),this.$rules[n+"-end"]=[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:"start",onMatch:function(e,t,n){return n.splice(0),this.token}}],this.embedRules(e,t,[{token:["meta.tag.punctuation.end-tag-open.xml","meta.tag."+n+".tag-name.xml"],regex:"(</)("+n+"(?=\\s|>|$))",next:n+"-end"},{token:"string.cdata.xml",regex:"<\\!\\[CDATA\\["},{token:"string.cdata.xml",regex:"\\]\\]>"}])}}).call(r.prototype),n.inherits(o,r),t.XmlHighlightRules=o}),define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){"use strict";function n(e,t){return e.type.lastIndexOf(t+".xml")>-1}var r=e("../../lib/oop"),o=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,a=(e("../../lib/lang"),function(){this.add("string_dquotes","insertion",function(e,t,r,o,a){if('"'==a||"'"==a){var s=a,l=o.doc.getTextRange(r.getSelectionRange());if(""!==l&&"'"!==l&&'"'!=l&&r.getWrapBehavioursEnabled())return{text:s+l+s,selection:!1};var c=r.getCursorPosition(),u=o.doc.getLine(c.row),d=u.substring(c.column,c.column+1),g=new i(o,c.row,c.column),m=g.getCurrentToken();if(d==s&&(n(m,"attribute-value")||n(m,"string")))return{text:"",selection:[1,1]};if(m||(m=g.stepBackward()),!m)return;for(;n(m,"tag-whitespace")||n(m,"whitespace");)m=g.stepBackward();var p=!d||d.match(/\s/);if(n(m,"attribute-equals")&&(p||">"==d)||n(m,"decl-attribute-equals")&&(p||"?"==d))return{text:s+s,selection:[1,1]}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(s==i)return o.end.column++,o}}),this.add("autoclosing","insertion",function(e,t,r,o,a){if(">"==a){var s=r.getCursorPosition(),l=new i(o,s.row,s.column),c=l.getCurrentToken()||l.stepBackward();if(!c||!(n(c,"tag-name")||n(c,"tag-whitespace")||n(c,"attribute-name")||n(c,"attribute-equals")||n(c,"attribute-value")))return;if(n(c,"reference.attribute-value"))return;if(n(c,"attribute-value")){var u=c.value.charAt(0);if('"'==u||"'"==u){var d=c.value.charAt(c.value.length-1),g=l.getCurrentTokenColumn()+c.value.length;if(g>s.column||g==s.column&&u!=d)return}}for(;!n(c,"tag-name");)c=l.stepBackward();var m=l.getCurrentTokenRow(),p=l.getCurrentTokenColumn();if(n(l.stepBackward(),"end-tag-open"))return;var h=c.value;if(m==s.row&&(h=h.substring(0,s.column-p)),this.voidElements.hasOwnProperty(h.toLowerCase()))return;return{text:"></"+h+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(e,t,n,r,o){if("\n"==o){var a=n.getCursorPosition(),s=r.getLine(a.row),l=new i(r,a.row,a.column),c=l.getCurrentToken();if(c&&-1!==c.type.indexOf("tag-close")){if("/>"==c.value)return;for(;c&&-1===c.type.indexOf("tag-name");)c=l.stepBackward();if(!c)return;var u=c.value,d=l.getCurrentTokenRow();if(c=l.stepBackward(),!c||-1!==c.type.indexOf("end-tag"))return;if(this.voidElements&&!this.voidElements[u]){var g=r.getTokenAt(a.row,a.column+1),s=r.getLine(d),m=this.$getIndent(s),p=m+r.getTabString();return g&&"</"===g.value?{text:"\n"+p+"\n"+m,selection:[1,p.length,1,p.length]}:{text:"\n"+p}}}}})});r.inherits(a,o),t.XmlBehaviour=a}),define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(e,t){"use strict";function n(e,t){return e.type.lastIndexOf(t+".xml")>-1}var r=e("../../lib/oop"),o=(e("../../lib/lang"),e("../../range").Range),i=e("./fold_mode").FoldMode,a=e("../../token_iterator").TokenIterator,s=t.FoldMode=function(e,t){i.call(this),this.voidElements=e||{},this.optionalEndTags=r.mixin({},this.voidElements),t&&r.mixin(this.optionalEndTags,t)};r.inherits(s,i);var l=function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}};(function(){this.getFoldWidget=function(e,t,n){var r=this._getFirstTagInLine(e,n);return r?r.closing||!r.tagName&&r.selfClosing?"markbeginend"==t?"end":"":!r.tagName||r.selfClosing||this.voidElements.hasOwnProperty(r.tagName.toLowerCase())?"":this._findEndTagInLine(e,n,r.tagName,r.end.column)?"":"start":""},this._getFirstTagInLine=function(e,t){for(var r=e.getTokens(t),o=new l,i=0;i<r.length;i++){var a=r[i];if(n(a,"tag-open")){if(o.end.column=o.start.column+a.value.length,o.closing=n(a,"end-tag-open"),a=r[++i],!a)return null;for(o.tagName=a.value,o.end.column+=a.value.length,i++;i<r.length;i++)if(a=r[i],o.end.column+=a.value.length,n(a,"tag-close")){o.selfClosing="/>"==a.value;break}return o}if(n(a,"tag-close"))return o.selfClosing="/>"==a.value,o;o.start.column+=a.value.length}return null},this._findEndTagInLine=function(e,t,r,o){for(var i=e.getTokens(t),a=0,s=0;s<i.length;s++){var l=i[s];if(a+=l.value.length,!(o>a)&&n(l,"end-tag-open")&&(l=i[s+1],l&&l.value==r))return!0}return!1},this._readTagForward=function(e){var t=e.getCurrentToken();if(!t)return null;var r=new l;do if(n(t,"tag-open"))r.closing=n(t,"end-tag-open"),r.start.row=e.getCurrentTokenRow(),r.start.column=e.getCurrentTokenColumn();else if(n(t,"tag-name"))r.tagName=t.value;else if(n(t,"tag-close"))return r.selfClosing="/>"==t.value,r.end.row=e.getCurrentTokenRow(),r.end.column=e.getCurrentTokenColumn()+t.value.length,e.stepForward(),r;while(t=e.stepForward());return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(!t)return null;var r=new l;do{if(n(t,"tag-open"))return r.closing=n(t,"end-tag-open"),r.start.row=e.getCurrentTokenRow(),r.start.column=e.getCurrentTokenColumn(),e.stepBackward(),r;n(t,"tag-name")?r.tagName=t.value:n(t,"tag-close")&&(r.selfClosing="/>"==t.value,r.end.row=e.getCurrentTokenRow(),r.end.column=e.getCurrentTokenColumn()+t.value.length)}while(t=e.stepBackward());return null},this._pop=function(e,t){for(;e.length;){var n=e[e.length-1];if(t&&n.tagName!=t.tagName){if(this.optionalEndTags.hasOwnProperty(n.tagName)){e.pop();continue}return null}return e.pop()}},this.getFoldWidgetRange=function(e,t,n){var r=this._getFirstTagInLine(e,n);if(!r)return null;var i,s=r.closing||r.selfClosing,l=[];if(s)for(var c=new a(e,n,r.end.column),u={row:n,column:r.start.column};i=this._readTagBackward(c);){if(i.selfClosing){if(l.length)continue;return i.start.column+=i.tagName.length+2,i.end.column-=2,o.fromPoints(i.start,i.end)}if(i.closing)l.push(i);else if(this._pop(l,i),0==l.length)return i.start.column+=i.tagName.length+2,i.start.row==i.end.row&&i.start.column<i.end.column&&(i.start.column=i.end.column),o.fromPoints(i.start,u)}else{var c=new a(e,n,r.start.column),d={row:n,column:r.start.column+r.tagName.length+2};for(r.start.row==r.end.row&&(d.column=r.end.column);i=this._readTagForward(c);){if(i.selfClosing){if(l.length)continue;return i.start.column+=i.tagName.length+2,i.end.column-=2,o.fromPoints(i.start,i.end)}if(i.closing){if(this._pop(l,i),0==l.length)return o.fromPoints(d,i.start)}else l.push(i)}}}}).call(s.prototype)}),define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml","ace/worker/worker_client"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("../lib/lang"),o=e("./text").Mode,i=e("./xml_highlight_rules").XmlHighlightRules,a=e("./behaviour/xml").XmlBehaviour,s=e("./folding/xml").FoldMode,l=e("../worker/worker_client").WorkerClient,c=function(){this.HighlightRules=i,this.$behaviour=new a,this.foldingRules=new s};n.inherits(c,o),function(){this.voidElements=r.arrayToMap([]),this.blockComment={start:"<!--",end:"-->"},this.createWorker=function(e){var t=new l(["ace"],"ace/mode/xml_worker","Worker");return t.attachToDocument(e.getDocument()),t.on("error",function(t){e.setAnnotations(t.data)}),t.on("terminate",function(){e.clearAnnotations()}),t},this.$id="ace/mode/xml"}.call(c.prototype),t.Mode=c});
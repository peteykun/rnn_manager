define("ace/snippets",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/anchor","ace/keyboard/hash_handler","ace/tokenizer","ace/lib/dom","ace/editor"],function(e,t){"use strict";var i=e("./lib/oop"),n=e("./lib/event_emitter").EventEmitter,s=e("./lib/lang"),o=e("./range").Range,r=e("./anchor").Anchor,a=e("./keyboard/hash_handler").HashHandler,l=e("./tokenizer").Tokenizer,c=o.comparePoints,h=function(){this.snippetMap={},this.snippetNameMap={}};(function(){i.implement(this,n),this.getTokenizer=function(){function e(e,t,i){return e=e.substr(1),/^\d+$/.test(e)&&!i.inFormatString?[{tabstopId:parseInt(e,10)}]:[{text:e}]}function t(e){return"(?:[^\\\\"+e+"]|\\\\.)"}return h.$tokenizer=new l({start:[{regex:/:/,onMatch:function(e,t,i){return i.length&&i[0].expectIf?(i[0].expectIf=!1,i[0].elseBranch=i[0],[i[0]]):":"}},{regex:/\\./,onMatch:function(e,t,i){var n=e[1];return"}"==n&&i.length?e=n:-1!="`$\\".indexOf(n)?e=n:i.inFormatString&&("n"==n?e="\n":"t"==n?e="\n":-1!="ulULE".indexOf(n)&&(e={changeCase:n,local:n>"a"})),[e]}},{regex:/}/,onMatch:function(e,t,i){return[i.length?i.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:e},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(t,i,n){var s=e(t.substr(1),i,n);return n.unshift(s[0]),s},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+t("\\|")+"*\\|",onMatch:function(e,t,i){i[0].choices=e.slice(1,-1).split(",")},next:"start"},{regex:"/("+t("/")+"+)/(?:("+t("/")+"*)/)(\\w*):?",onMatch:function(e,t,i){var n=i[0];return n.fmtString=e,e=this.splitRegex.exec(e),n.guard=e[1],n.fmt=e[2],n.flag=e[3],""},next:"start"},{regex:"`"+t("`")+"*`",onMatch:function(e,t,i){return i[0].code=e.splice(1,-1),""},next:"start"},{regex:"\\?",onMatch:function(e,t,i){i[0]&&(i[0].expectIf=!0)},next:"start"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:"/("+t("/")+"+)/",token:"regex"},{regex:"",onMatch:function(e,t,i){i.inFormatString=!0},next:"start"}]}),h.prototype.getTokenizer=function(){return h.$tokenizer},h.$tokenizer},this.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map(function(e){return e.value||e})},this.$getDefaultValue=function(e,t){if(/^[A-Z]\d+$/.test(t)){var i=t.substr(1);return(this.variables[t[0]+"__"]||{})[i]}if(/^\d+$/.test(t))return(this.variables.__||{})[t];if(t=t.replace(/^TM_/,""),e){var n=e.session;switch(t){case"CURRENT_WORD":var s=n.getWordRange();case"SELECTION":case"SELECTED_TEXT":return n.getTextRange(s);case"CURRENT_LINE":return n.getLine(e.getCursorPosition().row);case"PREV_LINE":return n.getLine(e.getCursorPosition().row-1);case"LINE_INDEX":return e.getCursorPosition().column;case"LINE_NUMBER":return e.getCursorPosition().row+1;case"SOFT_TABS":return n.getUseSoftTabs()?"YES":"NO";case"TAB_SIZE":return n.getTabSize();case"FILENAME":case"FILEPATH":return"";case"FULLNAME":return"Ace"}}},this.variables={},this.getVariableValue=function(e,t){return this.variables.hasOwnProperty(t)?this.variables[t](e,t)||"":this.$getDefaultValue(e,t)||""},this.tmStrFormat=function(e,t,i){var n=t.flag||"",s=t.guard;s=new RegExp(s,n.replace(/[^gi]/,""));var o=this.tokenizeTmSnippet(t.fmt,"formatString"),r=this,a=e.replace(s,function(){r.variables.__=arguments;for(var e=r.resolveVariables(o,i),t="E",n=0;n<e.length;n++){var s=e[n];if("object"==typeof s)if(e[n]="",s.changeCase&&s.local){var a=e[n+1];a&&"string"==typeof a&&("u"==s.changeCase?e[n]=a[0].toUpperCase():e[n]=a[0].toLowerCase(),e[n+1]=a.substr(1))}else s.changeCase&&(t=s.changeCase);else"U"==t?e[n]=s.toUpperCase():"L"==t&&(e[n]=s.toLowerCase())}return e.join("")});return this.variables.__=null,a},this.resolveVariables=function(e,t){function i(t){var i=e.indexOf(t,s+1);-1!=i&&(s=i)}for(var n=[],s=0;s<e.length;s++){var o=e[s];if("string"==typeof o)n.push(o);else{if("object"!=typeof o)continue;if(o.skip)i(o);else{if(o.processed<s)continue;if(o.text){var r=this.getVariableValue(t,o.text);r&&o.fmtString&&(r=this.tmStrFormat(r,o)),o.processed=s,null==o.expectIf?r&&(n.push(r),i(o)):r?o.skip=o.elseBranch:i(o)}else null!=o.tabstopId?n.push(o):null!=o.changeCase&&n.push(o)}}}return n},this.insertSnippetForSelection=function(e,t){function i(e){for(var t=[],i=0;i<e.length;i++){var n=e[i];if("object"==typeof n){if(c[n.tabstopId])continue;var s=e.lastIndexOf(n,i-1);n=t[s]||{tabstopId:n.tabstopId}}t[i]=n}return t}var n=e.getCursorPosition(),s=e.session.getLine(n.row),o=e.session.getTabString(),r=s.match(/^\s*/)[0];n.column<r.length&&(r=r.slice(0,n.column));var a=this.tokenizeTmSnippet(t);a=this.resolveVariables(a,e),a=a.map(function(e){return"\n"==e?e+r:"string"==typeof e?e.replace(/\t/g,o):e});var l=[];a.forEach(function(e,t){if("object"==typeof e){var i=e.tabstopId,n=l[i];if(n||(n=l[i]=[],n.index=i,n.value=""),-1===n.indexOf(e)){n.push(e);var s=a.indexOf(e,t+1);if(-1!==s){var o=a.slice(t+1,s),r=o.some(function(e){return"object"==typeof e});r&&!n.value?n.value=o:!o.length||n.value&&"string"==typeof n.value||(n.value=o.join(""))}}}}),l.forEach(function(e){e.length=0});for(var c={},h=0;h<a.length;h++){var d=a[h];if("object"==typeof d){var g=d.tabstopId,f=a.indexOf(d,h+1);if(c[g])c[g]===d&&(c[g]=null);else{var p=l[g],m="string"==typeof p.value?[p.value]:i(p.value);m.unshift(h+1,Math.max(0,f-h)),m.push(d),c[g]=d,a.splice.apply(a,m),-1===p.indexOf(d)&&p.push(d)}}}var v=0,A=0,C="";a.forEach(function(e){"string"==typeof e?("\n"===e[0]?(A=e.length-1,v++):A+=e.length,C+=e):e.start?e.end={row:v,column:A}:e.start={row:v,column:A}});var w=e.getSelectionRange(),F=e.session.replace(w,C),E=new u(e),b=e.inVirtualSelectionMode&&e.selection.index;E.addTabstops(l,w.start,F,b)},this.insertSnippet=function(e,t){var i=this;return e.inVirtualSelectionMode?i.insertSnippetForSelection(e,t):(e.forEachSelection(function(){i.insertSnippetForSelection(e,t)},null,{keepOrder:!0}),void(e.tabstopManager&&e.tabstopManager.tabNext()))},this.$getScope=function(e){var t=e.session.$mode.$id||"";if(t=t.split("/").pop(),"html"===t||"php"===t){"php"!==t||e.session.$mode.inlinePhp||(t="html");var i=e.getCursorPosition(),n=e.session.getState(i.row);"object"==typeof n&&(n=n[0]),n.substring&&("js-"==n.substring(0,3)?t="javascript":"css-"==n.substring(0,4)?t="css":"php-"==n.substring(0,4)&&(t="php"))}return t},this.getActiveScopes=function(e){var t=this.$getScope(e),i=[t],n=this.snippetMap;return n[t]&&n[t].includeScopes&&i.push.apply(i,n[t].includeScopes),i.push("_"),i},this.expandWithTab=function(e,t){var i=this,n=e.forEachSelection(function(){return i.expandSnippetForSelection(e,t)},null,{keepOrder:!0});return n&&e.tabstopManager&&e.tabstopManager.tabNext(),n},this.expandSnippetForSelection=function(e,t){var i,n=e.getCursorPosition(),s=e.session.getLine(n.row),o=s.substring(0,n.column),r=s.substr(n.column),a=this.snippetMap;return this.getActiveScopes(e).some(function(e){var t=a[e];return t&&(i=this.findMatchingSnippet(t,o,r)),!!i},this),i?t&&t.dryRun?!0:(e.session.doc.removeInLine(n.row,n.column-i.replaceBefore.length,n.column+i.replaceAfter.length),this.variables.M__=i.matchBefore,this.variables.T__=i.matchAfter,this.insertSnippetForSelection(e,i.content),this.variables.M__=this.variables.T__=null,!0):!1},this.findMatchingSnippet=function(e,t,i){for(var n=e.length;n--;){var s=e[n];if((!s.startRe||s.startRe.test(t))&&(!s.endRe||s.endRe.test(i))&&(s.startRe||s.endRe))return s.matchBefore=s.startRe?s.startRe.exec(t):[""],s.matchAfter=s.endRe?s.endRe.exec(i):[""],s.replaceBefore=s.triggerRe?s.triggerRe.exec(t)[0]:"",s.replaceAfter=s.endTriggerRe?s.endTriggerRe.exec(i)[0]:"",s}},this.snippetMap={},this.snippetNameMap={},this.register=function(e,t){function i(e){return e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e)&&(e="(?:"+e+")"),e||""}function n(e,t,n){return e=i(e),t=i(t),n?(e=t+e,e&&"$"!=e[e.length-1]&&(e+="$")):(e+=t,e&&"^"!=e[0]&&(e="^"+e)),new RegExp(e)}function o(e){e.scope||(e.scope=t||"_"),t=e.scope,r[t]||(r[t]=[],a[t]={});var i=a[t];if(e.name){var o=i[e.name];o&&l.unregister(o),i[e.name]=e}r[t].push(e),e.tabTrigger&&!e.trigger&&(!e.guard&&/^\w/.test(e.tabTrigger)&&(e.guard="\\b"),e.trigger=s.escapeRegExp(e.tabTrigger)),(e.trigger||e.guard||e.endTrigger||e.endGuard)&&(e.startRe=n(e.trigger,e.guard,!0),e.triggerRe=new RegExp(e.trigger,"",!0),e.endRe=n(e.endTrigger,e.endGuard,!0),e.endTriggerRe=new RegExp(e.endTrigger,"",!0))}var r=this.snippetMap,a=this.snippetNameMap,l=this;e||(e=[]),e&&e.content?o(e):Array.isArray(e)&&e.forEach(o),this._signal("registerSnippets",{scope:t})},this.unregister=function(e,t){function i(e){var i=s[e.scope||t];if(i&&i[e.name]){delete i[e.name];var o=n[e.scope||t],r=o&&o.indexOf(e);r>=0&&o.splice(r,1)}}var n=this.snippetMap,s=this.snippetNameMap;e.content?i(e):Array.isArray(e)&&e.forEach(i)},this.parseSnippetFile=function(e){e=e.replace(/\r/g,"");for(var t,i=[],n={},s=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;t=s.exec(e);){if(t[1])try{n=JSON.parse(t[1]),i.push(n)}catch(o){}if(t[4])n.content=t[4].replace(/^\t/gm,""),i.push(n),n={};else{var r=t[2],a=t[3];if("regex"==r){var l=/\/((?:[^\/\\]|\\.)*)|$/g;n.guard=l.exec(a)[1],n.trigger=l.exec(a)[1],n.endTrigger=l.exec(a)[1],n.endGuard=l.exec(a)[1]}else"snippet"==r?(n.tabTrigger=a.match(/^\S*/)[0],n.name||(n.name=a)):n[r]=a}}return i},this.getSnippetByName=function(e,t){var i,n=this.snippetNameMap;return this.getActiveScopes(t).some(function(t){var s=n[t];return s&&(i=s[e]),!!i},this),i}}).call(h.prototype);var u=function(e){return e.tabstopManager?e.tabstopManager:(e.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=s.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),void this.attach(e))};(function(){this.attach=function(e){this.index=0,this.ranges=[],this.tabstops=[],this.$openTabstops=null,this.selectedTabstop=null,this.editor=e,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges=null,this.tabstops=null,this.selectedTabstop=null,this.editor.removeListener("change",this.$onChange),this.editor.removeListener("changeSelection",this.$onChangeSelection),this.editor.removeListener("changeSession",this.$onChangeSession),this.editor.commands.removeListener("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.editor=null},this.onChange=function(e){var t="r"==e.action[0],i=e.start,n=e.end,s=i.row,o=n.row,r=o-s,a=n.column-i.column;if(t&&(r=-r,a=-a),!this.$inChange&&t){var l=this.selectedTabstop,h=l&&!l.some(function(e){return c(e.start,i)<=0&&c(e.end,n)>=0});if(h)return this.detach()}for(var u=this.ranges,d=0;d<u.length;d++){var g=u[d];g.end.row<i.row||(t&&c(i,g.start)<0&&c(n,g.end)>0?(this.removeRange(g),d--):(g.start.row==s&&g.start.column>i.column&&(g.start.column+=a),g.end.row==s&&g.end.column>=i.column&&(g.end.column+=a),g.start.row>=s&&(g.start.row+=r),g.end.row>=s&&(g.end.row+=r),c(g.start,g.end)>0&&this.removeRange(g)))}u.length||this.detach()},this.updateLinkedFields=function(){var e=this.selectedTabstop;if(e&&e.hasLinkedRanges){this.$inChange=!0;for(var i=this.editor.session,n=i.getTextRange(e.firstNonLinked),s=e.length;s--;){var o=e[s];if(o.linked){var r=t.snippetManager.tmStrFormat(n,o.original);i.replace(o,r)}}this.$inChange=!1}},this.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},this.onChangeSelection=function(){if(this.editor){for(var e=this.editor.selection.lead,t=this.editor.selection.anchor,i=this.editor.selection.isEmpty(),n=this.ranges.length;n--;)if(!this.ranges[n].linked){var s=this.ranges[n].contains(e.row,e.column),o=i||this.ranges[n].contains(t.row,t.column);if(s&&o)return}this.detach()}},this.onChangeSession=function(){this.detach()},this.tabNext=function(e){var t=this.tabstops.length,i=this.index+(e||1);i=Math.min(Math.max(i,1),t),i==t&&(i=0),this.selectTabstop(i),0===i&&this.detach()},this.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t&&this.addTabstopMarkers(t),this.index=e,t=this.tabstops[this.index],t&&t.length){if(this.selectedTabstop=t,this.editor.inVirtualSelectionMode)this.editor.selection.setRange(t.firstNonLinked);else{var i=this.editor.multiSelect;i.toSingleRange(t.firstNonLinked.clone());for(var n=t.length;n--;)t.hasLinkedRanges&&t[n].linked||i.addRange(t[n].clone(),!0);i.ranges[0]&&i.addRange(i.ranges[0].clone())}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)}},this.addTabstops=function(e,t,i){if(this.$openTabstops||(this.$openTabstops=[]),!e[0]){var n=o.fromPoints(i,i);f(n.start,t),f(n.end,t),e[0]=[n],e[0].index=0}var s=this.index,r=[s+1,0],a=this.ranges;e.forEach(function(e,i){for(var n=this.$openTabstops[i]||e,s=e.length;s--;){var l=e[s],c=o.fromPoints(l.start,l.end||l.start);g(c.start,t),g(c.end,t),c.original=l,c.tabstop=n,a.push(c),n!=e?n.unshift(c):n[s]=c,l.fmtString?(c.linked=!0,n.hasLinkedRanges=!0):n.firstNonLinked||(n.firstNonLinked=c)}n.firstNonLinked||(n.hasLinkedRanges=!1),n===e&&(r.push(n),this.$openTabstops[i]=n),this.addTabstopMarkers(n)},this),r.length>2&&(this.tabstops.length&&r.push(r.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,r))},this.addTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){e.markerId||(e.markerId=t.addMarker(e,"ace_snippet-marker","text"))})},this.removeTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){t.removeMarker(e.markerId),e.markerId=null})},this.removeRange=function(e){var t=e.tabstop.indexOf(e);e.tabstop.splice(t,1),t=this.ranges.indexOf(e),this.ranges.splice(t,1),this.editor.session.removeMarker(e.markerId),e.tabstop.length||(t=this.tabstops.indexOf(e.tabstop),-1!=t&&this.tabstops.splice(t,1),this.tabstops.length||this.detach())},this.keyboardHandler=new a,this.keyboardHandler.bindKeys({Tab:function(e){t.snippetManager&&t.snippetManager.expandWithTab(e)||e.tabstopManager.tabNext(1)},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1)},Esc:function(e){e.tabstopManager.detach()},Return:function(){return!1}})}).call(u.prototype);var d={};d.onChange=r.prototype.onChange,d.setPosition=function(e,t){this.pos.row=e,this.pos.column=t},d.update=function(e,t,i){this.$insertRight=i,this.pos=e,this.onChange(t)};var g=function(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row},f=function(e,t){e.row==t.row&&(e.column-=t.column),e.row-=t.row};e("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}"),t.snippetManager=new h;var p=e("./editor").Editor;(function(){this.insertSnippet=function(e,i){return t.snippetManager.insertSnippet(this,e,i)},this.expandSnippet=function(e){return t.snippetManager.expandWithTab(this,e)}}).call(p.prototype)}),define("ace/autocomplete/popup",["require","exports","module","ace/virtual_renderer","ace/editor","ace/range","ace/lib/event","ace/lib/lang","ace/lib/dom"],function(e,t){"use strict";var i=e("../virtual_renderer").VirtualRenderer,n=e("../editor").Editor,s=e("../range").Range,o=e("../lib/event"),r=e("../lib/lang"),a=e("../lib/dom"),l=function(e){var t=new i(e);t.$maxLines=4;var s=new n(t);return s.setHighlightActiveLine(!1),s.setShowPrintMargin(!1),s.renderer.setShowGutter(!1),s.renderer.setHighlightGutterLine(!1),s.$mouseHandler.$focusWaitTimout=0,s.$highlightTagPending=!0,s},c=function(e){var t=a.createElement("div"),i=new l(t);e&&e.appendChild(t),t.style.display="none",i.renderer.content.style.cursor="default",i.renderer.setStyle("ace_autocomplete"),i.setOption("displayIndentGuides",!1),i.setOption("dragDelay",150);var n=function(){};i.focus=n,i.$isFocused=!0,i.renderer.$cursorLayer.restartTimer=n,i.renderer.$cursorLayer.element.style.opacity=0,i.renderer.$maxLines=8,i.renderer.$keepTextAreaAtCursor=!1,i.setHighlightActiveLine(!1),i.session.highlight(""),i.session.$searchHighlight.clazz="ace_highlight-marker",i.on("mousedown",function(e){var t=e.getDocumentPosition();i.selection.moveToPosition(t),u.start.row=u.end.row=t.row,e.stop()});var c,h=new s(-1,0,-1,1/0),u=new s(-1,0,-1,1/0);u.id=i.session.addMarker(u,"ace_active-line","fullLine"),i.setSelectOnHover=function(e){e?h.id&&(i.session.removeMarker(h.id),h.id=null):h.id=i.session.addMarker(h,"ace_line-hover","fullLine")},i.setSelectOnHover(!1),i.on("mousemove",function(e){if(!c)return void(c=e);if(c.x!=e.x||c.y!=e.y){c=e,c.scrollTop=i.renderer.scrollTop;var t=c.getDocumentPosition().row;h.start.row!=t&&(h.id||i.setRow(t),g(t))}}),i.renderer.on("beforeRender",function(){if(c&&-1!=h.start.row){c.$pos=null;var e=c.getDocumentPosition().row;h.id||i.setRow(e),g(e,!0)}}),i.renderer.on("afterRender",function(){var e=i.getRow(),t=i.renderer.$textLayer,n=t.element.childNodes[e-t.config.firstRow];n!=t.selectedNode&&(t.selectedNode&&a.removeCssClass(t.selectedNode,"ace_selected"),t.selectedNode=n,n&&a.addCssClass(n,"ace_selected"))});var d=function(){g(-1)},g=function(e,t){e!==h.start.row&&(h.start.row=h.end.row=e,t||i.session._emit("changeBackMarker"),i._emit("changeHoverMarker"))};i.getHoveredRow=function(){return h.start.row},o.addListener(i.container,"mouseout",d),i.on("hide",d),i.on("changeSelection",d),i.session.doc.getLength=function(){return i.data.length},i.session.doc.getLine=function(e){var t=i.data[e];return"string"==typeof t?t:t&&t.value||""};var f=i.session.bgTokenizer;return f.$tokenizeRow=function(e){var t=i.data[e],n=[];if(!t)return n;"string"==typeof t&&(t={value:t}),t.caption||(t.caption=t.value||t.name);for(var s,o,r=-1,a=0;a<t.caption.length;a++)o=t.caption[a],s=t.matchMask&1<<a?1:0,r!==s?(n.push({type:t.className||""+(s?"completion-highlight":""),value:o}),r=s):n[n.length-1].value+=o;if(t.meta){var l=i.renderer.$size.scrollerWidth/i.renderer.layerConfig.characterWidth,c=t.meta;c.length+t.caption.length>l-2&&(c=c.substr(0,l-t.caption.length-3)+"\u2026"),n.push({type:"rightAlignedText",value:c})}return n},f.$updateOnChange=n,f.start=n,i.session.$computeWidth=function(){return this.screenWidth=0},i.$blockScrolling=1/0,i.isOpen=!1,i.isTopdown=!1,i.data=[],i.setData=function(e){i.setValue(r.stringRepeat("\n",e.length),-1),i.data=e||[],i.setRow(0)},i.getData=function(e){return i.data[e]},i.getRow=function(){return u.start.row},i.setRow=function(e){e=Math.max(0,Math.min(this.data.length,e)),u.start.row!=e&&(i.selection.clearSelection(),u.start.row=u.end.row=e||0,i.session._emit("changeBackMarker"),i.moveCursorTo(e||0,0),i.isOpen&&i._signal("select"))},i.on("changeSelection",function(){i.isOpen&&i.setRow(i.selection.lead.row),i.renderer.scrollCursorIntoView()}),i.hide=function(){this.container.style.display="none",this._signal("hide"),i.isOpen=!1},i.show=function(e,t,n){var s=this.container,o=window.innerHeight,r=window.innerWidth,a=this.renderer,l=a.$maxLines*t*1.4,h=e.top+this.$borderSize;h+l>o-t&&!n?(s.style.top="",s.style.bottom=o-h+"px",i.isTopdown=!1):(h+=t,s.style.top=h+"px",s.style.bottom="",i.isTopdown=!0),s.style.display="",this.renderer.$textLayer.checkForSizeChanges();var u=e.left;u+s.offsetWidth>r&&(u=r-s.offsetWidth),s.style.left=u+"px",this._signal("show"),c=null,i.isOpen=!0},i.getTextLeftOffset=function(){return this.$borderSize+this.renderer.$padding+this.$imageSize},i.$imageSize=0,i.$borderSize=1,i};a.importCssString(".ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {    background-color: #CAD6FA;    z-index: 1;}.ace_editor.ace_autocomplete .ace_line-hover {    border: 1px solid #abbffe;    margin-top: -1px;    background: rgba(233,233,253,0.4);}.ace_editor.ace_autocomplete .ace_line-hover {    position: absolute;    z-index: 2;}.ace_editor.ace_autocomplete .ace_scroller {   background: none;   border: none;   box-shadow: none;}.ace_rightAlignedText {    color: gray;    display: inline-block;    position: absolute;    right: 4px;    text-align: right;    z-index: -1;}.ace_editor.ace_autocomplete .ace_completion-highlight{    color: #000;    text-shadow: 0 0 0.01em;}.ace_editor.ace_autocomplete {    width: 280px;    z-index: 200000;    background: #fbfbfb;    color: #444;    border: 1px lightgray solid;    position: fixed;    box-shadow: 2px 3px 5px rgba(0,0,0,.2);    line-height: 1.4;}"),t.AcePopup=c}),define("ace/autocomplete/util",["require","exports","module"],function(e,t){"use strict";t.parForEach=function(e,t,i){var n=0,s=e.length;0===s&&i();for(var o=0;s>o;o++)t(e[o],function(e,t){n++,n===s&&i(e,t)})};var i=/[a-zA-Z_0-9\$\-\u00A2-\uFFFF]/;t.retrievePrecedingIdentifier=function(e,t,n){n=n||i;for(var s=[],o=t-1;o>=0&&n.test(e[o]);o--)s.push(e[o]);return s.reverse().join("")},t.retrieveFollowingIdentifier=function(e,t,n){n=n||i;for(var s=[],o=t;o<e.length&&n.test(e[o]);o++)s.push(e[o]);return s},t.getCompletionPrefix=function(e){var t,i=e.getCursorPosition(),n=e.session.getLine(i.row);return e.completers.forEach(function(e){e.identifierRegexps&&e.identifierRegexps.forEach(function(e){!t&&e&&(t=this.retrievePrecedingIdentifier(n,i.column,e))}.bind(this))}.bind(this)),t||this.retrievePrecedingIdentifier(n,i.column)}}),define("ace/autocomplete",["require","exports","module","ace/keyboard/hash_handler","ace/autocomplete/popup","ace/autocomplete/util","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/snippets"],function(e,t){"use strict";var i=e("./keyboard/hash_handler").HashHandler,n=e("./autocomplete/popup").AcePopup,s=e("./autocomplete/util"),o=(e("./lib/event"),e("./lib/lang")),r=e("./lib/dom"),a=e("./snippets").snippetManager,l=function(){this.autoInsert=!1,this.autoSelect=!0,this.exactMatch=!1,this.gatherCompletionsId=0,this.keyboardHandler=new i,this.keyboardHandler.bindKeys(this.commands),this.blurListener=this.blurListener.bind(this),this.changeListener=this.changeListener.bind(this),this.mousedownListener=this.mousedownListener.bind(this),this.mousewheelListener=this.mousewheelListener.bind(this),this.changeTimer=o.delayedCall(function(){this.updateCompletions(!0)}.bind(this)),this.tooltipTimer=o.delayedCall(this.updateDocTooltip.bind(this),50)};(function(){this.$init=function(){return this.popup=new n(document.body||document.documentElement),this.popup.on("click",function(e){this.insertMatch(),e.stop()}.bind(this)),this.popup.focus=this.editor.focus.bind(this.editor),this.popup.on("show",this.tooltipTimer.bind(null,null)),this.popup.on("select",this.tooltipTimer.bind(null,null)),this.popup.on("changeHoverMarker",this.tooltipTimer.bind(null,null)),this.popup},this.getPopup=function(){return this.popup||this.$init()},this.openPopup=function(e,t,i){this.popup||this.$init(),this.popup.setData(this.completions.filtered),e.keyBinding.addKeyboardHandler(this.keyboardHandler);var n=e.renderer;if(this.popup.setRow(this.autoSelect?0:-1),i)i&&!t&&this.detach();else{this.popup.setTheme(e.getTheme()),this.popup.setFontSize(e.getFontSize());var s=n.layerConfig.lineHeight,o=n.$cursorLayer.getPixelPosition(this.base,!0);o.left-=this.popup.getTextLeftOffset();var r=e.container.getBoundingClientRect();o.top+=r.top-n.layerConfig.offset,o.left+=r.left-e.renderer.scrollLeft,o.left+=n.gutterWidth,this.popup.show(o,s)}},this.detach=function(){this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.off("changeSelection",this.changeListener),this.editor.off("blur",this.blurListener),this.editor.off("mousedown",this.mousedownListener),this.editor.off("mousewheel",this.mousewheelListener),this.changeTimer.cancel(),this.hideDocTooltip(),this.gatherCompletionsId+=1,this.popup&&this.popup.isOpen&&this.popup.hide(),this.base&&this.base.detach(),this.activated=!1,this.completions=this.base=null},this.changeListener=function(){var e=this.editor.selection.lead;(e.row!=this.base.row||e.column<this.base.column)&&this.detach(),this.activated?this.changeTimer.schedule():this.detach()},this.blurListener=function(e){var t=document.activeElement,i=this.editor.textInput.getElement(),n=e.relatedTarget&&e.relatedTarget==this.tooltipNode,s=this.popup&&this.popup.container;t==i||t.parentNode==s||n||t==this.tooltipNode||e.relatedTarget==i||this.detach()},this.mousedownListener=function(){this.detach()},this.mousewheelListener=function(){this.detach()},this.goTo=function(e){var t=this.popup.getRow(),i=this.popup.session.getLength()-1;switch(e){case"up":t=0>=t?i:t-1;break;case"down":t=t>=i?-1:t+1;break;case"start":t=0;break;case"end":t=i}this.popup.setRow(t)},this.insertMatch=function(e){if(e||(e=this.popup.getData(this.popup.getRow())),!e)return!1;if(e.completer&&e.completer.insertMatch)e.completer.insertMatch(this.editor,e);else{if(this.completions.filterText)for(var t,i=this.editor.selection.getAllRanges(),n=0;t=i[n];n++)t.start.column-=this.completions.filterText.length,this.editor.session.remove(t);e.snippet?a.insertSnippet(this.editor,e.snippet):this.editor.execCommand("insertstring",e.value||e)}this.detach()},this.commands={Up:function(e){e.completer.goTo("up")},Down:function(e){e.completer.goTo("down")},"Ctrl-Up|Ctrl-Home":function(e){e.completer.goTo("start")},"Ctrl-Down|Ctrl-End":function(e){e.completer.goTo("end")},Esc:function(e){e.completer.detach()},Return:function(e){return e.completer.insertMatch()},"Shift-Return":function(e){e.completer.insertMatch(null,{deleteSuffix:!0})},Tab:function(e){var t=e.completer.insertMatch();return t||e.tabstopManager?t:void e.completer.goTo("down")},PageUp:function(e){e.completer.popup.gotoPageUp()},PageDown:function(e){e.completer.popup.gotoPageDown()}},this.gatherCompletions=function(e,t){var i=e.getSession(),n=e.getCursorPosition(),o=(i.getLine(n.row),s.getCompletionPrefix(e));this.base=i.doc.createAnchor(n.row,n.column-o.length),this.base.$insertRight=!0;var r=[],a=e.completers.length;return e.completers.forEach(function(s){s.getCompletions(e,i,n,o,function(n,s){!n&&s&&(r=r.concat(s));var l=e.getCursorPosition();i.getLine(l.row);t(null,{prefix:o,matches:r,finished:0===--a})})}),!0},this.showPopup=function(e){this.editor&&this.detach(),this.activated=!0,this.editor=e,e.completer!=this&&(e.completer&&e.completer.detach(),e.completer=this),e.on("changeSelection",this.changeListener),e.on("blur",this.blurListener),e.on("mousedown",this.mousedownListener),e.on("mousewheel",this.mousewheelListener),this.updateCompletions()},this.updateCompletions=function(e){if(e&&this.base&&this.completions){var t=this.editor.getCursorPosition(),i=this.editor.session.getTextRange({start:this.base,end:t});if(i==this.completions.filterText)return;return this.completions.setFilter(i),this.completions.filtered.length&&(1!=this.completions.filtered.length||this.completions.filtered[0].value!=i||this.completions.filtered[0].snippet)?void this.openPopup(this.editor,i,e):this.detach()}var n=this.gatherCompletionsId;this.gatherCompletions(this.editor,function(t,i){var s=function(){return i.finished?this.detach():void 0}.bind(this),o=i.prefix,r=i&&i.matches;if(!r||!r.length)return s();if(0===o.indexOf(i.prefix)&&n==this.gatherCompletionsId){this.completions=new c(r),this.exactMatch&&(this.completions.exactMatch=!0),this.completions.setFilter(o);var a=this.completions.filtered;return a.length&&(1!=a.length||a[0].value!=o||a[0].snippet)?this.autoInsert&&1==a.length&&i.finished?this.insertMatch(a[0]):void this.openPopup(this.editor,o,e):s()}}.bind(this))},this.cancelContextMenu=function(){this.editor.$mouseHandler.cancelContextMenu()},this.updateDocTooltip=function(){var e=this.popup,t=e.data,i=t&&(t[e.getHoveredRow()]||t[e.getRow()]),n=null;return i&&this.editor&&this.popup.isOpen?(this.editor.completers.some(function(e){return e.getDocTooltip&&(n=e.getDocTooltip(i)),n}),n||(n=i),"string"==typeof n&&(n={docText:n}),n&&(n.docHTML||n.docText)?void this.showDocTooltip(n):this.hideDocTooltip()):this.hideDocTooltip()},this.showDocTooltip=function(e){this.tooltipNode||(this.tooltipNode=r.createElement("div"),this.tooltipNode.className="ace_tooltip ace_doc-tooltip",this.tooltipNode.style.margin=0,this.tooltipNode.style.pointerEvents="auto",this.tooltipNode.tabIndex=-1,this.tooltipNode.onblur=this.blurListener.bind(this));var t=this.tooltipNode;e.docHTML?t.innerHTML=e.docHTML:e.docText&&(t.textContent=e.docText),t.parentNode||document.body.appendChild(t);var i=this.popup,n=i.container.getBoundingClientRect();t.style.top=i.container.style.top,t.style.bottom=i.container.style.bottom,window.innerWidth-n.right<320?(t.style.right=window.innerWidth-n.left+"px",t.style.left=""):(t.style.left=n.right+1+"px",t.style.right=""),t.style.display="block"},this.hideDocTooltip=function(){if(this.tooltipTimer.cancel(),this.tooltipNode){var e=this.tooltipNode;this.editor.isFocused()||document.activeElement!=e||this.editor.focus(),this.tooltipNode=null,e.parentNode&&e.parentNode.removeChild(e)}}}).call(l.prototype),l.startCommand={name:"startAutocomplete",exec:function(e){e.completer||(e.completer=new l),e.completer.autoInsert=!1,e.completer.autoSelect=!0,e.completer.showPopup(e),e.completer.cancelContextMenu()},bindKey:"Ctrl-Space|Ctrl-Shift-Space|Alt-Space"};var c=function(e,t){this.all=e,this.filtered=e,this.filterText=t||"",this.exactMatch=!1};(function(){this.setFilter=function(e){if(e.length>this.filterText&&0===e.lastIndexOf(this.filterText,0))var t=this.filtered;else var t=this.all;this.filterText=e,t=this.filterCompletions(t,this.filterText),t=t.sort(function(e,t){return t.exactMatch-e.exactMatch||t.score-e.score});var i=null;t=t.filter(function(e){var t=e.snippet||e.caption||e.value;return t===i?!1:(i=t,!0)}),this.filtered=t},this.filterCompletions=function(e,t){var i=[],n=t.toUpperCase(),s=t.toLowerCase();e:for(var o,r=0;o=e[r];r++){var a=o.value||o.caption||o.snippet;if(a){var l,c,h=-1,u=0,d=0;if(this.exactMatch){if(t!==a.substr(0,t.length))continue e}else for(var g=0;g<t.length;g++){var f=a.indexOf(s[g],h+1),p=a.indexOf(n[g],h+1);if(l=f>=0&&(0>p||p>f)?f:p,0>l)continue e;c=l-h-1,c>0&&(-1===h&&(d+=10),d+=c),u|=1<<l,h=l}o.matchMask=u,o.exactMatch=d?0:1,o.score=(o.score||0)-d,i.push(o)}}return i}}).call(c.prototype),t.Autocomplete=l,t.FilteredList=c}),define("ace/autocomplete/text_completer",["require","exports","module","ace/range"],function(e,t){function i(e,t){var i=e.getTextRange(s.fromPoints({row:0,column:0},t));return i.split(o).length-1}function n(e,t){var n=i(e,t),s=e.getValue().split(o),r=Object.create(null),a=s[n];return s.forEach(function(e,t){if(e&&e!==a){var i=Math.abs(n-t),o=s.length-i;r[e]?r[e]=Math.max(o,r[e]):r[e]=o}}),r}var s=e("../range").Range,o=/[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;t.getCompletions=function(e,t,i,s,o){var r=n(t,i,s),a=Object.keys(r);o(null,a.map(function(e){return{caption:e,value:e,score:r[e],meta:"local"}}))}}),define("ace/ext/language_tools",["require","exports","module","ace/snippets","ace/autocomplete","ace/config","ace/lib/lang","ace/autocomplete/util","ace/autocomplete/text_completer","ace/editor","ace/config"],function(e,t){"use strict";var i=e("../snippets").snippetManager,n=e("../autocomplete").Autocomplete,s=e("../config"),o=e("../lib/lang"),r=e("../autocomplete/util"),a=e("../autocomplete/text_completer"),l={getCompletions:function(e,t,i,n,s){if(t.$mode.completer)return t.$mode.completer.getCompletions(e,t,i,n,s);var o=e.session.getState(i.row),r=t.$mode.getCompletions(o,t,i,n);s(null,r)}},c={getCompletions:function(e,t,n,s,o){var r=i.snippetMap,a=[];i.getActiveScopes(e).forEach(function(e){for(var t=r[e]||[],i=t.length;i--;){var n=t[i],s=n.name||n.tabTrigger;s&&a.push({caption:s,snippet:n.content,meta:n.tabTrigger&&!n.name?n.tabTrigger+"\u21e5 ":"snippet",type:"snippet"})}},this),o(null,a)},getDocTooltip:function(e){"snippet"!=e.type||e.docHTML||(e.docHTML=["<b>",o.escapeHTML(e.caption),"</b>","<hr></hr>",o.escapeHTML(e.snippet)].join(""))}},h=[c,a,l];t.setCompleters=function(e){h.length=0,e&&h.push.apply(h,e)},t.addCompleter=function(e){h.push(e)},t.textCompleter=a,t.keyWordCompleter=l,t.snippetCompleter=c;var u={name:"expandSnippet",exec:function(e){return i.expandWithTab(e)},bindKey:"Tab"},d=function(e,t){g(t.session.$mode)},g=function(e){var t=e.$id;i.files||(i.files={}),f(t),e.modes&&e.modes.forEach(g)},f=function(e){if(e&&!i.files[e]){var t=e.replace("mode","snippets");i.files[e]={},s.loadModule(t,function(t){t&&(i.files[e]=t,!t.snippets&&t.snippetText&&(t.snippets=i.parseSnippetFile(t.snippetText)),i.register(t.snippets||[],t.scope),t.includeScopes&&(i.snippetMap[t.scope].includeScopes=t.includeScopes,t.includeScopes.forEach(function(e){f("ace/mode/"+e)})))})}},p=function(e){var t=e.editor,i=t.completer&&t.completer.activated;
if("backspace"===e.command.name)i&&!r.getCompletionPrefix(t)&&t.completer.detach();else if("insertstring"===e.command.name){var s=r.getCompletionPrefix(t);s&&!i&&(t.completer||(t.completer=new n),t.completer.autoInsert=!1,t.completer.showPopup(t))}},m=e("../editor").Editor;e("../config").defineOptions(m.prototype,"editor",{enableBasicAutocompletion:{set:function(e){e?(this.completers||(this.completers=Array.isArray(e)?e:h),this.commands.addCommand(n.startCommand)):this.commands.removeCommand(n.startCommand)},value:!1},enableLiveAutocompletion:{set:function(e){e?(this.completers||(this.completers=Array.isArray(e)?e:h),this.commands.on("afterExec",p)):this.commands.removeListener("afterExec",p)},value:!1},enableSnippets:{set:function(e){e?(this.commands.addCommand(u),this.on("changeMode",d),d(null,this)):(this.commands.removeCommand(u),this.off("changeMode",d))},value:!1}})}),function(){window.require(["ace/ext/language_tools"],function(){})}();
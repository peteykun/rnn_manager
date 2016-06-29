define("ace/snippets",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/anchor","ace/keyboard/hash_handler","ace/tokenizer","ace/lib/dom","ace/editor"],function(e,t){"use strict";var i=e("./lib/oop"),n=e("./lib/event_emitter").EventEmitter,s=e("./lib/lang"),o=e("./range").Range,r=e("./anchor").Anchor,a=e("./keyboard/hash_handler").HashHandler,l=e("./tokenizer").Tokenizer,h=o.comparePoints,c=function(){this.snippetMap={},this.snippetNameMap={}};(function(){i.implement(this,n),this.getTokenizer=function(){function e(e,t,i){return e=e.substr(1),/^\d+$/.test(e)&&!i.inFormatString?[{tabstopId:parseInt(e,10)}]:[{text:e}]}function t(e){return"(?:[^\\\\"+e+"]|\\\\.)"}return c.$tokenizer=new l({start:[{regex:/:/,onMatch:function(e,t,i){return i.length&&i[0].expectIf?(i[0].expectIf=!1,i[0].elseBranch=i[0],[i[0]]):":"}},{regex:/\\./,onMatch:function(e,t,i){var n=e[1];return"}"==n&&i.length?e=n:-1!="`$\\".indexOf(n)?e=n:i.inFormatString&&("n"==n?e="\n":"t"==n?e="\n":-1!="ulULE".indexOf(n)&&(e={changeCase:n,local:n>"a"})),[e]}},{regex:/}/,onMatch:function(e,t,i){return[i.length?i.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:e},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(t,i,n){var s=e(t.substr(1),i,n);return n.unshift(s[0]),s},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+t("\\|")+"*\\|",onMatch:function(e,t,i){i[0].choices=e.slice(1,-1).split(",")},next:"start"},{regex:"/("+t("/")+"+)/(?:("+t("/")+"*)/)(\\w*):?",onMatch:function(e,t,i){var n=i[0];return n.fmtString=e,e=this.splitRegex.exec(e),n.guard=e[1],n.fmt=e[2],n.flag=e[3],""},next:"start"},{regex:"`"+t("`")+"*`",onMatch:function(e,t,i){return i[0].code=e.splice(1,-1),""},next:"start"},{regex:"\\?",onMatch:function(e,t,i){i[0]&&(i[0].expectIf=!0)},next:"start"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:"/("+t("/")+"+)/",token:"regex"},{regex:"",onMatch:function(e,t,i){i.inFormatString=!0},next:"start"}]}),c.prototype.getTokenizer=function(){return c.$tokenizer},c.$tokenizer},this.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map(function(e){return e.value||e})},this.$getDefaultValue=function(e,t){if(/^[A-Z]\d+$/.test(t)){var i=t.substr(1);return(this.variables[t[0]+"__"]||{})[i]}if(/^\d+$/.test(t))return(this.variables.__||{})[t];if(t=t.replace(/^TM_/,""),e){var n=e.session;switch(t){case"CURRENT_WORD":var s=n.getWordRange();case"SELECTION":case"SELECTED_TEXT":return n.getTextRange(s);case"CURRENT_LINE":return n.getLine(e.getCursorPosition().row);case"PREV_LINE":return n.getLine(e.getCursorPosition().row-1);case"LINE_INDEX":return e.getCursorPosition().column;case"LINE_NUMBER":return e.getCursorPosition().row+1;case"SOFT_TABS":return n.getUseSoftTabs()?"YES":"NO";case"TAB_SIZE":return n.getTabSize();case"FILENAME":case"FILEPATH":return"";case"FULLNAME":return"Ace"}}},this.variables={},this.getVariableValue=function(e,t){return this.variables.hasOwnProperty(t)?this.variables[t](e,t)||"":this.$getDefaultValue(e,t)||""},this.tmStrFormat=function(e,t,i){var n=t.flag||"",s=t.guard;s=new RegExp(s,n.replace(/[^gi]/,""));var o=this.tokenizeTmSnippet(t.fmt,"formatString"),r=this,a=e.replace(s,function(){r.variables.__=arguments;for(var e=r.resolveVariables(o,i),t="E",n=0;n<e.length;n++){var s=e[n];if("object"==typeof s)if(e[n]="",s.changeCase&&s.local){var a=e[n+1];a&&"string"==typeof a&&("u"==s.changeCase?e[n]=a[0].toUpperCase():e[n]=a[0].toLowerCase(),e[n+1]=a.substr(1))}else s.changeCase&&(t=s.changeCase);else"U"==t?e[n]=s.toUpperCase():"L"==t&&(e[n]=s.toLowerCase())}return e.join("")});return this.variables.__=null,a},this.resolveVariables=function(e,t){function i(t){var i=e.indexOf(t,s+1);-1!=i&&(s=i)}for(var n=[],s=0;s<e.length;s++){var o=e[s];if("string"==typeof o)n.push(o);else{if("object"!=typeof o)continue;if(o.skip)i(o);else{if(o.processed<s)continue;if(o.text){var r=this.getVariableValue(t,o.text);r&&o.fmtString&&(r=this.tmStrFormat(r,o)),o.processed=s,null==o.expectIf?r&&(n.push(r),i(o)):r?o.skip=o.elseBranch:i(o)}else null!=o.tabstopId?n.push(o):null!=o.changeCase&&n.push(o)}}}return n},this.insertSnippetForSelection=function(e,t){function i(e){for(var t=[],i=0;i<e.length;i++){var n=e[i];if("object"==typeof n){if(h[n.tabstopId])continue;var s=e.lastIndexOf(n,i-1);n=t[s]||{tabstopId:n.tabstopId}}t[i]=n}return t}var n=e.getCursorPosition(),s=e.session.getLine(n.row),o=e.session.getTabString(),r=s.match(/^\s*/)[0];n.column<r.length&&(r=r.slice(0,n.column));var a=this.tokenizeTmSnippet(t);a=this.resolveVariables(a,e),a=a.map(function(e){return"\n"==e?e+r:"string"==typeof e?e.replace(/\t/g,o):e});var l=[];a.forEach(function(e,t){if("object"==typeof e){var i=e.tabstopId,n=l[i];if(n||(n=l[i]=[],n.index=i,n.value=""),-1===n.indexOf(e)){n.push(e);var s=a.indexOf(e,t+1);if(-1!==s){var o=a.slice(t+1,s),r=o.some(function(e){return"object"==typeof e});r&&!n.value?n.value=o:!o.length||n.value&&"string"==typeof n.value||(n.value=o.join(""))}}}}),l.forEach(function(e){e.length=0});for(var h={},c=0;c<a.length;c++){var d=a[c];if("object"==typeof d){var g=d.tabstopId,f=a.indexOf(d,c+1);if(h[g])h[g]===d&&(h[g]=null);else{var p=l[g],m="string"==typeof p.value?[p.value]:i(p.value);m.unshift(c+1,Math.max(0,f-c)),m.push(d),h[g]=d,a.splice.apply(a,m),-1===p.indexOf(d)&&p.push(d)}}}var A=0,v=0,C="";a.forEach(function(e){"string"==typeof e?("\n"===e[0]?(v=e.length-1,A++):v+=e.length,C+=e):e.start?e.end={row:A,column:v}:e.start={row:A,column:v}});var F=e.getSelectionRange(),w=e.session.replace(F,C),E=new u(e),b=e.inVirtualSelectionMode&&e.selection.index;E.addTabstops(l,F.start,w,b)},this.insertSnippet=function(e,t){var i=this;return e.inVirtualSelectionMode?i.insertSnippetForSelection(e,t):(e.forEachSelection(function(){i.insertSnippetForSelection(e,t)},null,{keepOrder:!0}),void(e.tabstopManager&&e.tabstopManager.tabNext()))},this.$getScope=function(e){var t=e.session.$mode.$id||"";if(t=t.split("/").pop(),"html"===t||"php"===t){"php"!==t||e.session.$mode.inlinePhp||(t="html");var i=e.getCursorPosition(),n=e.session.getState(i.row);"object"==typeof n&&(n=n[0]),n.substring&&("js-"==n.substring(0,3)?t="javascript":"css-"==n.substring(0,4)?t="css":"php-"==n.substring(0,4)&&(t="php"))}return t},this.getActiveScopes=function(e){var t=this.$getScope(e),i=[t],n=this.snippetMap;return n[t]&&n[t].includeScopes&&i.push.apply(i,n[t].includeScopes),i.push("_"),i},this.expandWithTab=function(e,t){var i=this,n=e.forEachSelection(function(){return i.expandSnippetForSelection(e,t)},null,{keepOrder:!0});return n&&e.tabstopManager&&e.tabstopManager.tabNext(),n},this.expandSnippetForSelection=function(e,t){var i,n=e.getCursorPosition(),s=e.session.getLine(n.row),o=s.substring(0,n.column),r=s.substr(n.column),a=this.snippetMap;return this.getActiveScopes(e).some(function(e){var t=a[e];return t&&(i=this.findMatchingSnippet(t,o,r)),!!i},this),i?t&&t.dryRun?!0:(e.session.doc.removeInLine(n.row,n.column-i.replaceBefore.length,n.column+i.replaceAfter.length),this.variables.M__=i.matchBefore,this.variables.T__=i.matchAfter,this.insertSnippetForSelection(e,i.content),this.variables.M__=this.variables.T__=null,!0):!1},this.findMatchingSnippet=function(e,t,i){for(var n=e.length;n--;){var s=e[n];if((!s.startRe||s.startRe.test(t))&&(!s.endRe||s.endRe.test(i))&&(s.startRe||s.endRe))return s.matchBefore=s.startRe?s.startRe.exec(t):[""],s.matchAfter=s.endRe?s.endRe.exec(i):[""],s.replaceBefore=s.triggerRe?s.triggerRe.exec(t)[0]:"",s.replaceAfter=s.endTriggerRe?s.endTriggerRe.exec(i)[0]:"",s}},this.snippetMap={},this.snippetNameMap={},this.register=function(e,t){function i(e){return e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e)&&(e="(?:"+e+")"),e||""}function n(e,t,n){return e=i(e),t=i(t),n?(e=t+e,e&&"$"!=e[e.length-1]&&(e+="$")):(e+=t,e&&"^"!=e[0]&&(e="^"+e)),new RegExp(e)}function o(e){e.scope||(e.scope=t||"_"),t=e.scope,r[t]||(r[t]=[],a[t]={});var i=a[t];if(e.name){var o=i[e.name];o&&l.unregister(o),i[e.name]=e}r[t].push(e),e.tabTrigger&&!e.trigger&&(!e.guard&&/^\w/.test(e.tabTrigger)&&(e.guard="\\b"),e.trigger=s.escapeRegExp(e.tabTrigger)),(e.trigger||e.guard||e.endTrigger||e.endGuard)&&(e.startRe=n(e.trigger,e.guard,!0),e.triggerRe=new RegExp(e.trigger,"",!0),e.endRe=n(e.endTrigger,e.endGuard,!0),e.endTriggerRe=new RegExp(e.endTrigger,"",!0))}var r=this.snippetMap,a=this.snippetNameMap,l=this;e||(e=[]),e&&e.content?o(e):Array.isArray(e)&&e.forEach(o),this._signal("registerSnippets",{scope:t})},this.unregister=function(e,t){function i(e){var i=s[e.scope||t];if(i&&i[e.name]){delete i[e.name];var o=n[e.scope||t],r=o&&o.indexOf(e);r>=0&&o.splice(r,1)}}var n=this.snippetMap,s=this.snippetNameMap;e.content?i(e):Array.isArray(e)&&e.forEach(i)},this.parseSnippetFile=function(e){e=e.replace(/\r/g,"");for(var t,i=[],n={},s=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;t=s.exec(e);){if(t[1])try{n=JSON.parse(t[1]),i.push(n)}catch(o){}if(t[4])n.content=t[4].replace(/^\t/gm,""),i.push(n),n={};else{var r=t[2],a=t[3];if("regex"==r){var l=/\/((?:[^\/\\]|\\.)*)|$/g;n.guard=l.exec(a)[1],n.trigger=l.exec(a)[1],n.endTrigger=l.exec(a)[1],n.endGuard=l.exec(a)[1]}else"snippet"==r?(n.tabTrigger=a.match(/^\S*/)[0],n.name||(n.name=a)):n[r]=a}}return i},this.getSnippetByName=function(e,t){var i,n=this.snippetNameMap;return this.getActiveScopes(t).some(function(t){var s=n[t];return s&&(i=s[e]),!!i},this),i}}).call(c.prototype);var u=function(e){return e.tabstopManager?e.tabstopManager:(e.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=s.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),void this.attach(e))};(function(){this.attach=function(e){this.index=0,this.ranges=[],this.tabstops=[],this.$openTabstops=null,this.selectedTabstop=null,this.editor=e,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges=null,this.tabstops=null,this.selectedTabstop=null,this.editor.removeListener("change",this.$onChange),this.editor.removeListener("changeSelection",this.$onChangeSelection),this.editor.removeListener("changeSession",this.$onChangeSession),this.editor.commands.removeListener("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.editor=null},this.onChange=function(e){var t="r"==e.action[0],i=e.start,n=e.end,s=i.row,o=n.row,r=o-s,a=n.column-i.column;if(t&&(r=-r,a=-a),!this.$inChange&&t){var l=this.selectedTabstop,c=l&&!l.some(function(e){return h(e.start,i)<=0&&h(e.end,n)>=0});if(c)return this.detach()}for(var u=this.ranges,d=0;d<u.length;d++){var g=u[d];g.end.row<i.row||(t&&h(i,g.start)<0&&h(n,g.end)>0?(this.removeRange(g),d--):(g.start.row==s&&g.start.column>i.column&&(g.start.column+=a),g.end.row==s&&g.end.column>=i.column&&(g.end.column+=a),g.start.row>=s&&(g.start.row+=r),g.end.row>=s&&(g.end.row+=r),h(g.start,g.end)>0&&this.removeRange(g)))}u.length||this.detach()},this.updateLinkedFields=function(){var e=this.selectedTabstop;if(e&&e.hasLinkedRanges){this.$inChange=!0;for(var i=this.editor.session,n=i.getTextRange(e.firstNonLinked),s=e.length;s--;){var o=e[s];if(o.linked){var r=t.snippetManager.tmStrFormat(n,o.original);i.replace(o,r)}}this.$inChange=!1}},this.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},this.onChangeSelection=function(){if(this.editor){for(var e=this.editor.selection.lead,t=this.editor.selection.anchor,i=this.editor.selection.isEmpty(),n=this.ranges.length;n--;)if(!this.ranges[n].linked){var s=this.ranges[n].contains(e.row,e.column),o=i||this.ranges[n].contains(t.row,t.column);if(s&&o)return}this.detach()}},this.onChangeSession=function(){this.detach()},this.tabNext=function(e){var t=this.tabstops.length,i=this.index+(e||1);i=Math.min(Math.max(i,1),t),i==t&&(i=0),this.selectTabstop(i),0===i&&this.detach()},this.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t&&this.addTabstopMarkers(t),this.index=e,t=this.tabstops[this.index],t&&t.length){if(this.selectedTabstop=t,this.editor.inVirtualSelectionMode)this.editor.selection.setRange(t.firstNonLinked);else{var i=this.editor.multiSelect;i.toSingleRange(t.firstNonLinked.clone());for(var n=t.length;n--;)t.hasLinkedRanges&&t[n].linked||i.addRange(t[n].clone(),!0);i.ranges[0]&&i.addRange(i.ranges[0].clone())}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)}},this.addTabstops=function(e,t,i){if(this.$openTabstops||(this.$openTabstops=[]),!e[0]){var n=o.fromPoints(i,i);f(n.start,t),f(n.end,t),e[0]=[n],e[0].index=0}var s=this.index,r=[s+1,0],a=this.ranges;e.forEach(function(e,i){for(var n=this.$openTabstops[i]||e,s=e.length;s--;){var l=e[s],h=o.fromPoints(l.start,l.end||l.start);g(h.start,t),g(h.end,t),h.original=l,h.tabstop=n,a.push(h),n!=e?n.unshift(h):n[s]=h,l.fmtString?(h.linked=!0,n.hasLinkedRanges=!0):n.firstNonLinked||(n.firstNonLinked=h)}n.firstNonLinked||(n.hasLinkedRanges=!1),n===e&&(r.push(n),this.$openTabstops[i]=n),this.addTabstopMarkers(n)},this),r.length>2&&(this.tabstops.length&&r.push(r.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,r))},this.addTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){e.markerId||(e.markerId=t.addMarker(e,"ace_snippet-marker","text"))})},this.removeTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){t.removeMarker(e.markerId),e.markerId=null})},this.removeRange=function(e){var t=e.tabstop.indexOf(e);e.tabstop.splice(t,1),t=this.ranges.indexOf(e),this.ranges.splice(t,1),this.editor.session.removeMarker(e.markerId),e.tabstop.length||(t=this.tabstops.indexOf(e.tabstop),-1!=t&&this.tabstops.splice(t,1),this.tabstops.length||this.detach())},this.keyboardHandler=new a,this.keyboardHandler.bindKeys({Tab:function(e){t.snippetManager&&t.snippetManager.expandWithTab(e)||e.tabstopManager.tabNext(1)},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1)},Esc:function(e){e.tabstopManager.detach()},Return:function(){return!1}})}).call(u.prototype);var d={};d.onChange=r.prototype.onChange,d.setPosition=function(e,t){this.pos.row=e,this.pos.column=t},d.update=function(e,t,i){this.$insertRight=i,this.pos=e,this.onChange(t)};var g=function(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row},f=function(e,t){e.row==t.row&&(e.column-=t.column),e.row-=t.row};e("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}"),t.snippetManager=new c;var p=e("./editor").Editor;(function(){this.insertSnippet=function(e,i){return t.snippetManager.insertSnippet(this,e,i)},this.expandSnippet=function(e){return t.snippetManager.expandWithTab(this,e)}}).call(p.prototype)}),define("ace/ext/emmet",["require","exports","module","ace/keyboard/hash_handler","ace/editor","ace/snippets","ace/range","resources","resources","range","tabStops","resources","utils","actions","ace/config","ace/config"],function(e,t){"use strict";function i(){}var n,s,o=e("ace/keyboard/hash_handler").HashHandler,r=e("ace/editor").Editor,a=e("ace/snippets").snippetManager,l=e("ace/range").Range;i.prototype={setupContext:function(e){this.ace=e,this.indentation=e.session.getTabString(),n||(n=window.emmet),n.require("resources").setVariable("indentation",this.indentation),this.$syntax=null,this.$syntax=this.getSyntax()},getSelectionRange:function(){var e=this.ace.getSelectionRange(),t=this.ace.session.doc;return{start:t.positionToIndex(e.start),end:t.positionToIndex(e.end)}},createSelection:function(e,t){var i=this.ace.session.doc;this.ace.selection.setRange({start:i.indexToPosition(e),end:i.indexToPosition(t)})},getCurrentLineRange:function(){var e=this.ace,t=e.getCursorPosition().row,i=e.session.getLine(t).length,n=e.session.doc.positionToIndex({row:t,column:0});return{start:n,end:n+i}},getCaretPos:function(){var e=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(e)},setCaretPos:function(e){var t=this.ace.session.doc.indexToPosition(e);this.ace.selection.moveToPosition(t)},getCurrentLine:function(){var e=this.ace.getCursorPosition().row;return this.ace.session.getLine(e)},replaceContent:function(e,t,i){null==i&&(i=null==t?this.getContent().length:t),null==t&&(t=0);var n=this.ace,s=n.session.doc,o=l.fromPoints(s.indexToPosition(t),s.indexToPosition(i));n.session.remove(o),o.end=o.start,e=this.$updateTabstops(e),a.insertSnippet(n,e)},getContent:function(){return this.ace.getValue()},getSyntax:function(){if(this.$syntax)return this.$syntax;var e=this.ace.session.$modeId.split("/").pop();if("html"==e||"php"==e){var t=this.ace.getCursorPosition(),i=this.ace.session.getState(t.row);"string"!=typeof i&&(i=i[0]),i&&(i=i.split("-"),i.length>1?e=i[0]:"php"==e&&(e="html"))}return e},getProfileName:function(){switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var e=n.require("resources").getVariable("profile");return e||(e=-1!=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)?"xhtml":"html"),e;default:var t=this.ace.session.$mode;return t.emmetConfig&&t.emmetConfig.profile||"xhtml"}},prompt:function(e){return prompt(e)},getSelection:function(){return this.ace.session.getTextRange()},getFilePath:function(){return""},$updateTabstops:function(e){var t=1e3,i=0,s=null,o=n.require("range"),r=n.require("tabStops"),a=n.require("resources").getVocabulary("user"),l={tabstop:function(e){var n=parseInt(e.group,10),a=0===n;a?n=++i:n+=t;var h=e.placeholder;h&&(h=r.processText(h,l));var c="${"+n+(h?":"+h:"")+"}";return a&&(s=o.create(e.start,c)),c},escape:function(e){return"$"==e?"\\$":"\\"==e?"\\\\":e}};return e=r.processText(e,l),a.variables.insert_final_tabstop&&!/\$\{0\}$/.test(e)?e+="${0}":s&&(e=n.require("utils").replaceSubstring(e,"${0}",s)),e}};var h={expand_abbreviation:{mac:"ctrl+alt+e",win:"alt+e"},match_pair_outward:{mac:"ctrl+d",win:"ctrl+,"},match_pair_inward:{mac:"ctrl+j",win:"ctrl+shift+0"},matching_pair:{mac:"ctrl+alt+j",win:"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{mac:"command+/",win:"ctrl+/"},split_join_tag:{mac:"shift+command+'",win:"shift+ctrl+`"},remove_tag:{mac:"command+'",win:"shift+ctrl+;"},evaluate_math_expression:{mac:"shift+command+y",win:"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{mac:"alt+command+up",win:"shift+alt+up"},decrement_number_by_10:{mac:"alt+command+down",win:"shift+alt+down"},select_next_item:{mac:"shift+command+.",win:"shift+ctrl+."},select_previous_item:{mac:"shift+command+,",win:"shift+ctrl+,"},reflect_css_value:{mac:"shift+command+r",win:"shift+ctrl+r"},encode_decode_data_url:{mac:"shift+ctrl+d",win:"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{mac:"shift+ctrl+a",win:"shift+ctrl+a"}},c=new i;t.commands=new o,t.runEmmetCommand=function f(e){try{c.setupContext(e);var t=n.require("actions");if("expand_abbreviation_with_tab"==this.action){if(!e.selection.isEmpty())return!1;var i=e.selection.lead,s=e.session.getTokenAt(i.row,i.column);if(s&&/\btag\b/.test(s.type))return!1}if("wrap_with_abbreviation"==this.action)return setTimeout(function(){t.run("wrap_with_abbreviation",c)},0);var o=t.run(this.action,c)}catch(r){if(!n)return g(f.bind(this,e)),!0;e._signal("changeStatus","string"==typeof r?r:r.message),console.log(r),o=!1}return o};for(var u in h)t.commands.addCommand({name:"emmet:"+u,action:u,bindKey:h[u],exec:t.runEmmetCommand,multiSelectAction:"forEach"});t.updateCommands=function(e,i){i?e.keyBinding.addKeyboardHandler(t.commands):e.keyBinding.removeKeyboardHandler(t.commands)},t.isSupportedMode=function(e){if(!e)return!1;if(e.emmetConfig)return!0;var t=e.$id||e;return/css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(t)},t.isAvailable=function(e,i){if(/(evaluate_math_expression|expand_abbreviation)$/.test(i))return!0;var n=e.session.$mode,s=t.isSupportedMode(n);if(s&&n.$modes)try{c.setupContext(e),/js|php/.test(c.getSyntax())&&(s=!1)}catch(o){}return s};var d=function(e,i){var n=i;if(n){var s=t.isSupportedMode(n.session.$mode);e.enableEmmet===!1&&(s=!1),s&&g(),t.updateCommands(n,s)}},g=function(t){"string"==typeof s&&e("ace/config").loadModule(s,function(){s=null,t&&t()})};t.AceEmmetEditor=i,e("ace/config").defineOptions(r.prototype,"editor",{enableEmmet:{set:function(e){this[e?"on":"removeListener"]("changeMode",d),d({enableEmmet:!!e},this)},value:!0}}),t.setCore=function(e){"string"==typeof e?s=e:n=e}}),function(){window.require(["ace/ext/emmet"],function(){})}();
define("ace/mode/ruby_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=t.constantOtherSymbol={token:"constant.other.symbol.ruby",regex:"[:](?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?"},i=(t.qString={token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},t.qqString={token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},t.tString={token:"string",regex:"[`](?:(?:\\\\.)|(?:[^'\\\\]))*?[`]"},t.constantNumericHex={token:"constant.numeric",regex:"0[xX][0-9a-fA-F](?:[0-9a-fA-F]|_(?=[0-9a-fA-F]))*\\b"}),a=t.constantNumericFloat={token:"constant.numeric",regex:"[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?\\b"},s=function(){var e="abort|Array|assert|assert_equal|assert_not_equal|assert_same|assert_not_same|assert_nil|assert_not_nil|assert_match|assert_no_match|assert_in_delta|assert_throws|assert_raise|assert_nothing_raised|assert_instance_of|assert_kind_of|assert_respond_to|assert_operator|assert_send|assert_difference|assert_no_difference|assert_recognizes|assert_generates|assert_response|assert_redirected_to|assert_template|assert_select|assert_select_email|assert_select_rjs|assert_select_encoded|css_select|at_exit|attr|attr_writer|attr_reader|attr_accessor|attr_accessible|autoload|binding|block_given?|callcc|caller|catch|chomp|chomp!|chop|chop!|defined?|delete_via_redirect|eval|exec|exit|exit!|fail|Float|flunk|follow_redirect!|fork|form_for|form_tag|format|gets|global_variables|gsub|gsub!|get_via_redirect|host!|https?|https!|include|Integer|lambda|link_to|link_to_unless_current|link_to_function|link_to_remote|load|local_variables|loop|open|open_session|p|print|printf|proc|putc|puts|post_via_redirect|put_via_redirect|raise|rand|raw|readline|readlines|redirect?|request_via_redirect|require|scan|select|set_trace_func|sleep|split|sprintf|srand|String|stylesheet_link_tag|syscall|system|sub|sub!|test|throw|trace_var|trap|untrace_var|atan2|cos|exp|frexp|ldexp|log|log10|sin|sqrt|tan|render|javascript_include_tag|csrf_meta_tag|label_tag|text_field_tag|submit_tag|check_box_tag|content_tag|radio_button_tag|text_area_tag|password_field_tag|hidden_field_tag|fields_for|select_tag|options_for_select|options_from_collection_for_select|collection_select|time_zone_select|select_date|select_time|select_datetime|date_select|time_select|datetime_select|select_year|select_month|select_day|select_hour|select_minute|select_second|file_field_tag|file_field|respond_to|skip_before_filter|around_filter|after_filter|verify|protect_from_forgery|rescue_from|helper_method|redirect_to|before_filter|send_data|send_file|validates_presence_of|validates_uniqueness_of|validates_length_of|validates_format_of|validates_acceptance_of|validates_associated|validates_exclusion_of|validates_inclusion_of|validates_numericality_of|validates_with|validates_each|authenticate_or_request_with_http_basic|authenticate_or_request_with_http_digest|filter_parameter_logging|match|get|post|resources|redirect|scope|assert_routing|translate|localize|extract_locale_from_tld|caches_page|expire_page|caches_action|expire_action|cache|expire_fragment|expire_cache_for|observe|cache_sweeper|has_many|has_one|belongs_to|has_and_belongs_to_many",t="alias|and|BEGIN|begin|break|case|class|def|defined|do|else|elsif|END|end|ensure|__FILE__|finally|for|gem|if|in|__LINE__|module|next|not|or|private|protected|public|redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield",n="true|TRUE|false|FALSE|nil|NIL|ARGF|ARGV|DATA|ENV|RUBY_PLATFORM|RUBY_RELEASE_DATE|RUBY_VERSION|STDERR|STDIN|STDOUT|TOPLEVEL_BINDING",r="$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|$!|root_url|flash|session|cookies|params|request|response|logger|self",s=this.$keywords=this.createKeywordMapper({keyword:t,"constant.language":n,"variable.language":r,"support.function":e,"invalid.deprecated":"debugger"},"identifier");this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"comment",regex:"^=begin(?:$|\\s.*$)",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},[{regex:"[{}]",onMatch:function(e,t,n){return this.next="{"==e?this.nextState:"","{"==e&&n.length?(n.unshift("start",t),"paren.lparen"):"}"==e&&n.length&&(n.shift(),this.next=n.shift(),-1!=this.next.indexOf("string"))?"paren.end":"{"==e?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.start",regex:/"/,push:[{token:"constant.language.escape",regex:/\\(?:[nsrtvfbae'"\\]|c.|C-.|M-.(?:\\C-.)?|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4})/},{token:"paren.start",regex:/\#{/,push:"start"},{token:"string.end",regex:/"/,next:"pop"},{defaultToken:"string"}]},{token:"string.start",regex:/`/,push:[{token:"constant.language.escape",regex:/\\(?:[nsrtvfbae'"\\]|c.|C-.|M-.(?:\\C-.)?|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4})/},{token:"paren.start",regex:/\#{/,push:"start"},{token:"string.end",regex:/`/,next:"pop"},{defaultToken:"string"}]},{token:"string.start",regex:/'/,push:[{token:"constant.language.escape",regex:/\\['\\]/},{token:"string.end",regex:/'/,next:"pop"},{defaultToken:"string"}]}],{token:"text",regex:"::"},{token:"variable.instance",regex:"@{1,2}[a-zA-Z_\\d]+"},{token:"support.class",regex:"[A-Z][a-zA-Z_\\d]+"},o,i,a,{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:s,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"punctuation.separator.key-value",regex:"=>"},{stateName:"heredoc",onMatch:function(e,t,n){var r="-"==e[2]?"indentedHeredoc":"heredoc",o=e.split(this.splitRegex);return n.push(r,o[3]),[{type:"constant",value:o[1]},{type:"string",value:o[2]},{type:"support.class",value:o[3]},{type:"string",value:o[4]}]},regex:"(<<-?)(['\"`]?)([\\w]+)(['\"`]?)",rules:{heredoc:[{onMatch:function(e,t,n){return e===n[1]?(n.shift(),n.shift(),this.next=n[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}],indentedHeredoc:[{token:"string",regex:"^ +"},{onMatch:function(e,t,n){return e===n[1]?(n.shift(),n.shift(),this.next=n[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}]}},{regex:"$",token:"empty",next:function(e,t){return"heredoc"===t[0]||"indentedHeredoc"===t[0]?t[0]:e}},{token:"string.character",regex:"\\B\\?."},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"^=end(?:$|\\s.*$)",next:"start"},{token:"comment",regex:".+"}]},this.normalizeRules()};n.inherits(s,r),t.RubyHighlightRules=s}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var n=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){"use strict";var n,r=e("../../lib/oop"),o=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,a=e("../../lib/lang"),s=["text","paren.rparen","punctuation.operator"],l=["text","paren.rparen","punctuation.operator","comment"],c={},u=function(e){var t=-1;return e.multiSelect&&(t=e.selection.index,c.rangeCount!=e.multiSelect.rangeCount&&(c={rangeCount:e.multiSelect.rangeCount})),c[t]?n=c[t]:void(n=c[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},d=function(e,t,n,r){var o=e.end.row-e.start.row;return{text:n+t+r,selection:[0,e.start.column+1,o,e.end.column+(o?0:1)]}},g=function(){this.add("braces","insertion",function(e,t,r,o,i){var s=r.getCursorPosition(),l=o.doc.getLine(s.row);if("{"==i){u(r);var c=r.getSelectionRange(),m=o.doc.getTextRange(c);if(""!==m&&"{"!==m&&r.getWrapBehavioursEnabled())return d(c,m,"{","}");if(g.isSaneInsertion(r,o))return/[\]\}\)]/.test(l[s.column])||r.inMultiSelectMode?(g.recordAutoInsert(r,o,"}"),{text:"{}",selection:[1,1]}):(g.recordMaybeInsert(r,o,"{"),{text:"{",selection:[1,1]})}else if("}"==i){u(r);var p=l.substring(s.column,s.column+1);if("}"==p){var h=o.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==h&&g.isAutoInsertedClosing(s,l,i))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==i||"\r\n"==i){u(r);var f="";g.isMaybeInsertedClosing(s,l)&&(f=a.stringRepeat("}",n.maybeInsertedBrackets),g.clearMaybeInsertedClosing());var p=l.substring(s.column,s.column+1);if("}"===p){var _=o.findMatchingBracket({row:s.row,column:s.column+1},"}");if(!_)return null;var x=this.$getIndent(o.getLine(_.row))}else{if(!f)return void g.clearMaybeInsertedClosing();var x=this.$getIndent(l)}var b=x+o.getTabString();return{text:"\n"+b+"\n"+x+f,selection:[1,b.length,1,b.length]}}g.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,r,o,i){var a=o.doc.getTextRange(i);if(!i.isMultiLine()&&"{"==a){u(r);var s=o.doc.getLine(i.start.row),l=s.substring(i.end.column,i.end.column+1);if("}"==l)return i.end.column++,i;n.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){u(n);var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return d(i,a,"(",")");if(g.isSaneInsertion(n,r))return g.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){u(n);var s=n.getCursorPosition(),l=r.doc.getLine(s.row),c=l.substring(s.column,s.column+1);if(")"==c){var m=r.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==m&&g.isAutoInsertedClosing(s,l,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){u(n);var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(")"==s)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){u(n);var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return d(i,a,"[","]");if(g.isSaneInsertion(n,r))return g.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){u(n);var s=n.getCursorPosition(),l=r.doc.getLine(s.row),c=l.substring(s.column,s.column+1);if("]"==c){var m=r.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==m&&g.isAutoInsertedClosing(s,l,o))return g.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){u(n);var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if("]"==s)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){u(n);var i=o,a=n.getSelectionRange(),s=r.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return d(a,s,i,i);if(!s){var l=n.getCursorPosition(),c=r.doc.getLine(l.row),g=c.substring(l.column-1,l.column),m=c.substring(l.column,l.column+1),p=r.getTokenAt(l.row,l.column),h=r.getTokenAt(l.row,l.column+1);if("\\"==g&&p&&/escape/.test(p.type))return null;var f,_=p&&/string|escape/.test(p.type),x=!h||/string|escape/.test(h.type);if(m==i)f=_!==x;else{if(_&&!x)return null;if(_&&x)return null;var b=r.$mode.tokenRe;b.lastIndex=0;var k=b.test(g);b.lastIndex=0;var v=b.test(g);if(k||v)return null;if(m&&!/[\s;,.})\]\\]/.test(m))return null;f=!0}return{text:f?i+i:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){u(n);var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(s==i)return o.end.column++,o}})};g.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new i(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",s)){var o=new i(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",s))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",l)},g.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},g.recordAutoInsert=function(e,t,r){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isAutoInsertedClosing(o,i,n.autoInsertedLineEnd[0])||(n.autoInsertedBrackets=0),n.autoInsertedRow=o.row,n.autoInsertedLineEnd=r+i.substr(o.column),n.autoInsertedBrackets++},g.recordMaybeInsert=function(e,t,r){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isMaybeInsertedClosing(o,i)||(n.maybeInsertedBrackets=0),n.maybeInsertedRow=o.row,n.maybeInsertedLineStart=i.substr(0,o.column)+r,n.maybeInsertedLineEnd=i.substr(o.column),n.maybeInsertedBrackets++},g.isAutoInsertedClosing=function(e,t,r){return n.autoInsertedBrackets>0&&e.row===n.autoInsertedRow&&r===n.autoInsertedLineEnd[0]&&t.substr(e.column)===n.autoInsertedLineEnd},g.isMaybeInsertedClosing=function(e,t){return n.maybeInsertedBrackets>0&&e.row===n.maybeInsertedRow&&t.substr(e.column)===n.maybeInsertedLineEnd&&t.substr(0,e.column)==n.maybeInsertedLineStart},g.popAutoInsertedClosing=function(){n.autoInsertedLineEnd=n.autoInsertedLineEnd.substr(1),n.autoInsertedBrackets--},g.clearMaybeInsertedClosing=function(){n&&(n.maybeInsertedBrackets=0,n.maybeInsertedRow=-1)},r.inherits(g,o),t.CstyleBehaviour=g}),define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t){"use strict";var n=e("../../lib/oop"),r=e("./fold_mode").FoldMode,o=e("../../range").Range,i=t.FoldMode=function(){};n.inherits(i,r),function(){this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;var i=/\S/,a=e.getLine(n),s=a.search(i);if(-1!=s&&"#"==a[s]){for(var l=a.length,c=e.getLength(),u=n,d=n;++n<c;){a=e.getLine(n);var g=a.search(i);if(-1!=g){if("#"!=a[g])break;d=n}}if(d>u){var m=e.getLine(d).length;return new o(u,l,d,m)}}},this.getFoldWidget=function(e,t,n){var r=e.getLine(n),o=r.search(/\S/),i=e.getLine(n+1),a=e.getLine(n-1),s=a.search(/\S/),l=i.search(/\S/);if(-1==o)return e.foldWidgets[n-1]=-1!=s&&l>s?"start":"","";if(-1==s){if(o==l&&"#"==r[o]&&"#"==i[o])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(s==o&&"#"==r[o]&&"#"==a[o]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return-1!=s&&o>s?e.foldWidgets[n-1]="start":e.foldWidgets[n-1]="",l>o?"start":""}}.call(i.prototype)}),define("ace/mode/ruby",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/ruby_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle","ace/mode/folding/coffee"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text").Mode,o=e("./ruby_highlight_rules").RubyHighlightRules,i=e("./matching_brace_outdent").MatchingBraceOutdent,a=e("../range").Range,s=e("./behaviour/cstyle").CstyleBehaviour,l=e("./folding/coffee").FoldMode,c=function(){this.HighlightRules=o,this.$outdent=new i,this.$behaviour=new s,this.foldingRules=new l};n.inherits(c,r),function(){this.lineCommentStart="#",this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),i=o.tokens;if(i.length&&"comment"==i[i.length-1].type)return r;if("start"==e){var a=t.match(/^.*[\{\(\[]\s*$/),s=t.match(/^\s*(class|def|module)\s.*$/),l=t.match(/.*do(\s*|\s+\|.*\|\s*)$/),c=t.match(/^\s*(if|else|when)\s*/);(a||s||l||c)&&(r+=n)}return r},this.checkOutdent=function(e,t,n){return/^\s+(end|else)$/.test(t+n)||this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){var r=t.getLine(n);if(/}/.test(r))return this.$outdent.autoOutdent(t,n);var o=this.$getIndent(r),i=t.getLine(n-1),s=this.$getIndent(i),l=t.getTabString();s.length<=o.length&&o.slice(-l.length)==l&&t.remove(new a(n,o.length-l.length,n,o.length))},this.$id="ace/mode/ruby"}.call(c.prototype),t.Mode=c});
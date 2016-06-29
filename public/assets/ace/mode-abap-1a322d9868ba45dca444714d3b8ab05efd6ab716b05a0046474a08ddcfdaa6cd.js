define("ace/mode/abap_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,o=function(){var e=this.createKeywordMapper({"variable.language":"this",keyword:"ADD ALIAS ALIASES ASSERT ASSIGN ASSIGNING AT BACK CALL CASE CATCH CHECK CLASS CLEAR CLOSE CNT COLLECT COMMIT COMMUNICATION COMPUTE CONCATENATE CONDENSE CONSTANTS CONTINUE CONTROLS CONVERT CREATE CURRENCY DATA DEFINE DEFINITION DEFERRED DELETE DESCRIBE DETAIL DIVIDE DO ELSE ELSEIF ENDAT ENDCASE ENDCLASS ENDDO ENDEXEC ENDFORM ENDFUNCTION ENDIF ENDIFEND ENDINTERFACE ENDLOOP ENDMETHOD ENDMODULE ENDON ENDPROVIDE ENDSELECT ENDTRY ENDWHILE EVENT EVENTS EXEC EXIT EXPORT EXPORTING EXTRACT FETCH FIELDS FORM FORMAT FREE FROM FUNCTION GENERATE GET HIDE IF IMPORT IMPORTING INDEX INFOTYPES INITIALIZATION INTERFACE INTERFACES INPUT INSERT IMPLEMENTATION LEAVE LIKE LINE LOAD LOCAL LOOP MESSAGE METHOD METHODS MODIFY MODULE MOVE MULTIPLY ON OVERLAY OPTIONAL OTHERS PACK PARAMETERS PERFORM POSITION PROGRAM PROVIDE PUT RAISE RANGES READ RECEIVE RECEIVING REDEFINITION REFERENCE REFRESH REJECT REPLACE REPORT RESERVE RESTORE RETURNING ROLLBACK SCAN SCROLL SEARCH SELECT SET SHIFT SKIP SORT SORTED SPLIT STANDARD STATICS STEP STOP SUBMIT SUBTRACT SUM SUMMARY SUPPRESS TABLES TIMES TRANSFER TRANSLATE TRY TYPE TYPES UNASSIGN ULINE UNPACK UPDATE WHEN WHILE WINDOW WRITE OCCURS STRUCTURE OBJECT PROPERTY CASTING APPEND RAISING VALUE COLOR CHANGING EXCEPTION EXCEPTIONS DEFAULT CHECKBOX COMMENT ID NUMBER FOR TITLE OUTPUT WITH EXIT USING INTO WHERE GROUP BY HAVING ORDER BY SINGLE APPENDING CORRESPONDING FIELDS OF TABLE LEFT RIGHT OUTER INNER JOIN AS CLIENT SPECIFIED BYPASSING BUFFER UP TO ROWS CONNECTING EQ NE LT LE GT GE NOT AND OR XOR IN LIKE BETWEEN","constant.language":"TRUE FALSE NULL SPACE","support.type":"c n i p f d t x string xstring decfloat16 decfloat34","keyword.operator":"abs sign ceil floor trunc frac acos asin atan cos sin tan abapOperator cosh sinh tanh exp log log10 sqrt strlen xstrlen charlen numofchar dbmaxlen lines"},"text",!0," "),t="WITH\\W+(?:HEADER\\W+LINE|FRAME|KEY)|NO\\W+STANDARD\\W+PAGE\\W+HEADING|EXIT\\W+FROM\\W+STEP\\W+LOOP|BEGIN\\W+OF\\W+(?:BLOCK|LINE)|BEGIN\\W+OF|END\\W+OF\\W+(?:BLOCK|LINE)|END\\W+OF|NO\\W+INTERVALS|RESPECTING\\W+BLANKS|SEPARATED\\W+BY|USING\\W+(?:EDIT\\W+MASK)|WHERE\\W+(?:LINE)|RADIOBUTTON\\W+GROUP|REF\\W+TO|(?:PUBLIC|PRIVATE|PROTECTED)(?:\\W+SECTION)?|DELETING\\W+(?:TRAILING|LEADING)(?:ALL\\W+OCCURRENCES)|(?:FIRST|LAST)\\W+OCCURRENCE|INHERITING\\W+FROM|LINE-COUNT|ADD-CORRESPONDING|AUTHORITY-CHECK|BREAK-POINT|CLASS-DATA|CLASS-METHODS|CLASS-METHOD|DIVIDE-CORRESPONDING|EDITOR-CALL|END-OF-DEFINITION|END-OF-PAGE|END-OF-SELECTION|FIELD-GROUPS|FIELD-SYMBOLS|FUNCTION-POOL|MOVE-CORRESPONDING|MULTIPLY-CORRESPONDING|NEW-LINE|NEW-PAGE|NEW-SECTION|PRINT-CONTROL|RP-PROVIDE-FROM-LAST|SELECT-OPTIONS|SELECTION-SCREEN|START-OF-SELECTION|SUBTRACT-CORRESPONDING|SYNTAX-CHECK|SYNTAX-TRACE|TOP-OF-PAGE|TYPE-POOL|TYPE-POOLS|LINE-SIZE|LINE-COUNT|MESSAGE-ID|DISPLAY-MODE|READ(?:-ONLY)?|IS\\W+(?:NOT\\W+)?(?:ASSIGNED|BOUND|INITIAL|SUPPLIED)";this.$rules={start:[{token:"string",regex:"`",next:"string"},{token:"string",regex:"'",next:"qstring"},{token:"doc.comment",regex:/^\*.+/},{token:"comment",regex:/".+$/},{token:"invalid",regex:"\\.{2,}"},{token:"keyword.operator",regex:/\W[\-+\%=<>*]\W|\*\*|[~:,\.&$]|->*?|=>/},{token:"paren.lparen",regex:"[\\[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"constant.numeric",regex:"[+-]?\\d+\\b"},{token:"variable.parameter",regex:/sy|pa?\d\d\d\d\|t\d\d\d\.|innnn/},{token:"keyword",regex:t},{token:"variable.parameter",regex:/\w+-\w+(?:-\w+)*/},{token:e,regex:"\\b\\w+\\b"},{caseInsensitive:!0}],qstring:[{token:"constant.language.escape",regex:"''"},{token:"string",regex:"'",next:"start"},{defaultToken:"string"}],string:[{token:"constant.language.escape",regex:"``"},{token:"string",regex:"`",next:"start"},{defaultToken:"string"}]}};n.inherits(o,i),t.AbapHighlightRules=o}),define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t){"use strict";var n=e("../../lib/oop"),i=e("./fold_mode").FoldMode,o=e("../../range").Range,r=t.FoldMode=function(){};n.inherits(r,i),function(){this.getFoldWidgetRange=function(e,t,n){var i=this.indentationBlock(e,n);if(i)return i;var r=/\S/,s=e.getLine(n),a=s.search(r);if(-1!=a&&"#"==s[a]){for(var c=s.length,l=e.getLength(),h=n,u=n;++n<l;){s=e.getLine(n);var d=s.search(r);if(-1!=d){if("#"!=s[d])break;u=n}}if(u>h){var g=e.getLine(u).length;return new o(h,c,u,g)}}},this.getFoldWidget=function(e,t,n){var i=e.getLine(n),o=i.search(/\S/),r=e.getLine(n+1),s=e.getLine(n-1),a=s.search(/\S/),c=r.search(/\S/);if(-1==o)return e.foldWidgets[n-1]=-1!=a&&c>a?"start":"","";if(-1==a){if(o==c&&"#"==i[o]&&"#"==r[o])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(a==o&&"#"==i[o]&&"#"==s[o]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return-1!=a&&o>a?e.foldWidgets[n-1]="start":e.foldWidgets[n-1]="",c>o?"start":""}}.call(r.prototype)}),define("ace/mode/abap",["require","exports","module","ace/mode/abap_highlight_rules","ace/mode/folding/coffee","ace/range","ace/mode/text","ace/lib/oop"],function(e,t){"use strict";function n(){this.HighlightRules=i,this.foldingRules=new o}var i=e("./abap_highlight_rules").AbapHighlightRules,o=e("./folding/coffee").FoldMode,r=(e("../range").Range,e("./text").Mode),s=e("../lib/oop");s.inherits(n,r),function(){this.lineCommentStart='"',this.getNextLineIndent=function(e,t){var n=this.$getIndent(t);return n},this.$id="ace/mode/abap"}.call(n.prototype),t.Mode=n});
define("ace/mode/mips_assembler_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"support.function.pseudo.mips",regex:"\\b(?:mul|abs|div|divu|mulo|mulou|neg|negu|not|rem|remu|rol|ror|li|seq|sge|sgeu|sgt|sgtu|sle|sleu|sne|b|beqz|bge|bgeu|bgt|bgtu|ble|bleu|blt|bltu|bnez|la|ld|ulh|ulhu|ulw|sd|ush|usw|move|mfc1\\.d|l\\.d|l\\.s|s\\.d|s\\.s)\\b",comment:"ok actually this are instructions, but one also could call them funtions\u2026"},{token:"support.function.mips",regex:"\\b(?:abs\\.d|abs\\.s|add|add\\.d|add\\.s|addi|addiu|addu|and|andi|bc1f|bc1t|beq|bgez|bgezal|bgtz|blez|bltz|bltzal|bne|break|c\\.eq\\.d|c\\.eq\\.s|c\\.le\\.d|c\\.le\\.s|c\\.lt\\.d|c\\.lt\\.s|ceil\\.w\\.d|ceil\\.w\\.s|clo|clz|cvt\\.d\\.s|cvt\\.d\\.w|cvt\\.s\\.d|cvt\\.s\\.w|cvt\\.w\\.d|cvt\\.w\\.s|div|div\\.d|div\\.s|divu|eret|floor\\.w\\.d|floor\\.w\\.s|j|jal|jalr|jr|lb|lbu|lh|lhu|ll|lui|lw|lwc1|lwl|lwr|madd|maddu|mfc0|mfc1|mfhi|mflo|mov\\.d|mov\\.s|movf|movf\\.d|movf\\.s|movn|movn\\.d|movn\\.s|movt|movt\\.d|movt\\.s|movz|movz\\.d|movz\\.s|msub|mtc0|mtc1|mthi|mtlo|mul|mul\\.d|mul\\.s|mult|multu|neg\\.d|neg\\.s|nop|nor|or|ori|round\\.w\\.d|round\\.w\\.s|sb|sc|sdc1|sh|sll|sllv|slt|slti|sltiu|sltu|sqrt\\.d|sqrt\\.s|sra|srav|srl|srlv|sub|sub\\.d|sub\\.s|subu|sw|swc1|swl|swr|syscall|teq|teqi|tge|tgei|tgeiu|tgeu|tlt|tlti|tltiu|tltu|trunc\\.w\\.d|trunc\\.w\\.s|xor|xori)\\b"},{token:"storage.type.mips",regex:"\\.(?:ascii|asciiz|byte|data|double|float|half|kdata|ktext|space|text|word|set\\s*(?:noat|at))\\b"},{token:"storage.modifier.mips",regex:"\\.(?:align|extern||globl)\\b"},{token:["entity.name.function.label.mips","meta.function.label.mips"],regex:"\\b([A-Za-z0-9_]+)(:)"},{token:["punctuation.definition.variable.mips","variable.other.register.usable.by-number.mips"],regex:"(\\$)(0|[2-9]|1[0-9]|2[0-5]|2[89]|3[0-1])\\b"},{token:["punctuation.definition.variable.mips","variable.other.register.usable.by-name.mips"],regex:"(\\$)(zero|v[01]|a[0-3]|t[0-9]|s[0-7]|gp|sp|fp|ra)\\b"},{token:["punctuation.definition.variable.mips","variable.other.register.reserved.mips"],regex:"(\\$)(at|k[01]|1|2[67])\\b"},{token:["punctuation.definition.variable.mips","variable.other.register.usable.floating-point.mips","variable.other.register.usable.floating-point.mips"],regex:"(\\$)(f)([0-9]|1[0-9]|2[0-9]|3[0-1])\\b"},{token:"constant.numeric.float.mips",regex:"\\b\\d+\\.\\d+\\b"},{token:"constant.numeric.integer.mips",regex:"\\b(?:\\d+|0(?:x|X)[a-fA-F0-9]+)\\b"},{token:"punctuation.definition.string.begin.mips",regex:'"',push:[{token:"punctuation.definition.string.end.mips",regex:'"',next:"pop"},{token:"constant.character.escape.mips",regex:'\\\\[rnt\\\\"]'},{defaultToken:"string.quoted.double.mips"}]},{token:"punctuation.definition.comment.mips",regex:"#",push:[{token:"comment.line.number-sign.mips",regex:"$",next:"pop"},{defaultToken:"comment.line.number-sign.mips"}]}]},this.normalizeRules()};o.metaData={fileTypes:["s","mips","spim","asm"],keyEquivalent:"^~M",name:"MIPS Assembler",scopeName:"source.mips"},n.inherits(o,r),t.MIPSAssemblerHighlightRules=o}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var n=e("../../lib/oop"),r=e("../../range").Range,o=e("./fold_mode").FoldMode,i=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(i,o),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var o=this._getFoldWidgetBase(e,t,n);return!o&&this.startRegionRe.test(r)?"start":o},this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var i=o.match(this.foldingStartMarker);if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,a);var s=e.getCommentFoldRange(n,a+i[0].length,1);return s&&!s.isMultiLine()&&(r?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t){var i=o.match(this.foldingStopMarker);if(i){var a=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,a):e.getCommentFoldRange(n,a,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),o=n.search(/\S/),i=t,a=n.length;t+=1;for(var s=t,l=e.getLength();++t<l;){n=e.getLine(t);var c=n.search(/\S/);if(-1!==c){if(o>c)break;var u=this.getFoldWidgetRange(e,"all",t);if(u){if(u.start.row<=i)break;if(u.isMultiLine())t=u.end.row;else if(o==c)break}s=t}}return new r(i,a,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,n){for(var o=t.search(/\s*$/),i=e.getLength(),a=n,s=/^\s*(?:\/\*|\/\/)#(end)?region\b/,l=1;++n<i;){t=e.getLine(n);var c=s.exec(t);if(c&&(c[1]?l--:l++,!l))break}var u=n;return u>a?new r(a,o,u,t.length):void 0}}.call(i.prototype)}),define("ace/mode/mips_assembler",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/mips_assembler_highlight_rules","ace/mode/folding/cstyle"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text").Mode,o=e("./mips_assembler_highlight_rules").MIPSAssemblerHighlightRules,i=e("./folding/cstyle").FoldMode,a=function(){this.HighlightRules=o,this.foldingRules=new i};n.inherits(a,r),function(){this.$id="ace/mode/mips_assembler"}.call(a.prototype),t.Mode=a});
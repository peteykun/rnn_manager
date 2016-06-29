define("ace/split",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/editor","ace/virtual_renderer","ace/edit_session"],function(e,t){"use strict";function i(e,t){this.$u=e,this.$doc=t}var n=e("./lib/oop"),s=e("./lib/lang"),o=e("./lib/event_emitter").EventEmitter,r=e("./editor").Editor,a=e("./virtual_renderer").VirtualRenderer,l=e("./edit_session").EditSession,c=function(e,t,i){this.BELOW=1,this.BESIDE=0,this.$container=e,this.$theme=t,this.$splits=0,this.$editorCSS="",this.$editors=[],this.$orientation=this.BESIDE,this.setSplits(i||1),this.$cEditor=this.$editors[0],this.on("focus",function(e){this.$cEditor=e}.bind(this))};(function(){n.implement(this,o),this.$createEditor=function(){var e=document.createElement("div");e.className=this.$editorCSS,e.style.cssText="position: absolute; top:0px; bottom:0px",this.$container.appendChild(e);var t=new r(new a(e,this.$theme));return t.on("focus",function(){this._emit("focus",t)}.bind(this)),this.$editors.push(t),t.setFontSize(this.$fontSize),t},this.setSplits=function(e){var t;if(1>e)throw"The number of splits have to be > 0!";if(e!=this.$splits){if(e>this.$splits){for(;this.$splits<this.$editors.length&&this.$splits<e;)t=this.$editors[this.$splits],this.$container.appendChild(t.container),t.setFontSize(this.$fontSize),this.$splits++;for(;this.$splits<e;)this.$createEditor(),this.$splits++}else for(;this.$splits>e;)t=this.$editors[this.$splits-1],this.$container.removeChild(t.container),this.$splits--;this.resize()}},this.getSplits=function(){return this.$splits},this.getEditor=function(e){return this.$editors[e]},this.getCurrentEditor=function(){return this.$cEditor},this.focus=function(){this.$cEditor.focus()},this.blur=function(){this.$cEditor.blur()},this.setTheme=function(e){this.$editors.forEach(function(t){t.setTheme(e)})},this.setKeyboardHandler=function(e){this.$editors.forEach(function(t){t.setKeyboardHandler(e)})},this.forEach=function(e,t){this.$editors.forEach(e,t)},this.$fontSize="",this.setFontSize=function(e){this.$fontSize=e,this.forEach(function(t){t.setFontSize(e)})},this.$cloneSession=function(e){var t=new l(e.getDocument(),e.getMode()),n=e.getUndoManager();if(n){var o=new i(n,t);t.setUndoManager(o)}return t.$informUndoManager=s.delayedCall(function(){t.$deltas=[]}),t.setTabSize(e.getTabSize()),t.setUseSoftTabs(e.getUseSoftTabs()),t.setOverwrite(e.getOverwrite()),t.setBreakpoints(e.getBreakpoints()),t.setUseWrapMode(e.getUseWrapMode()),t.setUseWorker(e.getUseWorker()),t.setWrapLimitRange(e.$wrapLimitRange.min,e.$wrapLimitRange.max),t.$foldData=e.$cloneFoldData(),t},this.setSession=function(e,t){var i;i=null==t?this.$cEditor:this.$editors[t];var n=this.$editors.some(function(t){return t.session===e});return n&&(e=this.$cloneSession(e)),i.setSession(e),e},this.getOrientation=function(){return this.$orientation},this.setOrientation=function(e){this.$orientation!=e&&(this.$orientation=e,this.resize())},this.resize=function(){var e,t=this.$container.clientWidth,i=this.$container.clientHeight;if(this.$orientation==this.BESIDE)for(var n=t/this.$splits,s=0;s<this.$splits;s++)e=this.$editors[s],e.container.style.width=n+"px",e.container.style.top="0px",e.container.style.left=s*n+"px",e.container.style.height=i+"px",e.resize();else for(var o=i/this.$splits,s=0;s<this.$splits;s++)e=this.$editors[s],e.container.style.width=t+"px",e.container.style.top=s*o+"px",e.container.style.left="0px",e.container.style.height=o+"px",e.resize()}}).call(c.prototype),function(){this.execute=function(e){this.$u.execute(e)},this.undo=function(){var e=this.$u.undo(!0);e&&this.$doc.selection.setSelectionRange(e)},this.redo=function(){var e=this.$u.redo(!0);e&&this.$doc.selection.setSelectionRange(e)},this.reset=function(){this.$u.reset()},this.hasUndo=function(){return this.$u.hasUndo()},this.hasRedo=function(){return this.$u.hasRedo()}}.call(i.prototype),t.Split=c}),define("ace/ext/split",["require","exports","module","ace/split"],function(e,t,i){"use strict";i.exports=e("../split")}),function(){window.require(["ace/ext/split"],function(){})}();
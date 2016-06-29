/*!
 * Bootstrap Markdown Editor v1.2.1 (https://github.com/inacho/bootstrap-markdown-editor)
 * Copyright 2015 Ignacio de Tomás <nacho@inacho.es>
 * Licensed under MIT (https://github.com/inacho/bootstrap-markdown-editor/blob/master/LICENSE)
 */
!function(t){"use strict";function n(n,e,i,a,o){o.show();var l=new FormData,d=0;for(d=0;d<e.length;d++)l.append("file"+d,e[d]);t.ajax({url:n,type:"POST",contentType:!1,data:l,processData:!1,cache:!1,dataType:"json"}).done(function(t){var n="";t.length>1&&(n="\n");for(var e=0;e<t.length;e++)a.insertSnippet(i,"![]("+t[e]+")"+n)}).always(function(){o.hide()})}function e(n){var e,i=t(window).height(),a=n.offset().top;i>a&&(e=i-a,n.css("height",e+"px"))}function i(t,n){t.commands.addCommand({name:"bold",bindKey:{win:"Ctrl-B",mac:"Command-B"},exec:function(t){var e=t.session.getTextRange(t.getSelectionRange());""===e?n.insertSnippet(t,"**${1:text}**"):n.insertSnippet(t,"**"+e+"**")},readOnly:!1}),t.commands.addCommand({name:"italic",bindKey:{win:"Ctrl-I",mac:"Command-I"},exec:function(t){var e=t.session.getTextRange(t.getSelectionRange());""===e?n.insertSnippet(t,"*${1:text}*"):n.insertSnippet(t,"*"+e+"*")},readOnly:!1}),t.commands.addCommand({name:"link",bindKey:{win:"Ctrl-K",mac:"Command-K"},exec:function(t){var e=t.session.getTextRange(t.getSelectionRange());""===e?n.insertSnippet(t,"[${1:text}](http://$2)"):n.insertSnippet(t,"["+e+"](http://$1)")},readOnly:!1})}function a(t,n){0===t.getCursorPosition().column?(t.navigateLineStart(),t.insert(n+" ")):(t.navigateLineStart(),t.insert(n+" "),t.navigateLineEnd())}function o(n,e){var i="";return i+='<div class="md-loading"><span class="md-icon-container"><span class="md-icon"></span></span></div>',i+='<div class="md-toolbar">',i+='<div class="btn-toolbar">',i+='<div class="btn-group">',i+='<button type="button" data-mdtooltip="tooltip" title="'+e.label.btnHeader1+'" class="md-btn btn btn-sm btn-default" data-btn="h1">H1</button>',i+='<button type="button" data-mdtooltip="tooltip" title="'+e.label.btnHeader2+'" class="md-btn btn btn-sm btn-default" data-btn="h2">H2</button>',i+='<button type="button" data-mdtooltip="tooltip" title="'+e.label.btnHeader3+'" class="md-btn btn btn-sm btn-default" data-btn="h3">H3</button>',i+="</div>",i+='<div class="btn-group">',i+='<button type="button" data-mdtooltip="tooltip" title="'+e.label.btnBold+'" class="md-btn btn btn-sm btn-default" data-btn="bold"><span class="glyphicon glyphicon-bold"></span></button>',i+='<button type="button" data-mdtooltip="tooltip" title="'+e.label.btnItalic+'" class="md-btn btn btn-sm btn-default" data-btn="italic"><span class="glyphicon glyphicon-italic"></span></button>',i+="</div>",i+='<div class="btn-group">',i+='<button type="button" data-mdtooltip="tooltip" title="'+e.label.btnList+'" class="md-btn btn btn-sm btn-default" data-btn="ul"><span class="glyphicon glyphicon glyphicon-list"></span></button>',i+='<button type="button" data-mdtooltip="tooltip" title="'+e.label.btnOrderedList+'" class="md-btn btn btn-sm btn-default" data-btn="ol"><span class="glyphicon glyphicon-th-list"></span></button>',i+="</div>",i+='<div class="btn-group">',i+='<button type="button" data-mdtooltip="tooltip" title="'+e.label.btnLink+'" class="md-btn btn btn-sm btn-default" data-btn="link"><span class="glyphicon glyphicon-link"></span></button>',i+='<button type="button" data-mdtooltip="tooltip" title="'+e.label.btnImage+'" class="md-btn btn btn-sm btn-default" data-btn="image"><span class="glyphicon glyphicon-picture"></span></button>',e.imageUpload===!0&&(i+='<div data-mdtooltip="tooltip" title="'+e.label.btnUpload+'" class="btn btn-sm btn-default md-btn-file"><span class="glyphicon glyphicon-upload"></span><input class="md-input-upload" type="file" multiple accept=".jpg,.jpeg,.png,.gif"></div>'),i+="</div>",e.fullscreen===!0&&(i+='<div class="btn-group pull-right">',i+='<button type="button" class="md-btn btn btn-sm btn-default" data-btn="fullscreen"><span class="glyphicon glyphicon-fullscreen"></span> '+e.label.btnFullscreen+"</button>",i+="</div>"),e.preview===!0&&(i+='<div class="btn-group pull-right">',i+='<button type="button" class="md-btn btn btn-sm btn-default btn-edit active" data-btn="edit"><span class="glyphicon glyphicon-pencil"></span> '+e.label.btnEdit+"</button>",i+='<button type="button" class="md-btn btn btn-sm btn-default btn-preview" data-btn="preview"><span class="glyphicon glyphicon-eye-open"></span> '+e.label.btnPreview+"</button>",i+="</div>"),i+="</div>",i+="</div>",i+='<div class="md-editor">'+t("<div>").text(t.trim(n)).html()+"</div>",i+='<div class="md-preview" style="display:none"></div>'}var l={init:function(l){var d=t.extend(!0,{},t.fn.markdownEditor.defaults,l),s=this,p=!1,r=!1;s.addClass("md-container").html(o(this.text(),d)),"function"==typeof t().tooltip&&s.find('[data-mdtooltip="tooltip"]').tooltip({container:"body"});var b=s.find(".md-editor"),c=s.find(".md-preview"),u=s.find(".md-loading");s.css({width:d.width}),b.css({width:d.width,height:d.height,fontSize:d.fontSize}),c.css({width:d.width,height:d.height});var m,h=ace.edit(b[0]);return h.setTheme("ace/theme/"+d.theme),h.getSession().setMode("ace/mode/markdown"),h.getSession().setUseWrapMode(!0),h.setHighlightActiveLine(!1),h.setShowPrintMargin(!1),h.renderer.setShowGutter(!1),ace.config.loadModule("ace/ext/language_tools",function(){m=ace.require("ace/snippets").snippetManager,i(h,m)}),d.imageUpload&&(s.find(".md-input-upload").on("change",function(){var e=t(this).get(0).files;e.length&&n(d.uploadPath,t(this).get(0).files,h,m,u)}),s.on("dragenter",function(t){t.stopPropagation(),t.preventDefault()}),s.on("dragover",function(t){t.stopPropagation(),t.preventDefault()}),s.on("drop",function(t){t.preventDefault();var e=t.originalEvent.dataTransfer.files;n(d.uploadPath,e,h,m,u)})),d.fullscreen===!0&&t(window).resize(function(){r===!0&&e(p===!1?b:c)}),s.find(".md-btn").click(function(){var n=t(this).data("btn"),i=h.session.getTextRange(h.getSelectionRange());"h1"===n?a(h,"#"):"h2"===n?a(h,"##"):"h3"===n?a(h,"###"):"ul"===n?a(h,"*"):"ol"===n?a(h,"1."):"bold"===n?h.execCommand("bold"):"italic"===n?h.execCommand("italic"):"link"===n?h.execCommand("link"):"image"===n?""===i?m.insertSnippet(h,"![${1:text}](http://$2)"):m.insertSnippet(h,"!["+i+"](http://$1)"):"edit"===n?(p=!1,c.hide(),b.show(),s.find(".btn-edit").addClass("active"),s.find(".btn-preview").removeClass("active"),r===!0&&e(b)):"preview"===n?(p=!0,c.html('<p style="text-align:center; font-size:16px">'+d.label.loading+"...</p>"),d.onPreview(h.getSession().getValue(),function(t){c.html(t)}),b.hide(),c.show(),s.find(".btn-preview").addClass("active"),s.find(".btn-edit").removeClass("active"),r===!0&&e(c)):"fullscreen"===n&&(r===!0?(r=!1,t("body, html").removeClass("md-body-fullscreen"),s.removeClass("md-fullscreen"),b.css("height",d.height),c.css("height",d.height)):(r=!0,t("body, html").addClass("md-body-fullscreen"),s.addClass("md-fullscreen"),e(p===!1?b:c)),h.resize()),h.focus()}),this},content:function(){var t=ace.edit(this.find(".md-editor")[0]);return t.getSession().getValue()},setContent:function(t){var n=ace.edit(this.find(".md-editor")[0]);n.setValue(t)}};t.fn.markdownEditor=function(n){return l[n]?l[n].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof n&&n?void t.error("Method "+n+" does not exist on jQuery.markdownEditor"):l.init.apply(this,arguments)},t.fn.markdownEditor.defaults={width:"100%",height:"400px",fontSize:"14px",theme:"tomorrow",fullscreen:!0,imageUpload:!1,uploadPath:"",preview:!1,onPreview:function(t,n){n(t)},label:{btnHeader1:"Header 1",btnHeader2:"Header 2",btnHeader3:"Header 3",btnBold:"Bold",btnItalic:"Italic",btnList:"Unordered list",btnOrderedList:"Ordered list",btnLink:"Link",btnImage:"Insert image",btnUpload:"Upload image",btnEdit:"Edit",btnPreview:"Preview",btnFullscreen:"Fullscreen",loading:"Loading"}}}(jQuery);
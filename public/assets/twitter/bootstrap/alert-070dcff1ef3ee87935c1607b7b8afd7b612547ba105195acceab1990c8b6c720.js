/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var n=e(this),o=n.data("bs.alert");o||n.data("bs.alert",o=new r(this)),"string"==typeof t&&o[t].call(n)})}var n='[data-dismiss="alert"]',r=function(t){e(t).on("click",n,this.close)};r.VERSION="3.2.0",r.prototype.close=function(t){function n(){i.detach().trigger("closed.bs.alert").remove()}var r=e(this),o=r.attr("data-target");o||(o=r.attr("href"),o=o&&o.replace(/.*(?=#[^\s]*$)/,""));var i=e(o);t&&t.preventDefault(),i.length||(i=r.hasClass("alert")?r:r.parent()),i.trigger(t=e.Event("close.bs.alert")),t.isDefaultPrevented()||(i.removeClass("in"),e.support.transition&&i.hasClass("fade")?i.one("bsTransitionEnd",n).emulateTransitionEnd(150):n())};var o=e.fn.alert;e.fn.alert=t,e.fn.alert.Constructor=r,e.fn.alert.noConflict=function(){return e.fn.alert=o,this},e(document).on("click.bs.alert.data-api",n,r.prototype.close)}(jQuery);
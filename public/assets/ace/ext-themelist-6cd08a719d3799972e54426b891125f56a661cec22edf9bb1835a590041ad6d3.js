define("ace/ext/themelist",["require","exports","module","ace/lib/fixoldbrowsers"],function(e,t){"use strict";e("ace/lib/fixoldbrowsers");var i=[["Chrome"],["Clouds"],["Crimson Editor"],["Dawn"],["Dreamweaver"],["Eclipse"],["GitHub"],["IPlastic"],["Solarized Light"],["TextMate"],["Tomorrow"],["XCode"],["Kuroir"],["KatzenMilch"],["SQL Server","sqlserver","light"],["Ambiance","ambiance","dark"],["Chaos","chaos","dark"],["Clouds Midnight","clouds_midnight","dark"],["Cobalt","cobalt","dark"],["idle Fingers","idle_fingers","dark"],["krTheme","kr_theme","dark"],["Merbivore","merbivore","dark"],["Merbivore Soft","merbivore_soft","dark"],["Mono Industrial","mono_industrial","dark"],["Monokai","monokai","dark"],["Pastel on dark","pastel_on_dark","dark"],["Solarized Dark","solarized_dark","dark"],["Terminal","terminal","dark"],["Tomorrow Night","tomorrow_night","dark"],["Tomorrow Night Blue","tomorrow_night_blue","dark"],["Tomorrow Night Bright","tomorrow_night_bright","dark"],["Tomorrow Night 80s","tomorrow_night_eighties","dark"],["Twilight","twilight","dark"],["Vibrant Ink","vibrant_ink","dark"]];t.themesByName={},t.themes=i.map(function(e){var i=e[1]||e[0].replace(/ /g,"_").toLowerCase(),n={caption:e[0],theme:"ace/theme/"+i,isDark:"dark"==e[2],name:i};return t.themesByName[i]=n,n})}),function(){window.require(["ace/ext/themelist"],function(){})}();